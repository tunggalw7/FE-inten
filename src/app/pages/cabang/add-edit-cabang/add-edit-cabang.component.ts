import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { NbToastrService } from '@nebular/theme';
import { MasterService } from "../../../_services/master.service";

@Component({
  selector: 'add-edit-cabang',
  styleUrls: ['./add-edit-cabang.component.scss'],
  templateUrl: './add-edit-cabang.component.html',
})

export class AddEditCabangComponent implements OnDestroy, OnInit {
  AddEditForm: FormGroup;
  dataForm: any;
  baseService = "core/cabang";
  kelasService = "core/kelas-all";
  listKelas : [];
  selectedKelas: [];
  submitted : Boolean = false; 
  submitLoading: Boolean = false;
  type: string = 'Add';
  action : string = 'Save';

  constructor(
    protected ref: NbDialogRef<AddEditCabangComponent>,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.AddEditForm = this.formBuilder.group({
      nama_cabang: ['', Validators.required],
      kelas: ['', Validators.required]
    });

    this.getListKelas();

    if (this.dataForm){     
      this.type = 'Edit';
      this.action = 'Update'; 
      this.AddEditForm.patchValue({
        nama_cabang : this.dataForm.nama_cabang
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
        "nama_cabang": dataPost.nama_cabang,
        "kelas": dataPost.kelas
      }

      this.masterService.add(this.baseService, param).subscribe(
        res => {
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully created a new cabang.');
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
        "nama_cabang": dataPost.nama_cabang,
        "kelas": dataPost.kelas
      }

      this.masterService.edit(this.baseService, param, this.dataForm.id).subscribe(
        res => {
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully updated a cabang.');
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