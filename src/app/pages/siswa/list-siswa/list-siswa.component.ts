import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { MasterService } from "../../../_services/master.service";
import { AddEditSiswaComponent } from "../add-edit-siswa/add-edit-siswa.component";
import { DeleteSiswaComponent } from "../delete-siswa/delete-siswa.component";

@Component({
  selector: "list-siswa",
  templateUrl: "./list-siswa.component.html",
  styleUrls: ["./list-siswa.component.scss"],
})
export class ListSiswaComponent implements OnInit {
  actionSelect: String;
  defaultRole = "All Role";
  listRole = [];
  isLoadData = true;
  baseService = "core/siswa";
  profileService = "core/users/profile";
  guruService = "core/guru-nip";
  currentUser : any = {};

  createdBy: any;
  modifiedBy: any;

  dataTable: any = [];
  isNotFound: Boolean = false;
  selectedRowCount = 0;
  selectedRowData: any = [];
  customAllRowsSelected = {};
  btnSearchClose: String = "btn-search";
  defaultStatus = "All Status";
  role: string;
  no_induk: string;
  rows = [];
  columns = [];
  selected = [];
  kelas: string;
  page = {
    search: "",
    role: "",
    status: "",
    pageLimit: 0,
    totalItems: 0,
    totalPages: 0,
    pageNumber: 0,
    orderBy: "id",
    orderDir: "DESC",
  };

  constructor(
    private dialogService: NbDialogService,
    private masterService: MasterService,   
    private router: Router,
  ) {
    this.page.pageNumber = 0;
    this.page.pageLimit = 15;
    this.getProfileInfo();
    if (localStorage.getItem('currentUser')) this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }
  
  async getProfileInfo() {
    this.masterService.getList(this.profileService, '').subscribe(async (result) => {
      this.role = result['user'].role;
      this.no_induk = result['user'].no_induk;
      if (this.role === 'Wali Kelas') this.getWaliKelasInfo();
      else this.getData();
    });
  }

  async getWaliKelasInfo() {
    this.masterService.getByID(this.guruService, this.no_induk).subscribe(async (result) => {
      if (result['payload']) {
        const kelas = result['payload'].wali_kelas.split(',');
        let totalKelas = ""
        kelas.forEach((item, index, {length}) => {
          const comma = index + 1 === length ? '' : ',';
          totalKelas += "'" + item + "'" + comma;          
        }); 

        this.kelas = totalKelas;
        this.getData();
      } else {
        this.getData();
      }
    });
  }

  getData() {
    
    this.selected = [];
    this.selectedRowData = [];
    this.selectedRowCount = 0;
    this.isLoadData = true;
    const param = {
      search: this.page.search,
      page: this.page.pageNumber + 1,
      limit: this.page.pageLimit,
      orderBy: this.page.orderBy,
      orderDir: this.page.orderDir,
      cabang: this.role === 'General Admin' || this.role === 'Manajemen' ? '' : this.currentUser.cabang,
      role: this.role,
      kelas: this.kelas
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
    .open(AddEditSiswaComponent, { closeOnBackdropClick: false })
    .onClose.subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  editUser(data) {
    this.dialogService
      .open(AddEditSiswaComponent, {
        closeOnBackdropClick: false,
        context: {
          dataForm : data,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.getData();
        }
      });
  }

  deleteUser(data) {
    this.dialogService
      .open(DeleteSiswaComponent, {
        closeOnBackdropClick: false,
        context: {
          dataForm: data,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.getData();
        }
      });
  }

  viewSiswa(data){    
    if (data.jurusan === 'IPA' || data.jurusan === 'ALUMNI IPA') this.router.navigate(['/pages/siswa/grafik-siswa-ipa/' + data.nis]);
    else this.router.navigate(['/pages/siswa/grafik-siswa-ips/' + data.nis]);
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
