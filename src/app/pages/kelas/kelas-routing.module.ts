import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { KelasComponent } from './kelas.component';
import { ListKelasComponent } from './list-kelas/list-kelas.component';

const routes: Routes = [{
  path: '',
  component: KelasComponent,
  children: [
    {
      path: '',
      component: ListKelasComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KelasRoutingModule {
}
