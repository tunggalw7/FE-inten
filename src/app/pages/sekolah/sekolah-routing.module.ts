import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SekolahComponent } from './sekolah.component';
import { ListSekolahComponent } from './list-sekolah/list-sekolah.component';

const routes: Routes = [{
  path: '',
  component: SekolahComponent,
  children: [
    {
      path: '',
      component: ListSekolahComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SekolahRoutingModule {
}
