import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SoalToComponent } from './soal_to.component';
import { ListSoalToComponent } from './list-soal_to/list-soal_to.component';

const routes: Routes = [{
  path: '',
  component: SoalToComponent,
  children: [
    {
      path: '',
      component: ListSoalToComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoalToRoutingModule {
}
