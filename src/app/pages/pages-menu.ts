import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    data: 'dashboard',
    icon: 'grid-outline',
    link: '/pages/dashboard/home'
  },
  {
    title: 'Uang Biaya',
    data: 'siswa',
    icon: 'credit-card-outline',
    link: '/pages/uang-biaya/siswa'
  },
  {
    title: 'Data Kehadiran',
    data: 'siswa-ipa',
    icon: 'calendar-outline',
    link: '/pages/dashboard/absensi-siswa-ipa'
  },
  {
    title: 'Data Quiz',
    data: 'siswa-ipa',
    icon: 'bulb-outline',
    link: '/pages/dashboard/quiz-siswa-ipa'
  },
  {
    title: 'Data Kehadiran',
    data: 'siswa-ips',
    icon: 'calendar-outline',
    link: '/pages/dashboard/absensi-siswa-ips'
  },
  {
    title: 'Data Quiz',
    data: 'siswa-ips',
    icon: 'bulb-outline',
    link: '/pages/dashboard/quiz-siswa-ips'
  },
  {
    title: 'Master',
    data: 'Master',
    icon: 'layers-outline',
    expanded: true,
    children: [
      {
        title: 'Cabang',
        link: '/pages/cabang',
      },
      {
        title: 'Event',
        link: '/pages/event',
      },
      {
        title: 'Guru',
        data: 'Guru',
        link: '/pages/guru',
        hidden: true
      },
      {
        title: 'Jurusan - Inten',
        data: 'JurusanInten',
        link: '/pages/jurusan-inten',
      },
      {
        title: 'Jurusan - Universitas',
        data: 'JurusanUniversitas',
        link: '/pages/jurusan-universitas',
      },
      {
        title: 'Kelas',
        data: 'Kelas',
        link: '/pages/kelas',
      },
      {
        title: 'Mata Pelajaran',
        link: '/pages/mata-pelajaran',
      },
      {
        title: 'Sekolah',
        link: '/pages/sekolah',
      },
      {
        title: 'Soal',
        link: '/pages/soal',
      },
      {
        title: 'Universitas',
        data: 'Universitas',
        link: '/pages/universitas',
      },
    ],
  },
  {
    title: 'Data Siswa',
    data: 'Data Siswa',
    icon: 'people-outline',
    link: '/pages/siswa',
  },    
  {
    title: 'Absensi Kuis',
    data: 'Absensi Kuis',
    icon: 'file-text-outline',
    link: '/pages/absensi-kuis',
  },
  {
    title: 'Try Out',
    data: 'Try Out',
    icon: 'bar-chart-outline',
    expanded: true,
    children: [
      {
        title: 'Import Try Out IPA',
        link: '/pages/tryout-ipa',
      },
      {
        title: 'Import Try Out IPS',
        link: '/pages/tryout-ips',
      }, 
    ]
  },    
  {
    title: 'Uang Biaya',
    data: 'Uang Biaya',
    icon: 'credit-card-outline',
    link: '/pages/uang-biaya',
  },
  {
    title: 'System Users',
    data: 'System Users',
    icon: 'settings-outline',
    link: '/pages/users',
  },
  {
    title: 'Reports',
    data: 'Reports',
    icon: 'file-text-outline',
    expanded: true,
    children: [
      {
        title: 'Report IPA',
        link: '/pages/report/ipa',
      },
      {
        title: 'Report IPS',
        link: '/pages/report/ips',
      },
      {
        title: 'Report Uang Biaya Per Bulan',
        link: '/pages/report/ub-bulanan',
      }
    ]
  },   
  {
    title: 'Reports',
    data: 'Reports Jatim',
    icon: 'file-text-outline',
    expanded: true,
    children: [
      {
        title: 'Report Uang Biaya Per Bulan',
        link: '/pages/report/ub-bulanan',
      }
    ]
  },   
];      