import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TryOutIpaComponent } from './tryout-ipa.component';
import { ListTryOutIpaComponent } from './list-tryout-ipa/list-tryout-ipa.component';

const routes: Routes = [{
  path: '',
  component: TryOutIpaComponent,
  children: [
    {
      path: '',
      component: ListTryOutIpaComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TryOutIpaRoutingModule {
}
