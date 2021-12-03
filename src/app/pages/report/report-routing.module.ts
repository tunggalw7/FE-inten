import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReportIPAComponent } from './report-ipa/report-ipa.component';
import { ReportComponent } from './report.component';
import { ReportIPSComponent } from './report-ips/report-ips.component';
import { ListReportUBPerBulanComponent } from './report-ub-bulan/report-ub-bulan.component';

const routes: Routes = [{
  path: '',
  component: ReportComponent,
  children: [
    {
      path: 'ipa',
      component: ReportIPAComponent,
    },
    {
      path: 'ips',
      component: ReportIPSComponent,
    },
    {
      path: 'ub-bulanan',
      component: ListReportUBPerBulanComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {
}
