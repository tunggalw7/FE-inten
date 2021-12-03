import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GuruComponent } from './guru.component';
import { ListGuruComponent } from './list-guru/list-guru.component';

const routes: Routes = [{
  path: '',
  component: GuruComponent,
  children: [
    {
      path: '',
      component: ListGuruComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuruRoutingModule {
}
