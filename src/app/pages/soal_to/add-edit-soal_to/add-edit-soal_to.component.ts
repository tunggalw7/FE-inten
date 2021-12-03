import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { NbToastrService } from '@nebular/theme';
import { MasterService } from "../../../_services/master.service";

@Component({
  selector: 'add-edit-soal_to',
  styleUrls: ['./add-edit-soal_to.component.scss'],
  templateUrl: './add-edit-soal_to.component.html',
})

export class AddEditSoalToComponent implements OnDestroy, OnInit {
  AddEditForm: FormGroup;
  dataForm: any;
  baseService = "core/soal-to";
  kelasService = "core/kelas-all";
  listKelas : [];
  selectedKelas: [];
  submitted : Boolean = false; 
  submitLoading: Boolean = false;
  type: string = 'Add';
  action : string = 'Save';

  constructor(
    protected ref: NbDialogRef<AddEditSoalToComponent>,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.AddEditForm = this.formBuilder.group({
      nama_soal: ['', Validators.required],
      link: ['', Validators.required],
      kelas: ['', Validators.required],
    });

    this.getListKelas();

    if (this.dataForm){     
      
      this.type = 'Edit';
      this.action = 'Update'; 
      this.AddEditForm.patchValue({
        nama_soal : this.dataForm.nama_soal,
        link : this.dataForm.link,
        kelas : this.dataForm.kelas
      })
    }
  }
  
  get f() { return this.AddEditForm.controls; }

  onCancel() {
    this.ref.close();
  }

  ngOnDestroy() { }

  getListKelas(){    
    this.masterService.getList(this.kelasService, '').subscribe(
      res => {
        this.listKelas = res['payload'];
        this.selectedKelas = this.dataForm.kelas.split(',');
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
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
        "nama_soal": dataPost.nama_soal,
        "link": dataPost.link,
        "kelas": dataPost.kelas,
      }

      this.masterService.add(this.baseService, param).subscribe(
        res => {
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully created a new soal_to.');
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
        "nama_soal": dataPost.nama_soal,
        "link": dataPost.link,
        "kelas": dataPost.kelas,
      }

      this.masterService.edit(this.baseService, param, this.dataForm.id).subscribe(
        res => {
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully updated a soal_to.');
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