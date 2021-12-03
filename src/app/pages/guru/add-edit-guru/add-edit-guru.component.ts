import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { NbToastrService } from '@nebular/theme';
import { MasterService } from "../../../_services/master.service";

@Component({
  selector: 'add-edit-guru',
  styleUrls: ['./add-edit-guru.component.scss'],
  templateUrl: './add-edit-guru.component.html',
})

export class AddEditGuruComponent implements OnDestroy, OnInit {
  AddEditForm: FormGroup;
  dataForm: any;
  baseService = "core/guru";
  cabangService = "core/cabang-all";
  kelasService = "core/kelas-all";
  matpelListService ="core/mata-pelajaran-list-all";
  listKelas : [];
  selectedKelas: [];
  selectedMatpel: [];
  listCabang : [];
  selectedCabang : [];
  submitted : Boolean = false; 
  submitLoading: Boolean = false;
  type: string = 'Add';
  action : string = 'Save';

  constructor(
    protected ref: NbDialogRef<AddEditGuruComponent>,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.AddEditForm = this.formBuilder.group({
      nip: ['', Validators.required],
      nama: ['', Validators.required],
      initial: ['', Validators.required],
      alamat: ['', Validators.required],
      no_tlp: ['', Validators.required],
      cabang: ['', Validators.required],
      nama_mata_pelajaran: ['', Validators.required],
      kelas: [''],
    });

    this.getListCabang();
    this.getListKelas();
    this.getMatpelList();

    if (this.dataForm){     
      
      this.type = 'Edit';
      this.action = 'Update'; 
      this.AddEditForm.patchValue({
        nip : this.dataForm.nip,
        nama : this.dataForm.nama,
        initial : this.dataForm.initial,
        cabang : this.dataForm.cabang,
        alamat : this.dataForm.alamat,
        no_tlp : this.dataForm.no_tlp,
        nama_mata_pelajaran: this.dataForm.mata_pelajaran.split(',')
      })
    }
  }
  
  get f() { return this.AddEditForm.controls; }

  onCancel() {
    this.ref.close();
  }

  ngOnDestroy() { }

  getListCabang(){    
    this.masterService.getList(this.cabangService, '').subscribe(
      res => {
        this.listCabang = res['payload'];
        this.selectedCabang = this.dataForm.cabang;
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
        this.selectedKelas = this.dataForm? this.dataForm.wali_kelas : [];
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }
 
  listMatpel = [];
  async getMatpelList() {
    this.masterService.getList(this.matpelListService, 'param').subscribe((res) => {
      this.listMatpel = res['payload'];    
      this.selectedMatpel = this.dataForm.mata_pelajaran.split(',');  
    });
  }
  
  onSubmit(formData) {
    this.submitted = true;
    this.submitLoading = true;

    if (this.AddEditForm.invalid) {
      this.submitLoading = false;
      return;    
    } 
    
    if (this.dataForm) this.onEditForm(formData);
    else this.onCreateForm(formData);    
  }

  onCreateForm(dataPost){
      const param = {
        "nip": dataPost.nip,
        "nama": dataPost.nama,
        "initial": dataPost.initial,
        "alamat": dataPost.alamat,
        "no_tlp": dataPost.no_tlp,
        "cabang": dataPost.cabang,
        "wali_kelas": dataPost.kelas,
        "mata_pelajaran": dataPost.nama_mata_pelajaran
      }

      this.masterService.add(this.baseService, param).subscribe(
        res => {
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully created a new guru.');
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
        "nip": dataPost.nip,
        "nama": dataPost.nama,
        "initial": dataPost.initial,
        "alamat": dataPost.alamat,
        "no_tlp": dataPost.no_tlp,
        "cabang": dataPost.cabang,
        "wali_kelas": dataPost.kelas,
        "mata_pelajaran": dataPost.nama_mata_pelajaran
      }

      this.masterService.edit(this.baseService, param, this.dataForm.id).subscribe(
        res => {
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully updated a guru.');
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