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
  selector: 'absensi-siswa-ipa',
  styleUrls: ['./absensi-siswa-ipa.component.scss'],
  templateUrl: './absensi-siswa-ipa.component.html',
})

export class AbsensiSiswaIPAComponent implements OnDestroy, OnInit {
  baseService = "core/to-ipa";
  cabangService = "core/cabang-all";
  kelasService = "core/kelas-all";
  eventService = "core/event-all";
  soalService = "core/soal-to-kelas";
  siswaService = "core/siswa-nis";
  guruService = "core/guru-all";
  jurusanIntenService = "core/jurusan-inten-all";
  sekolahService = "core/sekolah-all";
  jurusanUniversitasService = "core/jurusan-universitas-all";
  universitasService = "core/universitas-all";
  absensiService = "core/absensi-kuis-report";
  absensiChartService = "core/absensi-kuis-chart";
  nilaiQuizService = "core/absensi-kuis-matpel";
  quizPerMatpelService = "core/absensi-kuis-per-matpel";
  matpelAllService ="core/mata-pelajaran-all";
  matpelListService ="core/mata-pelajaran-list";
  AddEditForm: FormGroup;
  dataForm: any = {};
  dataAPI: any;
  detailSiswa: any = {};
  nis: string;
  kelas: string;
  
  date: any;
  dateAll: any;
  data: any;
  options: any;
  themeSubscription: any;
  chart: Chart;
  rows = [];
  type = "";
  temp = [];
  monthQuizLine : any;
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

  ngOnInit() {    
    // set route param to bannerID
    // if (this.route.snapshot.params.nis != null) {
      this.nis = JSON.parse(localStorage.getItem("currentUser")).no_induk;
      var d = new Date();
      let bulan = d.getMonth()+1;     

      this.monthQuizLine = bulan.toString();
      this.tanggalQuizTable.start = new Date(d);
      this.tanggalAllMatpelTable.start = new Date(d);
      this.getDetailSiswa(this.nis);
      this.getDetail(this.nis);
      this.getAbsensiSiswa(this.nis);
      this.getChartAbsensiSiswa(this.nis);
      this.getQuizAllMatpel();
      this.getEventList();
    // }
  }
  
  get f() { return this.AddEditForm.controls; }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  getDetail(id){    
    this.masterService.getByID(this.siswaService, id).subscribe((result) => {
      this.detailSiswa = result['payload'];
      this.kelas = this.detailSiswa.kelas_inten;
      this.getMatpelList();
    });
  }

  async getDetailSiswa(nis){    
    this.masterService.getByID(this.baseService, nis).subscribe(
      res => {
        this.dataForm = res['payload'][0];
        
        this.onChangeMenu('TOTAL');
        this.temp = [...this.dataAPI];
        this.rows = this.dataAPI;
        this.getSoalList(this.dataForm.Kelas);     
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
  getAbsensiSiswa(nis){
    this.masterService.getByID(this.absensiService, nis).subscribe((res) => {      
      this.dataAbsensi = res['payload'];
      res['payload'].forEach(data => {
        switch (data.bulan) {
          case 6: 
            this.Juni = data;
          break;
          case 7: 
            this.Juli = data;
          break;
          case 8: 
            this.Agustus = data;
          break;
          case 9: 
            this.September = data;
          break;
          case 10: 
            this.Oktober = data;
          break;
          case 11: 
            this.November = data;
          break;
          case 12: 
            this.Desember = data;
          break;
          case 1: 
            this.Januari = data;
          break;
          case 2: 
            this.Februari = data;
          break;
          case 3: 
            this.Maret = data;
          break;
          case 4: 
            this.April = data;
          break;
          case 5: 
            this.Mei = data;
          break;
          default: break;
        }
      });
    });    
  }

  
  getChartAbsensiSiswa(nis){
    this.masterService.getByID(this.absensiChartService, nis).subscribe((res) => {
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
                { value: res['payload'].hadir, name: 'Hadir' },
                { value: res['payload'].absen, name: 'Absen' },
                { value: res['payload'].izin, name: 'Izin' },
                { value: res['payload'].sakit, name: 'Sakit' }
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

  private random() {
    return Math.round(Math.random() * 100);
  }

  nilaiQuiz;
  optionNilaiQuiz;
  selectedMonth;
  getQuizMatpel(event){
    this.selectedMonth = event;
  }

  async getNilaiQuiz() {
    const param = {
      nis : this.nis,
      mata_pelajaran : this.matpelQuizLine,
      bulan : this.monthQuizLine? this.monthQuizLine : '4'
    };
    
    this.masterService.getList(this.nilaiQuizService, param).subscribe((res) => {  
      let nilaiQuizRows =  res['payload'] ? res['payload'].nilaiQuizRows : "";    
      let tanggal =  res['payload']  ? res['payload'].tanggal : "";    
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        const echarts: any = config.variables.echarts;

        this.optionNilaiQuiz = {
          backgroundColor: echarts.bg,
          color: [colors.danger, colors.primary, colors.info],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}',
          },
          legend: {
            left: 'left',
            data: ['Nilai'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          xAxis: [
            {
              type: 'category',
              data: tanggal,
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          yAxis : [
            {
              type : 'value',
              name: 'Nilai',
              nameLocation: 'middle',
              nameGap: 50,
              min: 0,
              max: 100,
            }
          ],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          series: [
            {
              name: 'Nilai',
              type: 'line',
              label: {
                  show: true,
                  position: 'top',
                  color: '#000'
              },
              data: nilaiQuizRows,
            },
          ],
        };
      });   
    });
  }

  listQuizPerMatpel : any = [];
  listQuizAllMatpel = [];
  async getQuizPerMatpel() {   
    const start_date = this.tanggalQuizTable ? moment(this.tanggalQuizTable.start).format("YYYY-MM-DD") : moment("2021-04-01").format("YYYY-MM-DD");
    const end_date = this.tanggalQuizTable && this.tanggalQuizTable.end ? moment(this.tanggalQuizTable.end).format("YYYY-MM-DD") : moment(this.tanggalQuizTable.start).format("YYYY-MM-DD");

    const param = {
      nis : this.nis,
      mata_pelajaran : this.matpelQuizTable,
      tanggal_start : start_date,
      tanggal_end : end_date,
    };
    
    this.masterService.getList(this.quizPerMatpelService, param).subscribe((res) => {
      this.listQuizPerMatpel = res['payload'] ? res['payload'] :  [];    
    });
  }

  headerMatpel = ["MK","M","I","E","F","K","B"];
  subHeaderMatpel = [];
  allMatpel = [
    {
      "nilai" : ["10/10/2020","8","2","80","8","2","80","8","2","80","8","2","80","8","2","80","8","2","80","6","4","60"]
    },
    {      
      "nilai" : ["11/10/2020","7","3","70","8","2","80","5","5","50","9","1","90","8","2","80","8","2","80","8.5","1.5","85"]
    },
  ];   
  
  async getQuizAllMatpel() {
    const start_date = this.tanggalAllMatpelTable.start ? moment(this.tanggalAllMatpelTable.start).format("YYYY-MM-DD") : moment("2021-04-01").format("YYYY-MM-DD");
    const end_date = this.tanggalAllMatpelTable.end ? moment(this.tanggalAllMatpelTable.end).format("YYYY-MM-DD") : moment(this.tanggalAllMatpelTable.start).format("YYYY-MM-DD");

    const param = {
      nis : this.nis,
      kelas : this.kelas,
      tanggal_start : start_date,
      tanggal_end : end_date,
    };    
    
    this.masterService.getList(this.matpelAllService, param).subscribe((res) => {
      this.listQuizAllMatpel = res['payload'] ? res['payload'] : [];
    });
  }

  listMatpel = [];
  async getMatpelList() {
    const param = {
      kelas : this.kelas,
    };    
    
    this.masterService.getList(this.matpelListService, param).subscribe((res) => {
      this.listMatpel = res['payload'];
      
      this.matpelQuizLine = this.listMatpel[0].nama_mata_pelajaran;
      this.matpelQuizTable = this.listMatpel[0].nama_mata_pelajaran;
      this.getNilaiQuiz();
      this.getQuizPerMatpel();
    });
  }
  
  listEvent = [];
  async getEventList() {    
    this.masterService.get(this.eventService, '').subscribe((res) => {
      this.listEvent = res['payload'];
    });
  }

  onChangeMenu(type){
    this.type = type;

    const postLabel = []; 
    const postData = [];    
    let nilai_rata ;
    this.dataAPI.map(data => {  
      
      switch (type) {
        case "TOTAL":
          nilai_rata = parseFloat(data['Total nr'])
        break;
        case "PU":
          nilai_rata = parseFloat(data['PU nr'])
        break;
        case "PBM":
          nilai_rata = parseFloat(data['PBM nr'])
        break;
        case "PPU":
          nilai_rata = parseFloat(data['PPU nr'])
        break;
        case "PK":
          nilai_rata = parseFloat(data['PK nr'])
        break;
        case "MM":
          nilai_rata = parseFloat(data['Mtk nr'])
        break;
        case "FIS":
          nilai_rata = parseFloat(data['Fis nr'])
        break;
        case "KIM":
          nilai_rata = parseFloat(data['Kim nr'])
        break;
        case "BIO":
          nilai_rata = parseFloat(data['Bio nr'])
        break;
        default: break;
      }

      postLabel.push('TRYOUT ' + data.tryout_ke);
      postData.push(nilai_rata.toFixed(1));  
    });
    

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
            data: ['Nilai', 'Grafik']
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
                name: 'Nilai',
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
            {
                name: 'Grafik',
                type: 'line',
                yAxisIndex: 1,
                data: postData,
                itemStyle: {
                    color: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8)
                },
            }
        ]
      };
    });

    // this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

    //   const colors: any = config.variables;
    //   const chartjs: any = config.variables.chartjs;
    //   
    //   this.data = {
    //     labels: postLabel,
    //     datasets: [{
    //         label: "Europe",
    //         type: "line",
    //         borderColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),  
    //         borderWidth: 2, 
    //         data: postData,
    //         fill: false
    //       }, {
    //         label: "Europe",
    //         type: "bar",          
    //         backgroundColor:NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
    //         data: postData,
    //       }, 
    //     ]
    //   },

    //   this.options = {
    //     layout: {
    //       padding: {
    //         left: 0,
    //         right: 0,
    //         top: 15,
    //         bottom: 0
    //       }
    //     },
    //     events: [],
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     legend: {
    //       display: false
    //     },
    //     scales: {
    //       xAxes: [
    //         {
    //           gridLines: {
    //             display: false,
    //             color: chartjs.axisLineColor,
    //           },
    //           ticks: {
    //             fontColor: chartjs.textColor,
    //           },
    //           barPercentage: 0.4
    //         },
    //       ],
    //       yAxes: [
    //         {
    //           gridLines: {
    //             display: true,
    //             color: chartjs.axisLineColor,
    //           },
    //           ticks: {
    //             fontColor: chartjs.textColor,
    //             min : 0,
    //           },
    //         },
    //       ],
    //     },
    //     animation: {
    //       duration: 1,
    //       onComplete: function() {
    //         var chartInstance = this.chart,
    //           ctx = chartInstance.ctx;
    
    //         ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
    //         ctx.textAlign = 'center';
    //         ctx.textBaseline = 'bottom';
    //         ctx.fillStyle = '#666'
    
    //         this.data.datasets.forEach(function(dataset, i) {
    //           var meta = chartInstance.controller.getDatasetMeta(i);
    //           meta.data.forEach(function(bar, index) {
    //             if (dataset.data[index] > 0) {
    //               var data = dataset.data[index];
    //               ctx.fillText(data, bar._model.x, bar._model.y);
    //             }
    //           });
    //         });
    //       }
    //     }
    //   }
    // });
  }
  
  onDatePicker(event){
    if (event.end){
      // this.getData();
    }
  }

  onDateAllPicker(event){
    if (event.end){
      // this.getData();
    }
  }

  typeTabs = 'events';
  typeEventSoal(item){
    this.typeTabs = item;
  }

  listSoal = [];
  async getSoalList(kelas) {   
    let param = {
      kelas : kelas
    } 
    this.masterService.getList(this.soalService, param).subscribe((res) => {
      this.listSoal = res['payload'];
    });
  }

  showToast(position, status, messages) {
    this.toastrService.show(
      '',
      messages,
      { position, status });
  }
}