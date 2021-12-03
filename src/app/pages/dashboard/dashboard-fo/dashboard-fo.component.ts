import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { NbToastrService } from '@nebular/theme';
import { MasterService } from "../../../_services/master.service";
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as moment from 'moment';

@Component({
  selector: 'dashboard-fo',
  styleUrls: ['./dashboard-fo.component.scss'],
  templateUrl: './dashboard-fo.component.html',
})

export class DashboardFOComponent implements OnDestroy, OnInit {
  absensiService = "core/absensi-kuis-fo";
  ubService = "core/uang-biaya-fo";
  ubTotalService = "core/uang-biaya-total-fo";
  siswaService = "core/siswa-all";
  guruService = "core/total-guru";
  kelasService = "core/total-kelas-all";
  totalUbService = "core/total-bayar-fo";

  AddEditForm: FormGroup;
  dataForm: any = {};
  dataAPI: any;
  nis: string;
  cabang: string;
  
  date: any;
  dateAll: any;
  data: any;
  options: any;
  options2: any;
  themeSubscription: any;
  chart: Chart;
  rows = [];
  type = "";
  temp = [];
  monthUB : any;
  matpelQuizLine : any;
  tanggalQuizTable : any  = {
    start : '',
    end : ''
  };
  matpelQuizTable : any;
  tanggalAllMatpelTable : any = {
    start : '',
    end : ''
  };

  totalGuru = 0;
  totalKelas = 0;
  totalUB = 0;

  flipped = false;

  columns = [
    { prop: 'tryout_ke', name : 'Tryout Ke' }, 
    { prop: 'PU nr', name: 'PU' }, 
    { prop: 'PBM nr', name: 'PBM' }, 
    { prop: 'PPU nr', name: 'PPU' }, 
    { prop: 'PK nr', name: 'PK' }, 
    { prop: 'Mtk nr', name: 'Matematika' }, 
    { prop: 'Fis nr', name: 'Fisika' }, 
    { prop: 'Kim nr', name: 'Kimia' }, 
    { prop: 'Bio nr', name: 'Biologi' },
    { prop: 'Total nr', name: 'Rata-rata' }, 
  ];

  month = [
    { name : 'Januari', value: '1'},
    { name : 'Februari', value: '2'},
    { name : 'Maret', value: '3'},
    { name : 'April', value: '4'},
    { name : 'Mei', value: '5'},
    { name : 'Juni', value: '6'},
    { name : 'Juli', value: '7'},
    { name : 'Agustus', value: '8'},
    { name : 'September', value: '9'},
    { name : 'Oktober', value: '10'},
    { name : 'November', value: '11'},
    { name : 'Desember', value: '12'},
  ]

  btnSearchClose: String = "btn-search";
  @ViewChild(DatatableComponent) table: DatatableComponent;


  constructor(
    private route: ActivatedRoute,
    private masterService: MasterService,
    private toastrService: NbToastrService,
    private theme: NbThemeService
  ) {

    // this.getProfileInfo();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  role : any;  
  profileService = "core/users/profile";
  async getProfileInfo() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.masterService.getList(this.profileService, '').subscribe(async (result) => {
      this.currentUser.role = result['user'].role;
      debugger
      if (this.currentUser.role === 'Manajemen' || this.currentUser.role === 'Manajer Akademik') this.currentUser.cabang = "ALL"
    });
  }
  
  updateFilter(event) {
    const val = event.target.value;

    // filter our data
    const temp = this.temp.filter(function (d) {
      return (d.tryout_ke.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  currentUser : any = {};
  ngOnInit() {    
    // set route param to bannerID
    // if (this.route.snapshot.params.nis != null) {
      this.nis = "121-55-0005133";
      this.cabang = this.currentUser.cabang === 'ALL' || this.currentUser.role === 'Manajemen' || this.currentUser.role === 'Manajer Akademik' ? '' : this.currentUser.cabang ;
      var d = new Date();
      let bulan = d.getMonth()+1;     

      this.monthUB = bulan.toString();
      this.tanggalQuizTable.start = new Date(d);
      this.tanggalAllMatpelTable.start = new Date(d);
      this.getSiswaList();
      this.getUBSiswa();
      this.getUBSiswaTotal();
      this.getChartAbsensiSiswa();
      this.getGuruList();
      this.getKelasList();
      this.getUbList();
    // }
  }
  
  get f() { return this.AddEditForm.controls; }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  
  toggleView() {
    this.flipped = !this.flipped;
  }

  changeMonth(){
    
    this.getChartAbsensiSiswa();
    this.getUBSiswa();
    this.getUBSiswaTotal();
  }

  async getUBSiswa(){    
    const param = {
      bulan : this.monthUB,
      cabang : this.currentUser.cabang === 'ALL' || this.currentUser.role === 'Manajemen' || this.currentUser.role === 'Manajer Akademik' ? '' : this.currentUser.cabang
    };

    this.masterService.getList(this.ubService, param).subscribe(
      res => {
        let postLabel = []; let postData = [];
        if (res['payload']){
          res['payload'].map(data => {
            postLabel.push(moment(data.tanggal_terima).format("LL"));
            postData.push(data.count);
          });
        }

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors: any = config.variables;
          const echarts: any = config.variables.echarts;

          this.options =  {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['Jumlah Siswa']
            },
            xAxis: [
                {
                    type: 'category',
                    data: postLabel,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    // min: 0,
                    // max: 100,
                    // interval: 50,
                },
                {
                    type: 'value',
                    // min: 0,
                    // max: 100,
                    // interval: 50,
                }
            ],
            series: [
                {
                    name: 'Jumlah Siswa',
                    type: 'bar',
                    data: postData,
                    label: {
                        show: true,
                        position: 'top',
                        color: '#000'
                    },
                    itemStyle: {
                        color: colors.primaryLight
                    },
                },
            ]
          };
        });
        
        // this.selectedCabang = this.dataForm.cabang;
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }

  async getUBSiswaTotal(){    
    const param = {
      bulan : this.monthUB,
      cabang : this.currentUser.cabang === 'ALL' || this.currentUser.role === 'Manajemen' || this.currentUser.role === 'Manajer Akademik' ? '' : this.currentUser.cabang
    };

    this.masterService.getList(this.ubTotalService, param).subscribe(
      res => {
        
        let postLabel = []; let postData = [];
        if (res['payload']){
          res['payload'].map(data => {
            postLabel.push(moment(data.tanggal_terima).format("LL"));
            postData.push(data.sum);
          });
        }

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors: any = config.variables;
          const echarts: any = config.variables.echarts;

          this.options2 =  {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['Jumlah Uang Biaya']
            },
            xAxis: [
                {
                    type: 'category',
                    data: postLabel,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    // min: 0,
                    // max: 100,
                    // interval: 50,
                },
                {
                    type: 'value',
                    // min: 0,
                    // max: 100,
                    // interval: 50,
                }
            ],
            series: [
                {
                    name: 'Jumlah Uang Biaya',
                    type: 'bar',
                    data: postData,
                    label: {
                        show: true,
                        position: 'top',
                        color: '#000'
                    },
                    itemStyle: {
                        color: colors.primaryLight
                    },
                },
            ]
          };
        });
        
        // this.selectedCabang = this.dataForm.cabang;
      },
      err => {
        this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
      },
    );  
  }

  dataAbsensi = [];
  Juni : any; Juli : any; Agustus : any; September : any; Oktober : any; November : any; Desember : any; 
  Januari : any; Februari : any; Maret : any; April : any; Mei : any; 
  chartAbsen;
  optionChart;

  
  getChartAbsensiSiswa(){
    const param = {
      cabang : this.currentUser.cabang === 'ALL' || this.currentUser.role === 'Manajemen' || this.currentUser.role === 'Manajer Akademik' ? '' : this.currentUser.cabang,
      bulan : this.monthUB
    };
    this.masterService.getList(this.absensiService, param).subscribe((res) => {   
      this.chartAbsen = res['payload'];
      
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors = config.variables;
        const echarts: any = config.variables.echarts;

        this.chartAbsen = {
          backgroundColor: echarts.bg,
          color: [colors.primaryLight, colors.warningLight, colors.successLight, colors.dangerLight],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Hadir','Absen','Izin','Sakit'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: 'Absensi',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: [
                { value: res['payload'][0].hadir, name: 'Hadir' },
                { value: res['payload'][0].absen, name: 'Absen' },
                { value: res['payload'][0].izin, name: 'Izin' },
                { value: res['payload'][0].sakit, name: 'Sakit' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: echarts.itemHoverShadowColor,
                },
              },
              label: {
                normal: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
              },
            },
          ],
        };
      });     
    });    
  }
  
  listSiswa = [];
  async getSiswaList() {
    const param = {
      cabang : this.currentUser.cabang === 'ALL' || this.currentUser.role === 'Manajemen' || this.currentUser.role === 'Manajer Akademik' ? '' : this.currentUser.cabang,
    };    
    
    this.masterService.getList(this.siswaService, param).subscribe((res) => {
      this.listSiswa = res['payload'];
    });
  }

  async getGuruList() {
    debugger
    const param = {
      cabang : this.currentUser.cabang === 'ALL' || this.currentUser.role === 'Manajemen' || this.currentUser.role === 'Manajer Akademik' ? '' : this.currentUser.cabang,
    };    
    
    this.masterService.getList(this.guruService, param).subscribe((res) => {
      this.totalGuru = res['payload'];
    });
  }
  
  async getKelasList() {
    const param = {
      cabang : this.currentUser.cabang === 'ALL' || this.currentUser.role === 'Manajemen' || this.currentUser.role === 'Manajer Akademik' ? '' : this.currentUser.cabang,
    };    
    
    this.masterService.getList(this.kelasService, param).subscribe((res) => {
      this.totalKelas = res['payload'];
    });
  }
  
  async getUbList() {
    const param = {
      cabang : this.currentUser.cabang === 'ALL' || this.currentUser.role === 'Manajemen' || this.currentUser.role === 'Manajer Akademik' ? '' : this.currentUser.cabang,
    };    
    
    this.masterService.getList(this.totalUbService, param).subscribe((res) => {
      this.totalUB = res['payload'][0].total;
    });
  }
  
  showToast(position, status, messages) {
    this.toastrService.show(
      '',
      messages,
      { position, status });
  }
}