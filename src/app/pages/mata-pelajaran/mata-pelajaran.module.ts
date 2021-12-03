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
import { MataPelajaranRoutingModule } from './mata-pelajaran-routing.module';
import { MataPelajaranComponent } from './mata-pelajaran.component';
import { ListMataPelajaranComponent } from './list-mata-pelajaran/list-mata-pelajaran.component';
import { AddEditMataPelajaranComponent } from './add-edit-mata-pelajaran/add-edit-mata-pelajaran.component';
import { DeleteMataPelajaranComponent } from './delete-mata-pelajaran/delete-mata-pelajaran.component';

@NgModule({
  imports: [
    NbPopoverModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbListModule,
    MataPelajaranRoutingModule,
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
    MataPelajaranComponent,
    ListMataPelajaranComponent,
    AddEditMataPelajaranComponent,
    DeleteMataPelajaranComponent
  ],
  providers: [
    // NbDialogService
  ],
})
export class MataPelajaranModule {
}
