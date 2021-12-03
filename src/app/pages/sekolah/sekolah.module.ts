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
import { SekolahRoutingModule } from './sekolah-routing.module';
import { SekolahComponent } from './sekolah.component';
import { ListSekolahComponent } from './list-sekolah/list-sekolah.component';
import { AddEditSekolahComponent } from './add-edit-sekolah/add-edit-sekolah.component';
import { DeleteSekolahComponent } from './delete-sekolah/delete-sekolah.component';

@NgModule({
  imports: [
    NbPopoverModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbListModule,
    SekolahRoutingModule,
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
    SekolahComponent,
    ListSekolahComponent,
    AddEditSekolahComponent,
    DeleteSekolahComponent
  ],
  providers: [
    // NbDialogService
  ],
})
export class SekolahModule {
}
