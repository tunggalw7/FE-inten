import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UniversitasComponent } from './universitas.component';
import { ListUniversitasComponent } from './list-universitas/list-universitas.component';

const routes: Routes = [{
  path: '',
  component: UniversitasComponent,
  children: [
    {
      path: '',
      component: ListUniversitasComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversitasRoutingModule {
}
