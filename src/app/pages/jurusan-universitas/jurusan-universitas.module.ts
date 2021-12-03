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
import { JurusanUniversitasRoutingModule } from './jurusan-universitas-routing.module';
import { JurusanUniversitasComponent } from './jurusan-universitas.component';
import { ListJurusanUniversitasComponent } from './list-jurusan-universitas/list-jurusan-universitas.component';
import { AddEditJurusanUniversitasComponent } from './add-edit-jurusan-universitas/add-edit-jurusan-universitas.component';
import { DeleteJurusanUniversitasComponent } from './delete-jurusan-universitas/delete-jurusan-universitas.component';

@NgModule({
  imports: [
    NbPopoverModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbListModule,
    JurusanUniversitasRoutingModule,
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
    JurusanUniversitasComponent,
    ListJurusanUniversitasComponent,
    AddEditJurusanUniversitasComponent,
    DeleteJurusanUniversitasComponent
  ],
  providers: [
    // NbDialogService
  ],
})
export class JurusanUniversitasModule {
}
