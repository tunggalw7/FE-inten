import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { NbToastrService } from '@nebular/theme';
import { MasterService } from "../../../_services/master.service";
import { RegexValidator } from '../../../_helpers/regex';

@Component({
  selector: 'add-edit-users',
  styleUrls: ['./add-edit-users.component.scss'],
  templateUrl: './add-edit-users.component.html',
})

export class AddEditUsersComponent implements OnDestroy, OnInit {
  AddEditForm: FormGroup;
  dataForm: any;
  baseService = "core/users";
  cabangService = "core/cabang-all";
  listCabang : [];
  selectedCabang : [];
  selectedRole : [];
  submitted : Boolean = false; 
  submitLoading: Boolean = false;
  showPassword: boolean = false;
  type: string = 'Add';
  action : string = 'Save';
  listRole = ["Wali Kelas", "Koordinator Cabang", "Keuangan Jatim", "Manajer Akademik", "Manajemen", "Siswa", "Guru", "General Admin"];

  constructor(
    protected ref: NbDialogRef<AddEditUsersComponent>,
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.AddEditForm = this.formBuilder.group({
      nama: ['', Validators.required],
      email: [''],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ]
      ],
      alamat: [''],
      no_tlp: [''],
      cabang: ['', Validators.required],
      role: ['', Validators.required],
      is_active: ['', Validators.required],
      no_induk: ['', Validators.required]
    });

    this.getListCabang();

    if (this.dataForm){     
      this.type = 'Edit';
      this.action = 'Update'; 
      this.selectedRole = this.dataForm.role;
      this.AddEditForm.patchValue({
        nama : this.dataForm.name,
        email : this.dataForm.email,
        alamat : this.dataForm.alamat,
        no_tlp : this.dataForm.no_tlp,
        cabang : this.dataForm.cabang,
        role : this.dataForm.role,
        is_active : this.dataForm.is_active ? 'active' : 'suspended',
        no_induk : this.dataForm.no_induk,
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
        "name": dataPost.nama,
        "email": dataPost.email,
        "password": dataPost.password,
        "alamat": dataPost.alamat,
        "no_tlp": dataPost.no_tlp,
        "cabang": dataPost.cabang,
        "role": dataPost.role,
        "is_active": dataPost.is_active === 'active' ? true : false,
        "no_induk": dataPost.no_induk
      }

      this.masterService.add(this.baseService, param).subscribe(
        res => {
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully created a new users.');
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
        "name": dataPost.nama,
        "email": dataPost.email,
        "password": dataPost.password,
        "alamat": dataPost.alamat,
        "no_tlp": dataPost.no_tlp,
        "cabang": dataPost.cabang,
        "role": dataPost.role,
        "is_active": dataPost.is_active === 'active' ? true : false,
        "no_induk": dataPost.no_induk
      }

      this.masterService.edit(this.baseService, param, this.dataForm.id).subscribe(
        res => {
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully updated a users.');
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
  
  getInputType() {
    if (this.showPassword) {
      return "text";
    }
    return "password";
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  showToast(position, status, messages) {
    this.toastrService.show(
      '',
      messages,
      { position, status });
  }
}