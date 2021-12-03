import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'absensi-kuis',
      loadChildren: () => import('./absensi-kuis/absensi-kuis.module')
        .then(m => m.AbsensiKuisModule),
    },
    {
      path: 'cabang',
      loadChildren: () => import('./cabang/cabang.module')
        .then(m => m.CabangModule),
    },
    {
      path: 'event',
      loadChildren: () => import('./event/event.module')
        .then(m => m.EventModule),
    },
    {
      path: 'guru',
      loadChildren: () => import('./guru/guru.module')
        .then(m => m.GuruModule),
    },
    {
      path: 'jurusan-inten',
      loadChildren: () => import('./jurusan-inten/jurusan-inten.module')
        .then(m => m.JurusanIntenModule),
    },
    {
      path: 'jurusan-universitas',
      loadChildren: () => import('./jurusan-universitas/jurusan-universitas.module')
        .then(m => m.JurusanUniversitasModule),
    },
    {
      path: 'kelas',
      loadChildren: () => import('./kelas/kelas.module')
        .then(m => m.KelasModule),
    },
    {
      path: 'mata-pelajaran',
      loadChildren: () => import('./mata-pelajaran/mata-pelajaran.module')
        .then(m => m.MataPelajaranModule),
    },
    {
      path: 'sekolah',
      loadChildren: () => import('./sekolah/sekolah.module')
        .then(m => m.SekolahModule),
    },
    {
      path: 'report',
      loadChildren: () => import('./report/report.module')
        .then(m => m.ReportModule),
    },
    {
      path: 'siswa',
      loadChildren: () => import('./siswa/siswa.module')
        .then(m => m.SiswaModule),
    },
    {
      path: 'soal',
      loadChildren: () => import('./soal_to/soal_to.module')
        .then(m => m.SoalToModule),
    },
    {
      path: 'tryout-ipa',
      loadChildren: () => import('./tryout-ipa/tryout-ipa.module')
        .then(m => m.TryOutIpaModule),
    },
    {
      path: 'tryout-ips',
      loadChildren: () => import('./tryout-ips/tryout-ips.module')
        .then(m => m.TryOutIpsModule),
    },
    {
      path: 'universitas',
      loadChildren: () => import('./universitas/universitas.module')
        .then(m => m.UniversitasModule),
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'uang-biaya',
      loadChildren: () => import('./uang-biaya/uang-biaya.module')
        .then(m => m.UangBiayaModule),
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module')
        .then(m => m.DashboardModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard/home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
