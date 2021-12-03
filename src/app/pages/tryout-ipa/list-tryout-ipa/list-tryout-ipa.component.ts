import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { MasterService } from "../../../_services/master.service";
import * as XLSX from 'xlsx';
import { Subject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: "list-tryout-ipa",
  templateUrl: "./list-tryout-ipa.component.html",
  styleUrls: ["./list-tryout-ipa.component.scss"],
})
export class ListTryOutIpaComponent implements OnInit {
  actionSelect: String;
  toForm : FormGroup;
  defaultRole = "All Role";
  listRole = [];
  isLoadData = true;
  baseService = "core/to-ipa";

  createdBy: any;
  modifiedBy: any;

  dataTable: any = [];
  isNotFound: Boolean = false;
  selectedRowCount = 0;
  selectedRowData: any = [];
  customAllRowsSelected = {};
  btnSearchClose: String = "btn-search";
  defaultStatus = "All Status";

  fileCSV: any;
  fileName: String = "No file chosen";
  dataSubmit: any;
  emptyFile: Boolean = true;
  submitLoading: Boolean = false;
  submitted : Boolean = false; 
  isError: Boolean = false;
  errMessage: String = "";
  dataFailed = 0;
  dataSuccess = 0;
  allcounter = 0;
  test;
  spinnerEnabled = false;
  keys: string[];
  dataSheet = new Subject();
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('search', { static: false }) search: any;

  isExcelFile: boolean;

  date: any;
  currentUser : any;

  rows = [];
  columns = [];
  selected = [];
  page = {
    search: "",
    role: "",
    status: "",
    pageLimit: 0,
    totalItems: 0,
    totalPages: 0,
    pageNumber: 0,
    orderBy: "tryout_ke",
    orderDir: "ASC",
  };

  constructor(
    private dialogService: NbDialogService,
    private masterService: MasterService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
  ) {
    this.page.pageNumber = 0;
    this.page.pageLimit = 10;
    this.getProfileInfo();
  }

  role : any;  
  profileService = "core/users/profile";
  async getProfileInfo() {
    this.masterService.getList(this.profileService, '').subscribe(async (result) => {
      this.role = result['user'].role;
    });
  }
  ngOnInit() {
    this.getData();
    this.toForm = this.formBuilder.group({
      tanggal: ['', Validators.required],
      to_ke: ['', Validators.required],
      to_file: ['', Validators.required]
    });

    this.columns = [
      { prop: 'No' }, 
      { prop: 'NIS' }, 
      { prop: 'Nama' }
    ];
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map(x => x['target']['value'])
      )
      .subscribe(value => {
        this.updateFilter(value);
      });
  }

  
  updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    // get the amount of columns in the table
    const count = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.rows[0]);
    // assign filtered matches to the active datatable
    this.rows = this.rows.filter(item => {
      // iterate through each row's column data
      for (let i = 0; i < count; i++) {
        // check for a match
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
          !value
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });

    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  get f() { return this.toForm.controls; }

  async getData() {
    this.selected = [];
    this.selectedRowData = [];
    this.selectedRowCount = 0;
    this.isLoadData = true;
    const param = {
      search: this.page.search.toLocaleLowerCase(),
      page: this.page.pageNumber + 1,
      limit: this.page.pageLimit,
      orderBy: this.page.orderBy,
      orderDir: this.page.orderDir,
    };
    
    this.masterService.getList(this.baseService, param).subscribe((result) => {
      if (result["payload"]["data"]) {
        let a = [
          {
            "nama" : "adi",
            "asal sekolah" : "sma 1"
          }
        ]
        this.rows = a; 
        this.page.totalItems = result["payload"]["meta"].totalItems;
        this.page.totalPages = Math.ceil(this.page.totalItems / this.page.pageLimit);
        this.isLoadData = false;       
        this.isNotFound = false;
      } else {
        this.isNotFound = true;
      }
    });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset ? pageInfo.offset : 0;
    this.getData();
  }

  setSort(sortInfo) {
    let orderByName = sortInfo.sorts[0].prop;
    this.page.orderBy = orderByName;
    this.page.orderDir = this.page.orderDir === "ASC" ? "DESC" : "ASC";
    this.getData();
  }  

  sortBy(strProp){
    this.page.orderBy = strProp;
    this.page.orderDir = this.page.orderDir === "ASC" ? "DESC" : "ASC";
    this.getData();
  }

   /** ---------------------------------- FILES UPLOAD CONFIG ---------------------------------- */   
   fileTryout: any;
   fileTryoutName: any;
   onDocumentAdmission(event: any) {
     let file = event.target.files[0];
     this.fileTryout = new FormData();
     this.fileTryout.append("file", file);
     this.isExcelFile = !!event.target.files[0].name.match(/(.xls|.xlsx)/);
     if (file) {
       
       const validImageTypes = [".xls"];
       if (!this.isExcelFile) {
         this.fileTryout.delete("file");         
         this.showToast('top-right', 'danger', 'Invalid file extension.');
       } else if (file.size > 10000000) {
         this.fileTryout.delete("file");
         this.showToast('top-right', 'danger', 'File too large.');
       } else {
          this.fileTryout
            ? (this.fileTryoutName = file.name)
            : (this.fileTryoutName = "");
            
          let data;
          this.spinnerEnabled = true;
          const reader: FileReader = new FileReader();
          reader.onload = (e: any) => {
            
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            /* save data */
            data = XLSX.utils.sheet_to_json(ws);
          };

          reader.readAsBinaryString(event.target.files[0]);

          reader.onloadend = (e) => {
            this.spinnerEnabled = false;
            this.page.totalItems = 1000;
            this.page.totalPages = 100;

            this.rows = data;        
            this.isLoadData = false;
            this.isNotFound = false;
            this.submitLoading = false;
            this.emptyFile = false;
            this.keys = Object.keys(data[0]);
            this.dataSheet.next(data)
          }
       }
     }
   }

   removeDocumentAdmission() {
     this.fileTryout = "";
     this.fileTryoutName = "";
     this.rows = [];
   }

  fileChanged(evt) {    
    let data;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;
        this.page.totalItems = 1000;
        this.page.totalPages = 100;

        this.rows = data;        
        this.isLoadData = false;
        this.isNotFound = false;
        this.submitLoading = false;
        this.emptyFile = false;
        this.keys = Object.keys(data[0]);
        this.dataSheet.next(data)
      }
    } else {
      this.inputFile.nativeElement.value = '';
    }    
  }

  async onUpload() {
    this.dataFailed = 0;
    this.dataSuccess = 0;
    this.allcounter = 0;
    this.submitLoading = true;
    const formData = this.toForm.getRawValue();

    this.rows[0].tanggal = '12/12/2021';
    this.rows[0].tryout_ke = formData.to_ke;
    
    this.masterService.add3(this.baseService, this.rows).subscribe(
      res => {
        
          if (res['success']){                
              this.submitLoading = false;
              this.showToast('top-right', 'success', 'You have successfully uploaded tryout-ipa.');
              // this.ref.close({'success' : true});
          } else {
            this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
          }
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );     
  }

  getResponse(allcounter, dataFailed, dataSuccess) {
    if (allcounter === this.dataSubmit.length) {
      // console.log('dataFailed:', dataFailed, 'dataSuccess:', dataSuccess, 'alldata:', this.dataSubmit.length);
      if (dataSuccess === this.dataSubmit.length) {
        this.showToast('top-right', 'success', 'Success import csv.');
      } else if (dataSuccess > 0 && dataFailed > 0) {        
        this.showToast('top-right', 'warning', `Failed import csv.${this.dataSubmit.length}`);
      } else {
        this.showToast('top-right', 'danger', `Failed import csv.`);
        this.submitLoading = false;
      }
    }
  }
  
  showToast(position, status, messages) {
    this.toastrService.show(
      '',
      messages,
      { position, status });
  }
}
