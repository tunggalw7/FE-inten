import { Component, OnInit } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { MasterService } from "../../../_services/master.service";
import { AddEditAbsensiKuisComponent } from "../add-edit-absensi-kuis/add-edit-absensi-kuis.component";
import { DeleteAbsensiKuisComponent } from "../delete-absensi-kuis/delete-absensi-kuis.component";
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: "list-absensi-kuis",
  templateUrl: "./list-absensi-kuis.component.html",
  styleUrls: ["./list-absensi-kuis.component.scss"],
})
export class ListAbsensiKuisComponent implements OnInit {
  actionSelect: String;
  defaultRole = "All Role";
  listRole = [];
  isLoadData = true;
  baseService = "core/absensi-kuis-list";
  profileService = "core/users/profile";

  createdBy: any;
  modifiedBy: any;

  dataTable: any = [];
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
  role : any;
  page = {
    search: "",
    role: "",
    status: "",
    pageLimit: 0,
    totalItems: 0,
    totalPages: 0,
    pageNumber: 0,
    orderBy: "tanggal",
    orderDir: "DESC",
  };

  constructor(
    private dialogService: NbDialogService,
    private masterService: MasterService,
    private route: Router,
  ) {
    this.page.pageNumber = 0;
    this.page.pageLimit = 10;
    if (localStorage.getItem('currentUser')) this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getProfileInfo();
  }

  
  async getProfileInfo() {
    this.masterService.getList(this.profileService, '').subscribe(async (result) => {
      this.role = result['user'].role;
      this.getData();
    });
  }

  getData() {
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
      cabang: this.role === 'Manajer Akademik'  || this.role === 'Manajemen' ? '' : this.currentUser.cabang

    };
    
    this.masterService.getList(this.baseService, param).subscribe((result) => {
      if (result["payload"]["data"]) {
        this.rows = result["payload"]["data"]; 
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

  addUser() {
    this.dialogService
    .open(AddEditAbsensiKuisComponent, { closeOnBackdropClick: false })
    .onClose.subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  editAbsensi(data) {
    this.route.navigate(['/pages/absensi-kuis/edit'], 
    { queryParams: 
      { 
        tanggal: data.tanggal, 
        cabang: data.cabang, 
        kelas_inten: data.kelas_inten, 
        topik: data.topik, 
        mata_pelajaran: data.mata_pelajaran, 
        kuis: data.kuis? 'kuis' : 'absensi', 
        guru: data.guru, 
        jumlah_soal: data.jumlah_soal, 
        jenis_soal: data.jenis_soal, 
      } 
    });

    // this.route.navigate(['/pages/absensi-kuis/edit'], { queryParams: { profile: JSON.stringify(data) }});
  }

  deleteAbsensi(data) {   
    const param = { 
      "tanggal" : moment(data.tanggal).format("YYYY-MM-DD"), 
      "cabang" : data.cabang, 
      "kelas_inten" : data.kelas_inten, 
      "mata_pelajaran" :data.mata_pelajaran, 
      "guru" : data.guru, 
      "kuis" : data.kuis
    }

    this.dialogService
      .open(DeleteAbsensiKuisComponent, {
        closeOnBackdropClick: false,
        context: {
          dataForm: param,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.getData();
        }
      });
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



  /** ------------------ Multiple Check Row Item ------------------ */
  actionChange() {
    if (this.actionSelect === "activate") {
      this.activate();
    } else if (this.actionSelect === "suspend") {
      this.suspend();
    } else {
      this.multiDelete();
    }
  }
  activate() {
    // this.dialogService
    //   .open(MultiActionComponent, {
    //     closeOnBackdropClick: false,
    //     context: {
    //       action: "activate",
    //       data: this.selectedRowData,
    //     },
    //   })
    //   .onClose.subscribe(result => {
    //     if (result) {
    //       this.getData();
    //     } else {
    //       this.actionSelect = null;
    //     }
    //   });
  }
  suspend() {
    // this.dialogService
    //   .open(MultiActionComponent, {
    //     closeOnBackdropClick: false,
    //     context: {
    //       action: "suspended",
    //       data: this.selectedRowData,
    //     },
    //   })
    //   .onClose.subscribe(result => {
    //     if (result) {
    //       this.getData();
    //     } else {
    //       this.actionSelect = null;
    //     }
    //   });
  }
  multiDelete() {
    // this.dialogService
    //   .open(MultiActionComponent, {
    //     closeOnBackdropClick: false,
    //     context: {
    //       action: "delete",
    //       data: this.selectedRowData,
    //     },
    //   })
    //   .onClose.subscribe(result => {
    //     if (result) {
    //       this.getData();
    //     } else {
    //       this.actionSelect = null;
    //     }
    //   });
  }
}
