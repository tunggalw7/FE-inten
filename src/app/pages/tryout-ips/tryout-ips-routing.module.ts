import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TryOutIpsComponent } from './tryout-ips.component';
import { ListTryOutIpsComponent } from './list-tryout-ips/list-tryout-ips.component';

const routes: Routes = [{
  path: '',
  component: TryOutIpsComponent,
  children: [
    {
      path: '',
      component: ListTryOutIpsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TryOutIpsRoutingModule {
}
