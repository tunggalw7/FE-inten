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
  selector: 'dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardHomeComponent {
  dashboardAccess : string;
  @ViewChild(DatatableComponent) table: DatatableComponent;


  constructor(
    private route: ActivatedRoute,
    private masterService: MasterService,
    private toastrService: NbToastrService,
    private theme: NbThemeService
  ) {
    if (localStorage.getItem("jurusan").includes("IPA")){
      this.dashboardAccess = "IPA";
    } else if (localStorage.getItem("jurusan").includes("IPS")){
      this.dashboardAccess = "IPS";
    } else {
      this.dashboardAccess = "fo";
    }    
  }
  
}