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
  NbButtonGroupModule,
  NbAutocompleteModule
} from '@nebular/theme';
import { NgxCurrencyModule } from "ngx-currency";
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SiswaRoutingModule } from './siswa-routing.module';
import { SiswaComponent } from './siswa.component';
import { ListSiswaComponent } from './list-siswa/list-siswa.component';
import { AddEditSiswaComponent } from './add-edit-siswa/add-edit-siswa.component';
import { DeleteSiswaComponent } from './delete-siswa/delete-siswa.component';
import { GrafikTOIpaSiswaComponent } from './grafik-siswa-ipa/grafik-siswa-ipa.component';
import { GrafikTOIpsSiswaComponent } from './grafik-siswa-ips/grafik-siswa-ips.component';
import { DropdownListModule } from 'ngx-dropdown-list';

@NgModule({
  imports: [
    NbPopoverModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbListModule,
    SiswaRoutingModule,
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
    NbButtonGroupModule,
    NgxCurrencyModule,
    NbAutocompleteModule,
    DropdownListModule
  ],
  declarations: [
    SiswaComponent,
    ListSiswaComponent,
    AddEditSiswaComponent,
    DeleteSiswaComponent,
    GrafikTOIpaSiswaComponent,
    GrafikTOIpsSiswaComponent
  ],
  providers: [
    // NbDialogService
  ],
})
export class SiswaModule {
}
