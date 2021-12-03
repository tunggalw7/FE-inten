import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
// import { SystemUsersService } from "../_services/system-users.service";
declare var $: any;

@Injectable()

export class AuthGuard implements CanActivate {
  
  constructor(
    public router: Router,
    // private userService: SystemUsersService
  ) {}

  canActivate(): boolean {
    // Check user login token
    if (!this.getLocalToken()) {      
      this.clearUserData()
    } 
    // this.userStatus();

    return true;
  }

  // Checking user status
//   userStatus(){
//     this.userService.getUserStatus().subscribe(
//       res => {
//         if (res['message']  === 'USES_SUSPENDED' || res['message']  === 'USER_SUSPENDED') {
//           this.clearUserData();
//         }    
//       },
//       err => {
//       },
//     );
//   }

  // Get token in localstorage & session 
  public getLocalToken(): string {
    return localStorage.getItem("user_token");
  }
  
  public getSessionToken(): string {
    return sessionStorage.getItem("user_token");
  }


  // Clear session, localstorage and cookies 
  public clearUserData() {
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.removeItem("user_token");
    this.router.navigate(["/auth/login"]);
    return false;
  }
}
