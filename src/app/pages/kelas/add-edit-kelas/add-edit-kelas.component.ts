import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { NbToastrService } from '@nebular/theme';
import { MasterService } from "../../../_services/master.service";

@Component({
  selector: 'add-edit-kelas',
  styleUrls: ['./add-edit-kelas.component.scss'],
  templateUrl: './add-edit-kelas.component.html',
})

export class AddEditKelasComponent implements OnDestroy, OnInit {
  AddEditForm: FormGroup;
  dataForm: any;
  baseService = "core/kelas";
  submitted : Boolean = false; 
  submitLoading: Boolean = false;
  type: string = 'Add';
  action : string = 'Save';

  constructor(
    protected ref: NbDialogRef<AddEditKelasComponent>,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.AddEditForm = this.formBuilder.group({
      nama_kelas: ['', Validators.required]
    });

    if (this.dataForm){     
      this.type = 'Edit';
      this.action = 'Update'; 
      this.AddEditForm.patchValue({
        nama_kelas : this.dataForm.nama_kelas
      })
    }
  }
  
  get f() { return this.AddEditForm.controls; }

  onCancel() {
    this.ref.close();
  }

  ngOnDestroy() { }
 
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
        "nama_kelas": dataPost.nama_kelas
      }

      this.masterService.add(this.baseService, param).subscribe(
        res => {
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully created a new kelas.');
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
        "nama_kelas": dataPost.nama_kelas
      }

      this.masterService.edit(this.baseService, param, this.dataForm.id).subscribe(
        res => {
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully updated a kelas.');
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