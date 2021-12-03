import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { MasterService } from "../../../_services/master.service";
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'add-edit-absensi-kuis',
  styleUrls: ['./add-edit-absensi-kuis.component.scss'],
  templateUrl: './add-edit-absensi-kuis.component.html',
})

export class AddEditAbsensiKuisComponent implements OnDestroy, OnInit {
  dataForm: any;
  AbsensiKuisForm: FormGroup;
  matpelService = "core/mata-pelajaran-kelas";
  generateService = "core/generate-siswa";
  baseService = "core/absensi-kuis";
  updateAbsenService = "core/absensi-kuis-update"
  deleteAbsenService = "core/absensi-kuis-delete";
  cabangService = "core/cabang-all";
  kelasService = "core/kelas-all";
  guruService = "core/guru-all";
  listKelas : [];
  selectedKelas: [];
  listCabang : [];
  selectedCabang : [];
  listGuru : [];
  selectedGuru : [];
  listMatpel : [];
  selectedMatpel : [];
  selectedJenisSoal : [];
  type_form : Boolean;

  submitted : Boolean = false; 
  submitLoading: Boolean = false;
  type: string = 'Add';
  action : string = 'Save';
  actionSelect: String;
  defaultRole = "All Role";
  listRole = [];
  isLoadData = true;
  
  benar: any = {};
  salah: any = {};
  nilai: any = {};
  // baseService = "core/absensi-kuis-list"

  createdBy: any;
  modifiedBy: any;

  dataTable: any = [];
  isNotFound: Boolean = false;
  selectedRowCount = 0;
  selectedRowData: any = [];
  customAllRowsSelected = {};
  btnSearchClose: String = "btn-search";
  defaultStatus = "All Status";

  params: any;
  date: any;
  rows = [];  
  columns = [];
  selected = [];
  temp = [];
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
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {     
    this.AbsensiKuisForm = this.formBuilder.group({
      tanggal: ['', Validators.required],
      cabang: ['', Validators.required],
      kelas_inten: ['', Validators.required],
      matpel: ['', Validators.required],
      pengajar: ['', Validators.required],
      type: ['', Validators.required],
      topik: [''],
      jenis_soal: [''],
      jumlah_soal: [''],
      rumus: [''],
      tanggal_readonly: [''],
    });

  }

  ngOnInit() {
    this.page.pageNumber = 0;
    this.page.pageLimit = 10;
    
    this.getListCabang();
    this.getListKelas();
    this.getListGuru();
    this.route.queryParams.subscribe(params => {
      this.params= params;
      if (params.tanggal) {
        this.getListMatpel();
        this.type = 'Edit';
        this.AbsensiKuisForm.patchValue({
          'tanggal' : new Date(params.tanggal),
          'cabang' : params.cabang,
          'kelas_inten' : params.kelas_inten,
          'matpel' : params.mata_pelajaran,
          'pengajar' : params.guru,
          'type' : params.kuis,
          'topik' : params.topik,
          'jenis_soal' : params.jenis_soal,
          'jumlah_soal' : params.jumlah_soal,
          'tanggal_readonly' : moment(params.tanggal).format('ll')
        })
        // this.onSelectKelas(params.kelas_inten);
        this.onChangeType(params.kuis);
        this.getData(this.AbsensiKuisForm.value);
      } else {   
        this.isLoadData = false;
      }
    });
  }
  
  get f() { return this.AbsensiKuisForm.controls; }

  ngOnDestroy() { }

  async getData(dataPost) {
  // async getData() {    

    this.selected = [];
    this.selectedRowData = [];
    this.selectedRowCount = 0;
    this.isLoadData = true;
    const param = {
      "cabang" : dataPost.cabang,
      "kelas_inten" : dataPost.kelas_inten,
      "tanggal" : moment(dataPost.tanggal).format("YYYY-MM-DD"),
      "mata_pelajaran" : dataPost.matpel
    }
    
    // const param = {
    //   "cabang" : "welirang",
    //   "kelas_inten" : "ITA",
    //   "tanggal" : "10-10-2020"
    // }
    this.masterService.getList(this.generateService, param).subscribe((result) => {      
      if (result["payload"]) {
        this.rows = result["payload"]; 
        this.temp = result["payload"]; 
        
        this.AbsensiKuisForm.patchValue({
          'rumus' : this.rows[0].rumus ? this.rows[0].rumus : "" 
        })

        this.rows.forEach((item, index) => {
          this.selectedHadir[index] = item.hadir;        
          this.selectedAllHadir = this.rows.length == this.selectedHadir.length ? true : false;  
          this.selectedIzin[index] = item.izin;       
          this.selectedAllIzin = this.rows.length == this.selectedIzin.length ? true : false;     
          this.selectedAbsen[index] = item.absen;       
          this.selectedAllAbsen = this.rows.length == this.selectedAbsen.length ? true : false;      
          this.selectedSakit[index] = item.sakit;      
          this.selectedAllSakit = this.rows.length == this.selectedSakit.length ? true : false;         
        });
        this.page.totalItems = 10000;
        this.page.totalPages = 10000;
        this.isLoadData = false;
        this.isNotFound = false;
      } else {
        this.rows = [];
        this.page.totalItems = 0;
        this.page.totalPages = 0;
        this.isLoadData = false;
        this.isNotFound = true;
      }
    });
  }
  
  selectedHadir : any = [];
  selectedAllHadir : any = [];
  selectedAbsen : any = [];
  selectedAllAbsen : any = [];
  selectedIzin : any = [];
  selectedAllIzin : any = [];
  selectedSakit : any = [];
  selectedAllSakit : any = [];

  selectAll(event,type){
    this.temp.forEach((item, index) => {
      if (type === 'hadir') {
        this.selectedHadir[index] = event;
        item.hadir = event
      } 
      if (type === 'absen') {        
        this.selectedAbsen[index] = event;
        item.absen = event
      } 
      if (type === 'izin') {
        this.selectedIzin[index] = event;
        item.izin = event
      } 
      if (type === 'sakit') {
        this.selectedSakit[index] = event;
        item.sakit = event     
      } 
    });
    
    console.log(this.temp)
  }

  selectItem(event,type,index){
      if (type === 'hadir') {
        this.temp[index].hadir = event
        if (event){
          this.temp[index].absen = !event
          this.temp[index].izin = !event
          this.temp[index].sakit = !event
        }
      } 
      if (type === 'absen') {        
        this.temp[index].absen = event
        if (event){
          this.temp[index].hadir = !event
          this.temp[index].izin = !event
          this.temp[index].sakit = !event
        }
      } 
      if (type === 'izin') {
        this.temp[index].izin = event
        if (event){
          this.temp[index].hadir = !event
          this.temp[index].absen = !event
          this.temp[index].sakit = !event
        }
      } 
      if (type === 'sakit') {
        this.temp[index].sakit = event
        if (event){
          this.temp[index].hadir = !event
          this.temp[index].absen = !event
          this.temp[index].izin = !event
        }
      } 
  }
  // setPage(pageInfo) {
  //   this.page.pageNumber = pageInfo.offset ? pageInfo.offset : 0;
  //   this.getData();
  // }

  // setSort(sortInfo) {
  //   let orderByName = sortInfo.sorts[0].prop;
  //   this.page.orderBy = orderByName;
  //   this.page.orderDir = this.page.orderDir === "ASC" ? "DESC" : "ASC";
  //   this.getData();
  // }  

  // sortBy(strProp){
  //   this.page.orderBy = strProp;
  //   this.page.orderDir = this.page.orderDir === "ASC" ? "DESC" : "ASC";
  //   this.getData();
  // }

  getListCabang(){    
    this.masterService.getList(this.cabangService, '').subscribe(
      res => {
        this.listCabang = res['payload'];
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        // this.selectedCabang = currentUser.cabang;
        this.AbsensiKuisForm.patchValue({
          cabang : currentUser.cabang
        })

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
 
  onSelectKelas(event){
    this.AbsensiKuisForm.patchValue({
      'matpel' : undefined
    })
    this.getListMatpel();
  }
  
  onSelectMatpel(event){
    this.rows = [];
    this.page.totalItems = 0;
    this.page.totalPages = 0;
    this.isLoadData = false;
    this.isNotFound = true;
  }

  onSelectGuru(event){
    this.rows = [];
    this.page.totalItems = 0;
    this.page.totalPages = 0;
    this.isLoadData = false;
    this.isNotFound = true;
  }

  getListMatpel(){    
    const param = {
      kelas : this.AbsensiKuisForm.value.kelas_inten,
    };    
    
    this.listMatpel = [];
    this.selectedMatpel = undefined;
    this.masterService.getList(this.matpelService, param).subscribe(
      res => {
        this.listMatpel = res['payload'];
        if (this.type === 'Edit') this.selectedMatpel = this.params.mata_pelajaran;
        // this.selectedGuru = this.dataForm? this.dataForm.wali_kelas : [];
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }
  
  fieldChange(type, index, event){   
    var res = this.AbsensiKuisForm.value.rumus.replace("benar", event);
    this.nilai[index] = eval(res.toString()).toFixed(); 
    this.salah[index] = this.AbsensiKuisForm.value.jumlah_soal - event;    

    this.temp[index].benar = event;
    this.temp[index].salah = this.salah[index];
    this.temp[index].nilai = this.nilai[index];
  }

  onChangeType(event){
    this.type_form = event === "absensi"? true : false;

    if (event === "absensi"){
      this.AbsensiKuisForm.controls.jumlah_soal.disable();
      this.AbsensiKuisForm.controls.rumus.disable();
      this.AbsensiKuisForm.controls.topik.disable();
      this.AbsensiKuisForm.patchValue({
        'topik': '',
        'jenis_soal': '',
        'jumlah_soal': '',
        'rumus': '',
      })
    } else {
      this.AbsensiKuisForm.controls.jumlah_soal.enable();
      this.AbsensiKuisForm.controls.rumus.enable();
      this.AbsensiKuisForm.controls.topik.enable();
    }
    
  }

  onSubmit(type) {
    this.submitted = true;
    this.submitLoading = true;

    if (this.AbsensiKuisForm.invalid) {
      this.submitLoading = false;
      return;    
    } 
    
    if (this.type === 'Edit' || this.temp[0].id) this.onEditForm();
    else this.onCreateForm();    
  }

  onCreateForm(){
      const formData = this.AbsensiKuisForm.getRawValue();
      
      this.temp.map(data => {
        data.tanggal =  moment(formData.tanggal).format("YYYY-MM-DD");
        data.cabang = formData.cabang;
        data.kelas_inten = formData.kelas_inten;
        data.topik = formData.topik;
        data.mata_pelajaran = formData.matpel;
        data.guru = formData.pengajar;
        data.kuis = formData.type === 'kuis' ? true : false;
        data.jumlah_soal = formData.jumlah_soal;
        data.jenis_soal = formData.jenis_soal;
        data.rumus = formData.rumus;
      });

      const message = formData.type === 'kuis' ? 'Kuis' : 'Absensi';

      this.masterService.add(this.baseService, this.temp).subscribe(
        res => {
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully created a new ' + message);
                this.submitLoading = false;
                this.router.navigate(['/pages/absensi-kuis/']);
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
    const formData = this.AbsensiKuisForm.getRawValue();

    const param = { 
      "tanggal" : moment(formData.tanggal).format("YYYY-MM-DD"), 
      "cabang" : formData.cabang, 
      "kelas_inten" : formData.kelas_inten, 
      "mata_pelajaran" :formData.matpel, 
      "guru" : formData.pengajar, 
      "kuis" : formData.type == "kuis" ? true : false
    }

    this.masterService.deleteBy(this.deleteAbsenService, param).subscribe(
      res => {
          if (res['success']){     
              this.temp.map(data => {
                delete data.id
                  data.tanggal =  moment(formData.tanggal).format("YYYY-MM-DD");
                  data.cabang = formData.cabang;
                  data.kelas_inten = formData.kelas_inten;
                  data.topik = formData.topik;
                  data.mata_pelajaran = formData.matpel;
                  data.guru = formData.pengajar;
                  data.kuis = formData.type === 'kuis' ? true : false;
                  data.jumlah_soal = formData.jumlah_soal;
                  data.jenis_soal = formData.jenis_soal;
                  data.rumus = formData.rumus;
                  data.benar = formData.type === 'kuis' ? data.benar : 0;
                  data.salah = formData.type === 'kuis' ? data.salah : 0;
                  data.nilai = formData.type === 'kuis' ? data.nilai : 0;
              });
              const message = formData.type === 'kuis' ? 'Kuis' : 'Absensi';

              this.masterService.add(this.updateAbsenService, this.temp).subscribe(
                res => {
                    if (res['success']){                
                        this.showToast('top-right', 'success', 'You have successfully created a new ' + message);
                        this.submitLoading = false;
                        this.router.navigate(['/pages/absensi-kuis/']);
                    } else {
                      this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
                    }
                },
                err => {
                  this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
                },
              );    
          } else {
            this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
          }
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );       
  }  
  
  showToast(position, status, messages) {
    this.toastrService.show(
      '',
      messages,
      { position, status });
  }
}