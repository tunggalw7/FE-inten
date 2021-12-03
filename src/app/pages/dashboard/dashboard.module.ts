import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbInputModule,
  NbRadioModule,
  NbCheckboxModule,
  NbIconModule,
  NbDialogModule,
  NbDatepickerModule,
  NbTooltipModule,
  NbSpinnerModule,
  NbPopoverModule,
  NbButtonGroupModule
} from '@nebular/theme';
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardSiswaIPAComponent } from './dashboard-siswa-ipa/dashboard-siswa-ipa.component';
import { DashboardSiswaIPSComponent } from './dashboard-siswa-ips/dashboard-siswa-ips.component';
import { DashboardFOComponent } from './dashboard-fo/dashboard-fo.component';
import { DashboardHomeComponent } from './dashboard/dashboard.component';
import { AbsensiSiswaIPAComponent } from './absensi-siswa-ipa/absensi-siswa-ipa.component';
import { AbsensiSiswaIPSComponent } from './absensi-siswa-ips/absensi-siswa-ips.component';
import { QuizSiswaIPAComponent } from './quiz-siswa-ipa/quiz-siswa-ipa.component';
import { QuizSiswaIPSComponent } from './quiz-siswa-ips/quiz-siswa-ips.component';

@NgModule({
  imports: [
    NbPopoverModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbListModule,
    DashboardRoutingModule,
    ThemeModule,
    DataTablesModule,
    NbTooltipModule,
    NbMenuModule,
    NbLayoutModule,
    ChartModule,
    NgxEchartsModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    NbRadioModule,
    NbCheckboxModule,
    NbIconModule,
    NbDialogModule,
    NbDatepickerModule,
    NbSpinnerModule,
    NgxSkeletonLoaderModule,
    NgxDatatableModule,
    NbButtonGroupModule
  ],
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DashboardSiswaIPAComponent,
    DashboardSiswaIPSComponent,
    DashboardFOComponent,
    AbsensiSiswaIPAComponent,
    AbsensiSiswaIPSComponent,
    QuizSiswaIPAComponent,
    QuizSiswaIPSComponent
  ],
  providers: [
    // NbDialogService
  ],
})
export class DashboardModule {
}
