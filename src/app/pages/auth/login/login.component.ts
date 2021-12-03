import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { MasterService } from "../../../_services/master.service";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss", "../auth.component.scss"],
})
export class NgxLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  signInLoading: boolean = false;
  showPassword: boolean = false;
  baseService = "core/users/authenticate";
  siswaService = "core/siswa-nis";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private masterService: MasterService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      nama: [
        "",
        [
          Validators.required
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
      rememberMe: [false],
    });
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

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(formData) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    let param = {
      no_induk: formData.nama,
      password: formData.password,
    };

    this.signInLoading = true;
    this.masterService.add(this.baseService, param).subscribe(
      (res) => {
        if (res['success']){                            
            localStorage.setItem("user_token", res["token"].slice(3).trim());
            localStorage.setItem("currentUser", JSON.stringify(res["user"]));

            if (!formData.rememberMe) {
              sessionStorage.setItem("user_token", res["token"]);
            }

            if (res["user"].role === "Siswa"){              
                this.masterService.getByID(this.siswaService, res["user"].no_induk).subscribe(
                  (result) => {
                    localStorage.setItem("jurusan", result["payload"].jurusan);
                    if (result["payload"].jurusan === 'ITA') {
                      this.router.navigate(['/pages/dashboard/home']);
                    } else {
                      this.router.navigate(['/pages/dashboard/home']);
                    }
                  },
                  (err) => {
                  }
                );
            } else if (res["user"].role === "General Admin") {
              localStorage.setItem("jurusan", "fo");
              this.router.navigate(['/pages/cabang']);
            } else if (res["user"].role === "Guru") {
              localStorage.setItem("jurusan", "fo");
              this.router.navigate(['/pages/siswa']);
            } else {
              localStorage.setItem("jurusan", "fo");
              this.router.navigate(['/pages/dashboard/home']);
            }               
        } else {    
            this.showToast('top-right', 'danger', res["message"]);    
            setTimeout(() => {
              this.signInLoading = false;  
            }, 0);                
        }
      },
      (err) => {
        this.signInLoading = false;
      }
    );
  }

  showToast(position, status, messages) {
    this.toastrService.show(
      '',
      messages,
      { position, status });
  }
}
