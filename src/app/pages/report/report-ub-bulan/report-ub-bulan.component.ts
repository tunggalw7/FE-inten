import { Component, OnInit } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { MasterService } from "../../../_services/master.service";
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import * as XLSX from 'xlsx'; 
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DatePipe } from "@angular/common";

@Component({
  selector: "report-ub-bulan",
  templateUrl: "./report-ub-bulan.component.html",
  styleUrls: ["./report-ub-bulan.component.scss"],
})
export class ListReportUBPerBulanComponent implements OnInit {
  actionSelect: String;
  defaultRole = "All Role";
  listRole = [];
  listCabang : [];
  listKelas : [];
  isLoadData = true;
  baseService = "core/uang-biaya-bulanan";
  baseTahunService = "core/uang-biaya-tahunan";
  cabangService = "core/cabang-all";
  kelasService = "core/kelas-all";
  cabang: any;
  kelas: any;
  bulan: any;
  namaBulan:any;

  createdBy: any;
  modifiedBy: any;
  tahun_ajaran;
  tahun;
  dataTable: any = [];
  selectedCabang = [];
  selectedKelas = [];
  selectedMonth : any;
  isNotFound: Boolean = false;
  selectedRowCount = 0;
  selectedRowData: any = [];
  customAllRowsSelected = {};
  btnSearchClose: String = "btn-search";
  defaultStatus = "All Status";
  currentUser : any;
  rows = [];
  columns = [];
  selected = [];
  total_pembayaran = 0;
  ListBiayaTahunan = [];
  tanggal : any  = {
    start : '',
    end : ''
  };
  page = {
    search: "",
    role: "",
    status: "",
    pageLimit: 0,
    totalItems: 0,
    totalPages: 0,
    pageNumber: 0,
    orderBy: "tanggal_terima",
    orderDir: "ASC",
  };

  month = [
    { name : 'Januari', value: '1'},
    { name : 'Februari', value: '2'},
    { name : 'Maret', value: '3'},
    { name : 'April', value: '4'},
    { name : 'Mei', value: '5'},
    { name : 'Juni', value: '6'},
    { name : 'Juli', value: '7'},
    { name : 'Agustus', value: '8'},
    { name : 'September', value: '9'},
    { name : 'Oktober', value: '10'},
    { name : 'November', value: '11'},
    { name : 'Desember', value: '12'},
  ]
  fileName= 'ExcelSheet.xlsx';  

  constructor(
    private dialogService: NbDialogService,
    private masterService: MasterService,
    private route: Router,
    private toastrService: NbToastrService,
    private datePipe: DatePipe
  ) {
    this.page.pageNumber = 0;
    this.page.pageLimit = 10;
    this.getProfileInfo();

    if (localStorage.getItem('currentUser')) this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getListCabang();
    this.getListKelas();
  }

  ngOnInit() {
    let date = new Date();
    let date2 = new Date();
    this.tahun_ajaran = (date.getFullYear()-1) + " - " + date.getFullYear();
    this.tahun =  date.getFullYear();
    this.tanggal.start = date.setDate(date.getDate() - 30);
    this.tanggal.end = new Date();
    // this.selectedMonth = this.month[0].value;
    
    this.bulan = (date2.getMonth()+1).toString();
    this.namaBulan = this.month.filter(obj => obj.value == this.bulan)[0].name;
  }

  role : any;  
  profileService = "core/users/profile";
  async getProfileInfo() {
    this.masterService.getList(this.profileService, '').subscribe(async (result) => {
      this.role = result['user'].role;
      this.getData();
      this.getTahun();
    });
  }

  async getListCabang(){    
    this.masterService.getList(this.cabangService, '').subscribe(
      res => {
        this.listCabang = res['payload'];
        // this.selectedCabang = res['payload'][0].nama_cabang;
        this.cabang = res['payload'][0].nama_cabang;
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }

  async getListKelas(){    
    this.masterService.getList(this.kelasService, '').subscribe(
      res => {
        this.listKelas = res['payload'];
        // this.selectedKelas = res['payload'][0].nama_kelas;
        this.kelas = res['payload'][0].nama_kelas;
        // this.selectedKelas = this.dataForm? this.dataForm.wali_kelas : [];
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }
  
  async getData() {
    this.selected = [];
    this.selectedRowData = [];
    this.selectedRowCount = 0;
    this.isLoadData = true;
  
    this.namaBulan = this.month.filter(obj => obj.value == this.bulan)[0].name;
    const start_date = this.tanggal ? moment(this.tanggal.start).format("YYYY-MM-DD") : moment("2021-04-01").format("YYYY-MM-DD");
    const end_date = this.tanggal ? moment(this.tanggal.end).format("YYYY-MM-DD") : moment(this.tanggal.start).format("YYYY-MM-DD");


    const param = {      
      cabang: this.role === 'General Admin' || this.role === 'Manajemen' || this.role === 'Manajer Akademik' ? '' : this.currentUser.cabang,
      tanggal_start: start_date,
      tanggal_end: end_date,
      kelas: this.kelas,
    };
    
    this.masterService.getList(this.baseService, param).subscribe((result) => {
      if (result["payload"]) {
        
        this.total_pembayaran = 0;
        this.rows = result["payload"]; 
        this.rows.forEach(el => {
          this.total_pembayaran += parseInt(el.total_bayar);
        });

        this.isLoadData = false;
        this.isNotFound = false;
      } else {
        this.rows = [];
        this.isNotFound = true;
      }
    });
  }


  async getTahun() {
    this.selected = [];
    this.selectedRowData = [];
    this.selectedRowCount = 0;
    this.isLoadData = true;
  
    const param = {      
      cabang: this.role === 'General Admin' || this.role === 'Manajemen' || this.role === 'Manajer Akademik' ? '' : this.currentUser.cabang,    
      kelas: 'AL ITA 3023',
      tahun: '2021'
    };
    
    this.masterService.getList(this.baseTahunService, param).subscribe((result) => {
      if (result["payload"]) {
        this.ListBiayaTahunan = result['payload'];
        this.isLoadData = false;
        this.isNotFound = false;
      } else {
        this.rows = [];
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


  /** ------------------ Keyword Search Config ------------------ */
  onSearch(keyword) {
    this.page.search = keyword;
    this.page.pageNumber = 0;
    this.getData();
  }
  onKeyChange(e) {
    e === "" ? this.btnSearchClose = "btn-search" : this.btnSearchClose = "btn-close";
  }
  clearSearch() {
    this.page.search = "";
    this.page.role = "";
    this.page.status = "";
    this.page.orderBy = "created_at";
    this.page.orderDir = "DESC";
    this.page.pageNumber = 0;

    this.btnSearchClose = "btn-search";
    this.getData();
  }


  /** ------------------ Select Filter Config ------------------ */
  onSelect({ selected }) {
    this.selected = selected;
    this.selectedRowData = this.selected;
    this.selectedRowCount = this.selected.length;
  }
  emptySelect(){
    this.selected = [];
    this.selectedRowData = this.selected;
    this.selectedRowCount = this.selected.length;
  }

  selectRole(role) {
    this.page.role = role === "All Role" ? "" : role;
    this.page.pageNumber = 0;
    this.getData();
  }
  selecStatus(status) {
    this.page.status = status === "All Status" ? "" : status;
    this.page.pageNumber = 0;
    this.getData();
  }
  getId(row) {
    return row.profileId;
  }

  showPrint = false;
  onPrintDirect(){
    this.showPrint = true;
    let printContents = document.getElementById('data-ub').innerHTML;
    // $("#assessmentReport-container").css("visibility","visible");

    const winHtml = `<!DOCTYPE html>
        <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
                <style>
                .table-wrapper{
                  border: solid 1px #D8DADB;
                }
                th{            
                    border-width: 0 0 1px 0;
                    font-size: 12px;
                    font-weight: 600;
                    padding: 1rem;
                    line-height: 17px;
                    background: transparent;
                    border-bottom: solid 1px #D8DADB;
                    text-align: center;
                    border-left: solid 1px #D8DADB;
                    border-right: solid 1px #D8DADB;
                    vertical-align: middle !important;
                }
                td{                
                    padding: 1rem;
                    color: #000000;
                    font-size: 12px;
                    border-width: 0 0 1px 0;
                    border-bottom: thin solid #D8DADB;
                    vertical-align: middle !important;
                    border-right: solid 1px #D8DADB;
                    text-align: center;
                    border-left: solid 1px #D8DADB;
                }
                </style>
            </head>
            <body>
              `+ printContents +`
            </body>
        </html>`;

    const winUrl = URL.createObjectURL(
        new Blob([winHtml], { type: "text/html; charset=UTF-8" })
    );

    const win = window.open(
        winUrl,
        '_blank'
    );
    win.print();

    setTimeout(()=>{
      this.showPrint = false;
      win.close();
    }, 3000)
  }  

  exportexcel() {
    /* table id is passed over here */   
    let element = document.getElementById('excel-table'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    wb.Props = {
          Title: "SheetJS Tutorial",
          Subject: "Test",
          Author: "Red Stapler",
          CreatedDate: new Date(2017,12,19)
    };

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    
  }
  
  showToast(position, status, messages) {
    this.toastrService.show(
      '',
      messages,
      { position, status });
  }

}
