import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageGuard } from '../../_helpers/page.guard';
import { NgxAuthComponent } from './auth.component';
import { NgxLoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: NgxAuthComponent,
    children: [ 
      {
        path: '',
        // component: NgxLoginComponent,
        redirectTo: 'login',
        canActivate: [PageGuard],
      },
      {
        path: 'login',
        component: NgxLoginComponent,
        canActivate: [PageGuard],
      },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {}
