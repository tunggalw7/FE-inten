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
import { TryOutIpsRoutingModule } from './tryout-ips-routing.module';
import { TryOutIpsComponent } from './tryout-ips.component';
import { ListTryOutIpsComponent } from './list-tryout-ips/list-tryout-ips.component';

@NgModule({
  imports: [
    NbPopoverModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbListModule,
    TryOutIpsRoutingModule,
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
    TryOutIpsComponent,
    ListTryOutIpsComponent,
  ],
  providers: [
    // NbDialogService
  ],
})
export class TryOutIpsModule {
}
