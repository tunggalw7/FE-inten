import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardSiswaIPAComponent } from './dashboard-siswa-ipa/dashboard-siswa-ipa.component';
import { DashboardSiswaIPSComponent } from './dashboard-siswa-ips/dashboard-siswa-ips.component';
import { DashboardFOComponent } from './dashboard-fo/dashboard-fo.component';
import { DashboardHomeComponent } from './dashboard/dashboard.component';
import { AbsensiSiswaIPAComponent } from './absensi-siswa-ipa/absensi-siswa-ipa.component';
import { AbsensiSiswaIPSComponent } from './absensi-siswa-ips/absensi-siswa-ips.component';
import { QuizSiswaIPAComponent } from './quiz-siswa-ipa/quiz-siswa-ipa.component';
import { QuizSiswaIPSComponent } from './quiz-siswa-ips/quiz-siswa-ips.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: 'home',
      component: DashboardHomeComponent,
    },
    {
      path: 'siswa-ipa',
      component: DashboardSiswaIPAComponent,
    },
    {
      path: 'siswa-ips',
      component: DashboardSiswaIPSComponent,
    },
    {
      path: 'fo',
      component: DashboardFOComponent,
    },
    {
      path: 'absensi-siswa-ipa',
      component: AbsensiSiswaIPAComponent,
    },
    {
      path: 'absensi-siswa-ips',
      component: AbsensiSiswaIPSComponent,
    },
    {
      path: 'quiz-siswa-ipa',
      component: QuizSiswaIPAComponent,
    },
    {
      path: 'quiz-siswa-ips',
      component: QuizSiswaIPSComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
