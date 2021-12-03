import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JurusanIntenComponent } from './jurusan-inten.component';
import { ListJurusanIntenComponent } from './list-jurusan-inten/list-jurusan-inten.component';

const routes: Routes = [{
  path: '',
  component: JurusanIntenComponent,
  children: [
    {
      path: '',
      component: ListJurusanIntenComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JurusanIntenRoutingModule {
}
