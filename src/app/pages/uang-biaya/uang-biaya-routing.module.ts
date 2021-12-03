import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UangBiayaComponent } from './uang-biaya.component';
import { ListUangBiayaComponent } from './list-uang-biaya/list-uang-biaya.component';
import { AddEditUangBiayaComponent } from './add-edit-uang-biaya/add-edit-uang-biaya.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PrintPageComponent } from './print-page/print-page.component';
import { UangBiayaReportComponent } from './uang-biaya-report/uang-biaya-report.component';

const routes: Routes = [{
  path: '',
  component: UangBiayaComponent,
  children: [
    {
      path: '',
      component: ListUangBiayaComponent,
    },
    {
      path: 'add',
      component: AddEditUangBiayaComponent,
    },
    {
      path: 'edit',
      component: AddEditUangBiayaComponent,
    },
    {
      path: 'test',
      component: PrintPageComponent,
    },
    {
      path: 'siswa',
      component: UangBiayaReportComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UangBiayaRoutingModule {
}
