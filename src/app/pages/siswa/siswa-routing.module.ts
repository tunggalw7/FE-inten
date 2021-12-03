import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SiswaComponent } from './siswa.component';
import { ListSiswaComponent } from './list-siswa/list-siswa.component';
import { GrafikTOIpaSiswaComponent } from './grafik-siswa-ipa/grafik-siswa-ipa.component';
import { GrafikTOIpsSiswaComponent } from './grafik-siswa-ips/grafik-siswa-ips.component';

const routes: Routes = [{
  path: '',
  component: SiswaComponent,
  children: [
    {
      path: '',
      component: ListSiswaComponent,
    },
    {
      path: 'grafik-siswa-ipa/:nis',
      component: GrafikTOIpaSiswaComponent,
    },
    {
      path: 'grafik-siswa-ips/:nis',
      component: GrafikTOIpsSiswaComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiswaRoutingModule {
}
