import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AbsensiKuisComponent } from './absensi-kuis.component';
import { ListAbsensiKuisComponent } from './list-absensi-kuis/list-absensi-kuis.component';
import { AddEditAbsensiKuisComponent } from './add-edit-absensi-kuis/add-edit-absensi-kuis.component';

const routes: Routes = [{
  path: '',
  component: AbsensiKuisComponent,
  children: [
    {
      path: '',
      component: ListAbsensiKuisComponent,
    },
    {
      path: 'add',
      component: AddEditAbsensiKuisComponent,
    },
    {
      path: 'edit',
      component: AddEditAbsensiKuisComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbsensiKuisRoutingModule {
}
