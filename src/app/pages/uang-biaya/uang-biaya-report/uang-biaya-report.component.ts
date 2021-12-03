import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { MasterService } from "../../../_services/master.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ListSiswaModalComponent } from '../list-siswa/list-siswa.component';
import * as moment from 'moment';

@Component({
  selector: 'uang-biaya-report',
  styleUrls: ['./uang-biaya-report.component.scss'],
  templateUrl: './uang-biaya-report.component.html',
})

export class UangBiayaReportComponent implements OnDestroy, OnInit {
  ID: any;
  UangBiayaForm: FormGroup;
  matpelService = "core/mata-pelajaran-all";
  generateService = "core/generate-siswa";
  baseService = "core/uang-biaya";
  ubIDService = "core/uang-biaya-id";
  ubTotalService = "core/uang-biaya-total";
  siswaService = "core/siswa-nis";
  updateAbsenService = "core/uang-biaya-update"
  deleteAbsenService = "core/uang-biaya-delete";
  cabangService = "core/cabang-all";
  kelasService = "core/kelas-all";
  guruService = "core/guru-all";
  listKelas : [];
  selectedKelas: [];
  listCabang : [];
  selectedCicilan : [];
  listGuru : [];
  selectedGuru : [];
  listMatpel : [];
  selectedMatpel : [];
  selectedJenisSoal : [];
  type_form;

  submitted : Boolean = false; 
  submitLoading: Boolean = false;
  type: string = 'Add';
  action : string = 'Save';
  actionSelect: String;
  defaultRole = "All Role";
  listBulan = ["Juni","Juli","Agustus","September","Oktober","November","Desember","Januari","Februari","Maret","April","Mei"];
  isLoadData = true;
  
  benar: any = {};
  salah: any = {};
  nilai: any = {};
  // baseService = "core/uang-biaya-list"

  createdBy: any;
  modifiedBy: any;

  dataTable: any = [];
  isNotFound: Boolean = false;
  selectedRowCount = 0;
  selectedRowData: any = [];
  customAllRowsSelected = {};
  btnSearchClose: String = "btn-search";
  defaultStatus = "All Status";

  total_bayar;
  total_pembayaran = 0;
  sisa_biaya_kurang = 0;
  printDate = new Date();
  logoUrl: any = 'assets/images/logo_inten.png';
  date: any;
  rows = [];  
  columns = [];
  selected = [];
  temp = [];
  detailSiswa : any = {};
  page = {
    search: "",
    role: "",
    status: "",
    pageLimit: 0,
    totalItems: 0,
    totalPages: 0,
    pageNumber: 0,
    orderBy: "tanggal",
    orderDir: "ASC",
  };

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private router: Router,
  ) {     

  }

  ngOnInit() {
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.getDetail(user.no_induk);
    this.getListBayarSiswa(user.no_induk);
  }
  
  get f() { return this.UangBiayaForm.controls; }

  ngOnDestroy() { }

  getDetail(id){    
    this.masterService.getByID(this.siswaService, id).subscribe((result) => {
      debugger
      const data = result["payload"];
      
      this.detailSiswa = data;
    });
  }
  
  getData(id) {
    this.masterService.getByID(this.ubIDService, id).subscribe((result) => {
      const data = result["payload"][0];
      debugger
      if (data) {
        this.UangBiayaForm.patchValue({
          'tanggal_terima' : data.tanggal_terima,
          'type_pembayaran' : data.type_pembayaran,
          'keterangan_pembayaran' : data.keterangan,
          'cicilan' : data.cicilan,
          'total_bayar' : data.total_bayar,
          'bayar_nit' : data.nit,
          'biaya_kurang' : data.biaya_kurang,
          'kode_kwitansi' : data.kode_kwitansi,
          'total_sisa_biaya_kurang' : data.biaya_kurang
        })
        this.sisa_biaya_kurang = data.biaya_kurang;
      } else {
        this.isNotFound = true;
      }
    });
  }  
  
  getListBayarSiswa(nis){    
    this.isLoadData = true;
    this.masterService.getByID(this.baseService, nis).subscribe(
      res => {
        this.isLoadData = false;
        this.dataTable = res['payload'];
        this.dataTable.forEach(item => {
          this.total_pembayaran += parseFloat(item.total_bayar)
          this.sisa_biaya_kurang = item.biaya_kurang;
        });
        // this.selectedGuru = this.dataForm? this.dataForm.wali_kelas : [];
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }

  getListCabang(){    
    this.masterService.getList(this.cabangService, '').subscribe(
      res => {
        this.listCabang = res['payload'];
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }

  getListKelas(){    
    this.masterService.getList(this.kelasService, '').subscribe(
      res => {
        
        this.listKelas = res['payload'];
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }
 
  getListGuru(){    
    this.masterService.getList(this.guruService, '').subscribe(
      res => {
        this.listGuru = res['payload'];
        // this.selectedGuru = this.dataForm? this.dataForm.wali_kelas : [];
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }
 
  getListMatpel(){    
    this.masterService.getList(this.matpelService, '').subscribe(
      res => {
        this.listMatpel = res['payload'];
        // this.selectedGuru = this.dataForm? this.dataForm.wali_kelas : [];
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }
  
 
  getTotalByNIS(nis){    
    this.masterService.getByID(this.ubTotalService, nis).subscribe(
      res => {
        this.UangBiayaForm.patchValue({
          'total_sisa_biaya_kurang' : (this.UangBiayaForm.value.total_biaya - res['payload'].sum)
        })
        this.sisa_biaya_kurang = this.UangBiayaForm.value.total_biaya - res['payload'].sum;
        this.listMatpel = res['payload'];
        // this.selectedGuru = this.dataForm? this.dataForm.wali_kelas : [];
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }

  fieldChange(type, index, event){   
    var res = this.UangBiayaForm.value.rumus.replace("benar", event);
    this.nilai[index] = eval(res.toString()).toFixed(); 
    this.salah[index] = this.UangBiayaForm.value.jumlah_soal - event;    

    this.temp[index].benar = event;
    this.temp[index].salah = this.salah[index];
    this.temp[index].nilai = this.nilai[index];
  }

  onSubmit() {
        
    const formData = this.UangBiayaForm.getRawValue();
    this.submitted = true;
    this.submitLoading = true;

    if (this.UangBiayaForm.invalid) {
      this.submitLoading = false;
      return;    
    } 

    if (formData.total_bayar == 0){
      this.showToast('top-right', 'danger', 'Total bayar 0, tolong isi total bayar!');
      this.submitLoading = false;
      return;    
    }

    if (formData.biaya_kurang < 0){
      this.showToast('top-right', 'danger', 'Biaya kurang minus, tolong koreksi total bayar!');
      this.submitLoading = false;
      return;    
    }

    if (this.type === 'Edit') this.onEditForm();
    else this.onCreateForm();    
  }

  onCreateForm(){
      const formData = this.UangBiayaForm.getRawValue();
      const param = { 
        "nis" : formData.nis,
        "tanggal_terima" : moment(formData.tanggal_terima).format("YYYY-MM-DD"), 
        "tanggal_transfer" : moment(formData.tanggal_transfer).format("YYYY-MM-DD"), 
        "type_pembayaran" : formData.type_pembayaran, 
        "keterangan" : formData.keterangan_pembayaran,
        "cicilan" : formData.cicilan, 
        "total_bayar" : formData.total_bayar,
        "nit" : formData.bayar_nit,
        "biaya_kurang" : formData.biaya_kurang,
        "kode_kwitansi" : formData.kode_kwitansi,
        "cabang" : formData.cabang
      }

      this.masterService.add(this.baseService, param).subscribe(
        res => {
          
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully created a new ');
                this.router.navigate(['pages/uang-biaya']);
                this.submitLoading = false;
            } else {
              this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
            }
        },
        err => {
          this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
        },
      );      
  }

  onEditForm(){
    
    const formData = this.UangBiayaForm.getRawValue();
    const param = { 
      "nis" : formData.nis,
      "tanggal_terima" : moment(formData.tanggal_terima).format("YYYY-MM-DD"), 
      "tanggal_transfer" : moment(formData.tanggal_transfer).format("YYYY-MM-DD"), 
      "type_pembayaran" : formData.type_pembayaran, 
      "keterangan" : formData.keterangan_pembayaran,
      "cicilan" : formData.cicilan, 
      "total_bayar" : formData.total_bayar,
      "nit" : formData.bayar_nit,
      "biaya_kurang" : formData.biaya_kurang,
      "kode_kwitansi" : formData.kode_kwitansi,
      "cabang" : formData.cabang
    }

    this.masterService.edit(this.baseService, param, this.ID).subscribe(
      res => {
        
          if (res['success']){                
              this.showToast('top-right', 'success', 'You have successfully created a new ');
              this.submitLoading = false;
          } else {
            this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
          }
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );      
}
  
  openListSiswa() {
    this.dialogService.open(ListSiswaModalComponent)
    .onClose.subscribe(data => this.getDataSiswa(data));
  }

  getDataSiswa(data){
    
    this.detailSiswa = data.data;
    this.UangBiayaForm.patchValue({
      'nis' : data.data.nis,
      'nama' : data.data.nama,
      'sekolah' : data.data.sekolah,
      'tahun_ajaran' : data.data.tahun_ajaran,
      'kelas_sekolah' : data.data.kelas_sekolah,
      'cabang' : data.data.cabang,
      'wali_kelas' : data.data.wali_kelas,
      'tanggal_masuk' : moment(data.data.tanggal_masuk).format("YYYY-MM-DD"),
      'total_biaya' : data.data.total_biaya,
      'keterangan' : data.data.keterangan,
      'nit' : data.data.nit,
      'biaya_kurang' : data.data.biaya_kurang      
    })
    this.getListBayarSiswa(data.data.nis);
    this.getTotalByNIS(data.data.nis);
  }

  onKeyChange(event){
    if (this.type === 'Add'){
      this.UangBiayaForm.patchValue({
        'biaya_kurang' : this.UangBiayaForm.value.total_sisa_biaya_kurang - event
      })
    } else {      
      this.UangBiayaForm.patchValue({
        'biaya_kurang' : this.UangBiayaForm.value.total_biaya - event
      })
    }
  }

  showToast(position, status, messages) {
    this.toastrService.show(
      '',
      messages,
      { position, status });
  }
  showPrint = false;
  onPrintDirect(){
    this.showPrint = true;
    this.logoUrl = '';
    
    let printContents = document.getElementById('abc').innerHTML;
    // $("#assessmentReport-container").css("visibility","visible");

    const winHtml = `<!DOCTYPE html>
        <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
                <style>
                  .row{
                      margin-bottom: 1em;
                  }
                  .wrapper{
                      margin:0.5em
                  }
                  .title{
                      margin-bottom: 0;
                      font-weight: 600;
                      font-family: 'Open Sans', sans-serif;
                  }
                  
                  .content{
                      margin-bottom: 0;
                      font-family: 'Open Sans', sans-serif;
                  }
                  
                  .date{
                      margin: 1em 0;
                      font-weight: 600;
                  }
              
                  .card-body{
                      margin: 0 1em;
                      padding-top: 0.8em;
                  }

                  .table-wrapper{
                      margin: 2em 0
                      font-family: 'Open Sans', sans-serif;
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
}