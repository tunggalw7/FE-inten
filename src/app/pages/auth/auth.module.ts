import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbLayoutModule, NbSelectModule } from '@nebular/theme';
import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbIconModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxLoginComponent } from './login/login.component';
import { NgxAuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbIconModule,
    NbAuthModule,
    NbEvaIconsModule,
    NbCardModule,
    NbLayoutModule,
    NbSelectModule,
    NbSpinnerModule,
  ],
  declarations: [
    NgxAuthComponent,
    NgxLoginComponent
  ],
})
export class NgxAuthModule { }
