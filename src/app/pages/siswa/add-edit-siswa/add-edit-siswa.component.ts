import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { NbToastrService } from '@nebular/theme';
import { MasterService } from "../../../_services/master.service";
import * as moment from 'moment';

@Component({
  selector: 'add-edit-siswa',
  styleUrls: ['./add-edit-siswa.component.scss'],
  templateUrl: './add-edit-siswa.component.html',
})

export class AddEditSiswaComponent implements OnDestroy, OnInit {
  AddEditForm: FormGroup;
  dataForm: any;
  baseService = "core/siswa";
  cabangService = "core/cabang-all";
  kelasService = "core/kelas-all";
  guruService = "core/guru-all";
  jurusanIntenService = "core/jurusan-inten-all";
  sekolahService = "core/sekolah-all";
  jurusanUniversitasService = "core/jurusan-universitas-all";
  universitasService = "core/universitas-all";
  profileService = "core/users/profile";

  listKelas : [];
  listCabang : [];
  listGuru : [];
  listJurusanInten : [];
  listJurusanUniversitas = [];
  listSekolah : [];
  listUniversitas = [];
  listDays = [];

  selectedKelas: [];
  selectedCabang : [];
  selectedGuru : [];
  selectedJurusanInten : [];
  selectedJurusanUniversitas1 = [];
  selectedJurusanUniversitas2 = [];
  selectedSekolah : [];
  selectedUniversitas1 : [];
  selectedUniversitas2 : [];

  listYears = ["2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035"]

  listAgama = ["ISLAM","PROTESTAN","KATOLIK","HINDU","BUDHA","KHONGHUCU"];
  dateStart: any;
  min: Date;
  max: Date;

  dateMasuk: any;
  dateLahir: any;

  submitted : Boolean = false; 
  submitLoading: Boolean = false;
  type: string = 'Add';
  action : string = 'Save';
  role: string;
  
  constructor(
    protected ref: NbDialogRef<AddEditSiswaComponent>,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastrService: NbToastrService
  ) {
    this.getProfileInfo();
  }
  optionItems = [
    {id: 'Max',     value: 'Max',     text: 'Maximum'},
    {id: 'Average', value: 'Average', text: 'Average'},
    {id: 'Sum',     value: 'Sum',     text: 'Total'},
    {id: 'Last',    value: 'Last',    text: 'Last'}
  ];

  maxRowsLimitation;selectedText;
  ngOnInit() {
    this.maxRowsLimitation = this.optionItems[0];
    this.selectedText = "Maximum";
    this.AddEditForm = this.formBuilder.group({
      nis: ['', Validators.required],
      nama: ['', Validators.required],
      jkel: ['', Validators.required],
      agama: ['', Validators.required],
      aptitude: ['', Validators.required],
      sekolah: ['', Validators.required],
      tahun_ajaran: ['', Validators.required],
      kelas_sekolah: ['', Validators.required],
      jurusan_inten: ['', Validators.required],
      cabang: ['', Validators.required],
      kelas_inten: ['', Validators.required],
      jurusan_1: ['', Validators.required],
      jurusan_2: ['', Validators.required],
      universitas_1: ['', Validators.required],
      universitas_2: ['', Validators.required],
      hari_les: ['', Validators.required],
      tanggal_masuk: ['', Validators.required],
      total_biaya: ['', Validators.required],
      keterangan: ['', Validators.required],
      nit: ['', Validators.required],
      wali_kelas: ['', Validators.required],
      tempat_lahir: ['', Validators.required],
      tanggal_lahir: ['', Validators.required],
      alamat: ['', Validators.required],
      no_tlp: ['', Validators.required],
      email: ['', Validators.required],
      nama_ayah: ['', Validators.required],
      pekerjaan_ayah: ['', Validators.required],
      no_tlp_ayah: ['', Validators.required],
      nama_ibu: ['', Validators.required],
      pekerjaan_ibu: ['', Validators.required],
      no_tlp_ibu: ['', Validators.required]
    });

    this.getListCabang();
    this.getListDays();
    this.getListGuru();
    this.getListJurusanInten();
    this.getListJurusanUniversitas();
    this.getListKelas();
    this.getListSekolah();
    this.getListUniversitas();

    this.min = new Date();
    this.min .setDate(this.min .getDate()-1);
    
    if (this.dataForm){     
      
      this.type = 'Edit';
      this.action = 'Update'; 
      
      const hari_les = this.dataForm.hari_les? this.dataForm.hari_les.trim() : null;
      this.AddEditForm.patchValue({
        nis : this.dataForm.nis,
        nama : this.dataForm.nama,
        jkel : this.dataForm.jkel,
        agama : this.dataForm.agama,
        aptitude : this.dataForm.aptitude,
        sekolah : this.dataForm.sekolah,
        tahun_ajaran : this.dataForm.tahun_ajaran,
        kelas_sekolah : this.dataForm.kelas_sekolah,
        jurusan_inten : this.dataForm.jurusan,
        cabang : this.dataForm.cabang,
        kelas_inten : this.dataForm.kelas_inten,
        jurusan_1 : this.dataForm.pilihan_jurusan_1,
        jurusan_2 : this.dataForm.pilihan_jurusan_2,
        universitas_1 : this.dataForm.universitas_1,
        universitas_2 : this.dataForm.universitas_2,
        hari_les : hari_les? hari_les.trim().split(',') : null,
        tanggal_masuk : new Date(this.dataForm.tanggal_masuk),
        total_biaya : this.dataForm.total_biaya,
        keterangan : this.dataForm.keterangan,
        nit : this.dataForm.nit,
        wali_kelas : this.dataForm.wali_kelas,
        tempat_lahir : this.dataForm.tempat_lahir,
        tanggal_lahir : new Date(this.dataForm.tanggal_lahir),
        email : this.dataForm.email,
        alamat : this.dataForm.alamat,
        no_tlp : this.dataForm.no_tlp,
        nama_ayah : this.dataForm.nama_ayah,
        pekerjaan_ayah : this.dataForm.pekerjaan_ayah,
        no_tlp_ayah : this.dataForm.no_tlp_ayah,
        nama_ibu : this.dataForm.nama_ibu,
        pekerjaan_ibu : this.dataForm.pekerjaan_ibu,
        no_tlp_ibu : this.dataForm.no_tlp_ibu,
      })
    }
    this.dateMasuk = new Date(this.dataForm.tanggal_masuk);
    this.dateLahir = new Date(this.dataForm.tanggal_lahir);    
 
  }
  

  get f() { return this.AddEditForm.controls; }

  onCancel() {
    this.ref.close();
  }

  ngOnDestroy() { }

  
  getProfileInfo() {
    this.masterService.getList(this.profileService, '').subscribe(async (result) => {
      this.role = result['user'].role;
    });
  }

  getListDays(){
    this.listDays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  }
  
  getListCabang(){    
    this.masterService.getList(this.cabangService, '').subscribe(
      res => {
        this.listCabang = res['payload'];
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        // this.selectedCabang = currentUser.cabang;
        this.AddEditForm.patchValue({
          cabang : currentUser.cabang
        })
        // this.selectedCabang = this.dataForm.cabang;
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
        // this.selectedKelas = this.dataForm? this.dataForm.wali_kelas : [];
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }

  getListJurusanInten(){    
    this.masterService.getList(this.jurusanIntenService, '').subscribe(
      res => {
        this.listJurusanInten = res['payload'];
        // this.selectedJurusanInten = this.dataForm? this.dataForm.wali_kelas : [];
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }

  async getListJurusanUniversitas(){    
    this.masterService.getList(this.jurusanUniversitasService, '').subscribe(
      res => {
        
        this.listJurusanUniversitas = res["payload"];
        if (this.dataForm){
          // this.selectedJurusanUniversitas1 = this.listJurusanUniversitas.filter(el => el.text === this.dataForm.pilihan_jurusan_1)[0].id;
          // this.selectedJurusanUniversitas2 = this.listJurusanUniversitas.filter(el => el.text === this.dataForm.pilihan_jurusan_2)[0].id;          
          // this.AddEditForm.patchValue({
          // jurusan_1 : this.selectedJurusanUniversitas1,
          // jurusan_2 : this.selectedJurusanUniversitas2,
          // })
        }

        this.loadJurusanService = false; 
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }

  loadJurusanService = true;
  loadUniversitasService = true;

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

  getListSekolah(){    
    this.masterService.getList(this.sekolahService, '').subscribe(
      res => {
        this.listSekolah = res['payload'];
        // this.selectedKelas = this.dataForm? this.dataForm.wali_kelas : [];
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }

  getListUniversitas(){    
    this.masterService.getList(this.universitasService, '').subscribe(
      res => {
        this.listUniversitas = res['payload'];
        if (this.dataForm){
          // this.selectedUniversitas1 = this.listUniversitas.filter(el => el.text === this.dataForm.universitas_1)[0].id;
          // this.selectedUniversitas2 = this.listUniversitas.filter(el => el.text === this.dataForm.universitas_2)[0].id;
          // this.AddEditForm.patchValue({
          //   universitas_1 : this.selectedUniversitas1,
          //   universitas_2 : this.selectedUniversitas2,
          // })
        }
        this.loadUniversitasService = false; 
        // this.selectedKelas = this.dataForm? this.dataForm.wali_kelas : [];
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  } 

  onSelectJurusanUniv1(event){
    if (event){
      this.AddEditForm.patchValue({
        jurusan_1 : event
      })
    }
  }

  onSelectJurusanUniv2(event){
    if (event){
      this.AddEditForm.patchValue({
        jurusan_2 : event
      })
    }
  }

  onSelectUniv1(event){
    if (event){
      this.AddEditForm.patchValue({
        universitas_1 : event
      })
    }
  }

  onSelectUniv2(event){
    if (event){
      this.AddEditForm.patchValue({
        universitas_2 : event
      })
    }
  }

  jurusan_1;
  jurusan_2;
  univ_1;
  univ_2;
  
  async checkJurusanUniversitas(data){
    this.jurusan_1 = this.listJurusanUniversitas.filter(el => el.id.toString() === data.jurusan_1)[0].text;
    this.jurusan_2 = this.listJurusanUniversitas.filter(el => el.id.toString() === data.jurusan_2)[0].text;
    this.univ_1 = this.listUniversitas.filter(el => el.id.toString() === data.universitas_1)[0].text;
    this.univ_2 = this.listUniversitas.filter(el => el.id.toString() === data.universitas_2)[0].text;
  }

  onSubmit(formData) {
    this.submitted = true;
    this.submitLoading = true;

    if (this.AddEditForm.invalid) {
      this.submitLoading = false;
      return;    
    } 

    // this.checkJurusanUniversitas(formData);
    
    if (this.dataForm) this.onEditForm(formData);
    else this.onCreateForm(formData);
    // setTimeout(() => {
    //   if (this.dataForm) this.onEditForm(formData);
    //   else this.onCreateForm(formData);
    // }, 3000); 
        
  }

  onCreateForm(dataPost){
      const param = {
        "nis" : dataPost.nis,
        "nama" : dataPost.nama,
        "jkel" : dataPost.jkel,
        "agama" : dataPost.agama,
        "aptitude" : dataPost.aptitude,
        "sekolah" : dataPost.sekolah,
        "tahun_ajaran" : dataPost.tahun_ajaran,
        "kelas_sekolah" : dataPost.kelas_sekolah,
        "jurusan" : dataPost.jurusan_inten,
        "cabang" : dataPost.cabang,
        "kelas_inten" : dataPost.kelas_inten,
        // "pilihan_jurusan_1" : this.jurusan_1,
        // "universitas_1" : this.univ_1,
        // "pilihan_jurusan_2" : this.jurusan_2,
        // "universitas_2" : this.univ_2,
        "pilihan_jurusan_1" : dataPost.jurusan_1,
        "universitas_1" : dataPost.universitas_1,
        "pilihan_jurusan_2" : dataPost.jurusan_2,
        "universitas_2" : dataPost.universitas_2,
        "hari_les" : dataPost.hari_les.join(),
        "tanggal_masuk" : moment(dataPost.tanggal_masuk).format("YYYY-MM-DD"),
        "total_biaya" : dataPost.total_biaya,
        "keterangan" : dataPost.keterangan,
        "nit" : dataPost.nit,
        "wali_kelas" : dataPost.wali_kelas,
        "tempat_lahir": dataPost.tempat_lahir,
        "tanggal_lahir" : dataPost.tanggal_lahir,
        "alamat" : dataPost.alamat,
        "no_tlp" : dataPost.no_tlp,
        "email" : dataPost.email,
        "nama_ayah" : dataPost.nama_ayah,
        "pekerjaan_ayah" : dataPost.pekerjaan_ayah,
        "no_tlp_ayah" : dataPost.no_tlp_ayah,
        "nama_ibu" : dataPost.nama_ibu,
        "pekerjaan_ibu" : dataPost.pekerjaan_ibu,
        "no_tlp_ibu" : dataPost.no_tlp_ibu,
    }
     
    this.masterService.add(this.baseService, param).subscribe(
      res => {
          if (res['success']){                
              this.showToast('top-right', 'success', 'You have successfully created a new siswa.');
              this.ref.close({'success' : true});
          } else {
            this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
          }
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );      
  }

  onEditForm(dataPost){
      const param = {
          "nis" : dataPost.nis,
          "nama" : dataPost.nama,
          "jkel" : dataPost.jkel,
          "agama" : dataPost.agama,
          "aptitude" : dataPost.aptitude,
          "sekolah" : dataPost.sekolah,
          "tahun_ajaran" : dataPost.tahun_ajaran,
          "kelas_sekolah" : dataPost.kelas_sekolah,
          "jurusan" : dataPost.jurusan_inten,
          "cabang" : dataPost.cabang,
          "kelas_inten" : dataPost.kelas_inten,
          // "pilihan_jurusan_1" : this.jurusan_1,
          // "universitas_1" : this.univ_1,
          // "pilihan_jurusan_2" : this.jurusan_2,
          // "universitas_2" : this.univ_2,
          "pilihan_jurusan_1" : dataPost.jurusan_1,
          "universitas_1" : dataPost.universitas_1,
          "pilihan_jurusan_2" : dataPost.jurusan_2,
          "universitas_2" : dataPost.universitas_2,
          // "pilihan_jurusan_1" : "Gizi",
          // "universitas_1" : "Universitas Brawijaya",
          // "pilihan_jurusan_2" : "Gizi",
          // "universitas_2" : "Universitas Brawijaya",
          "hari_les" : dataPost.hari_les.join(),
          "tanggal_masuk" : dataPost.tanggal_masuk,
          "total_biaya" : dataPost.total_biaya,
          "keterangan" : dataPost.keterangan,
          "nit" : dataPost.nit,
          "wali_kelas" : dataPost.wali_kelas,
          "tempat_lahir": dataPost.tempat_lahir,
          "tanggal_lahir" : dataPost.tanggal_lahir,
          "alamat" : dataPost.alamat,
          "no_tlp" : dataPost.no_tlp,
          "email" : dataPost.email,
          "nama_ayah" : dataPost.nama_ayah,
          "pekerjaan_ayah" : dataPost.pekerjaan_ayah,
          "no_tlp_ayah" : dataPost.no_tlp_ayah,
          "nama_ibu" : dataPost.nama_ibu,
          "pekerjaan_ibu" : dataPost.pekerjaan_ibu,
          "no_tlp_ibu" : dataPost.no_tlp_ibu,
      }
      this.masterService.edit(this.baseService, param, this.dataForm.id).subscribe(
        res => {
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully updated a siswa.');
                this.ref.close({'success' : true});
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