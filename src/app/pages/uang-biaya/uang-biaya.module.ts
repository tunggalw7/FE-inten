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
} from '@nebular/theme';
import { ChartModule } from 'angular2-chartjs';
import { ThemeModule } from '../../@theme/theme.module';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UangBiayaRoutingModule } from './uang-biaya-routing.module';
import { UangBiayaComponent } from './uang-biaya.component';
import { ListUangBiayaComponent } from './list-uang-biaya/list-uang-biaya.component';
import { AddEditUangBiayaComponent } from './add-edit-uang-biaya/add-edit-uang-biaya.component';
import { DeleteUangBiayaComponent } from './delete-uang-biaya/delete-uang-biaya.component';
import { ListSiswaModalComponent } from './list-siswa/list-siswa.component';
import { ListSiswaComponent } from '../siswa/list-siswa/list-siswa.component';
import { NgxCurrencyModule } from "ngx-currency";
import { MainPageComponent } from './main-page/main-page.component';
import { PrintPageComponent } from './print-page/print-page.component';
import { UangBiayaReportComponent } from './uang-biaya-report/uang-biaya-report.component';

@NgModule({
  imports: [
    NbPopoverModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbListModule,
    UangBiayaRoutingModule,
    ThemeModule,
    DataTablesModule,
    NbTooltipModule,
    NbMenuModule,
    NbLayoutModule,
    ChartModule,
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
    NgxCurrencyModule
  ],
  declarations: [
    UangBiayaComponent,
    ListUangBiayaComponent,
    ListSiswaModalComponent,
    AddEditUangBiayaComponent,
    DeleteUangBiayaComponent,  
    MainPageComponent,
    PrintPageComponent,
    UangBiayaReportComponent  
  ],
  providers: [
    // NbDialogService
  ],
})
export class UangBiayaModule {
}
