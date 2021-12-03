import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JurusanUniversitasComponent } from './jurusan-universitas.component';
import { ListJurusanUniversitasComponent } from './list-jurusan-universitas/list-jurusan-universitas.component';

const routes: Routes = [{
  path: '',
  component: JurusanUniversitasComponent,
  children: [
    {
      path: '',
      component: ListJurusanUniversitasComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JurusanUniversitasRoutingModule {
}
