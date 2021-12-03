import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EventComponent } from './event.component';
import { ListEventComponent } from './list-event/list-event.component';

const routes: Routes = [{
  path: '',
  component: EventComponent,
  children: [
    {
      path: '',
      component: ListEventComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {
}
