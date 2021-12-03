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
import { AbsensiKuisRoutingModule } from './absensi-kuis-routing.module';
import { AbsensiKuisComponent } from './absensi-kuis.component';
import { ListAbsensiKuisComponent } from './list-absensi-kuis/list-absensi-kuis.component';
import { AddEditAbsensiKuisComponent } from './add-edit-absensi-kuis/add-edit-absensi-kuis.component';
import { DeleteAbsensiKuisComponent } from './delete-absensi-kuis/delete-absensi-kuis.component';

@NgModule({
  imports: [
    NbPopoverModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbListModule,
    AbsensiKuisRoutingModule,
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
  ],
  declarations: [
    AbsensiKuisComponent,
    ListAbsensiKuisComponent,
    AddEditAbsensiKuisComponent,
    DeleteAbsensiKuisComponent
  ],
  providers: [
    // NbDialogService
  ],
})
export class AbsensiKuisModule {
}
