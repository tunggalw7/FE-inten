import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CabangComponent } from './cabang.component';
import { ListCabangComponent } from './list-cabang/list-cabang.component';

const routes: Routes = [{
  path: '',
  component: CabangComponent,
  children: [
    {
      path: '',
      component: ListCabangComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabangRoutingModule {
}
