import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AbsensiSiswaIPSComponent } from './dashboard/absensi-siswa-ips/absensi-siswa-ips.component';
import { AbsensiSiswaIPAComponent } from './dashboard/absensi-siswa-ipa/absensi-siswa-ipa.component';
import { QuizSiswaIPAComponent } from './dashboard/quiz-siswa-ipa/quiz-siswa-ipa.component';
import { QuizSiswaIPSComponent } from './dashboard/quiz-siswa-ips/quiz-siswa-ips.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
  ],
  declarations: [
    PagesComponent
  ],
})
export class PagesModule {
}
