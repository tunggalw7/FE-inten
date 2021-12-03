import { Component } from '@angular/core';
import { NbAuthComponent } from '@nebular/auth';

@Component({
    selector: 'auth',
    styleUrls: ['./auth.component.scss'],
    template: `
    
    
      <nb-layout>
        <nb-layout-column class="auth-layout-card">
          <div class="logo-wrapper">
            <img src="../../../assets/images/logo-inten-jatim.png">
          </div>
          <div class="d-flex auth-wrapper">
            <div class="background-wrapper">
              <img src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/login-v2.72cd8a26.svg">
            </div>
            <div class="login-wrapper">
              <nb-auth-block class="login-card">
                <router-outlet></router-outlet>
              </nb-auth-block>   
            </div>
          </div>
       
        </nb-layout-column>
      </nb-layout>
    `,
})
export class NgxAuthComponent extends NbAuthComponent {
}