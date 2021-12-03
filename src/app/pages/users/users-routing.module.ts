import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { ListUsersComponent } from './list-users/list-users.component';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [
    {
      path: '',
      component: ListUsersComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
