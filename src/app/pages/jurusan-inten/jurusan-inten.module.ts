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
import { JurusanIntenRoutingModule } from './jurusan-inten-routing.module';
import { JurusanIntenComponent } from './jurusan-inten.component';
import { ListJurusanIntenComponent } from './list-jurusan-inten/list-jurusan-inten.component';
import { AddEditJurusanIntenComponent } from './add-edit-jurusan-inten/add-edit-jurusan-inten.component';
import { DeleteJurusanIntenComponent } from './delete-jurusan-inten/delete-jurusan-inten.component';

@NgModule({
  imports: [
    NbPopoverModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbListModule,
    JurusanIntenRoutingModule,
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
    JurusanIntenComponent,
    ListJurusanIntenComponent,
    AddEditJurusanIntenComponent,
    DeleteJurusanIntenComponent
  ],
  providers: [
    // NbDialogService
  ],
})
export class JurusanIntenModule {
}
