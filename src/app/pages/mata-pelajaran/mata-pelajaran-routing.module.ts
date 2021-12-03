import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MataPelajaranComponent } from './mata-pelajaran.component';
import { ListMataPelajaranComponent } from './list-mata-pelajaran/list-mata-pelajaran.component';

const routes: Routes = [{
  path: '',
  component: MataPelajaranComponent,
  children: [
    {
      path: '',
      component: ListMataPelajaranComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MataPelajaranRoutingModule {
}
