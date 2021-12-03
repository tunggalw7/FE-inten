import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { NbToastrService } from '@nebular/theme';
import { MasterService } from "../../../_services/master.service";

@Component({
  selector: 'list-siswa-modal',
  styleUrls: ['./list-siswa.component.scss'],
  templateUrl: './list-siswa.component.html',
})

export class ListSiswaModalComponent implements OnInit {
  AddEditForm: FormGroup;
  dataForm: any;
  actionSelect: String;
  defaultRole = "All Role";
  listRole = [];
  isLoadData = true;
  baseService = "core/siswa";

  createdBy: any;
  modifiedBy: any;

  dataTable: any = [];
  isNotFound: Boolean = false;
  selectedRowCount = 0;
  selectedRowData: any = [];
  customAllRowsSelected = {};
  btnSearchClose: String = "btn-search";
  defaultStatus = "All Status";

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
    orderBy: "id",
    orderDir: "ASC",
  };

  constructor(
    protected ref: NbDialogRef<ListSiswaModalComponent>,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.page.pageNumber = 0;
    this.page.pageLimit = 10;
    this.getData();
  }

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
      cabang: ""
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
  
  get f() { return this.AddEditForm.controls; }

  onCancel() {
    this.ref.close();
  }

  onSelectSiswa(event){
    this.ref.close({"data" : event});
  }
  
  showToast(position, status, messages) {
    this.toastrService.show(
      '',
      messages,
      { position, status });
  }
}