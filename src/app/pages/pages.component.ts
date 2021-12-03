import { Component, OnInit } from "@angular/core";
import { MasterService } from "../_services/master.service";
import { MENU_ITEMS } from "./pages-menu";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="filteredMenuRoles" *ngIf="!isLoadData" class="sidebar-menu"></nb-menu>
      <nb-menu [items]="loadingMenu" *ngIf="isLoadData" style="text-align: center; margin: 5em auto;"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  listRole: any = [];
  currentProfileAccess: any = [];
  menu = MENU_ITEMS;
  filteredMenuRoles: any = [];
  isLoadData: Boolean = true;
  loadingMenu = [{ title: "Loading Menu . . ." }];
  baseService = "core/users/profile";


  constructor(
    private masterService: MasterService
  ) {}

  ngOnInit() {
    this.getProfileInfo();
  }

  getProfileInfo() {
    this.isLoadData = true;
    this.masterService.getList(this.baseService, '').subscribe(async (result) => {
      // const role = result["user"]["role"];
      let jurusan = localStorage.getItem("jurusan");
      let role = JSON.parse(localStorage.getItem("currentUser")).role;
        MENU_ITEMS.map((el) => {
          debugger
          switch (el.data) {
            case "siswa": 
              if ((jurusan.includes('IPA')) || ((jurusan.includes('IPS')))) this.filteredMenuRoles.push(el); 
            break;
            case "siswa-ipa": 
              if (jurusan.includes('IPA')) this.filteredMenuRoles.push(el); 
            break;
            case "siswa-ips": 
              if (jurusan.includes('IPS')) this.filteredMenuRoles.push(el); 
            break;
            case "Master": 
              if (role === 'Manajemen' || role === 'General Admin') this.filteredMenuRoles.push(el); 
            break;
            case "Data Siswa": 
              if ((jurusan === 'fo') && role === 'Koordinator Cabang' || role === 'Manajemen' || role === 'Wali Kelas' || role === 'Guru' || role === 'General Admin') this.filteredMenuRoles.push(el); 
            break;
            case "Absensi Kuis": 
              if ((jurusan === 'fo') && role === 'Koordinator Cabang' || role === 'Manajer Akademik' || role === 'Manajemen' || role === 'General Admin') this.filteredMenuRoles.push(el); 
            break;
            case "Try Out": 
              if (role === 'General Admin') this.filteredMenuRoles.push(el); 
            break;
            case "Uang Biaya": 
              if ((jurusan === 'fo') && role === 'Koordinator Cabang' || role === 'General Admin' || role === 'Manajemen' || role === 'Keuangan Jatim') this.filteredMenuRoles.push(el); 
            break;
            case "Reports": 
              if ((jurusan === 'fo') && role === 'Koordinator Cabang' || role === 'Manajer Akademik' || role === 'Manajemen' || role === 'Wali Kelas' || role === 'Guru' || role === 'General Admin') this.filteredMenuRoles.push(el); 
            break;
            case "Reports Jatim": 
              if (role === 'Keuangan Jatim') this.filteredMenuRoles.push(el); 
            break;
            case "System Users": 
              if (role === 'General Admin') this.filteredMenuRoles.push(el); 
            break;
            case "dashboard": 
              if (role !== 'General Admin' && role !== 'Guru') this.filteredMenuRoles.push(el); 
            default: break;
          }
        });

          // MENU_ITEMS[6].children.forEach((item,index) => {
            if(role === 'Manajemen'){
              MENU_ITEMS[6].children[2].hidden = true;
              MENU_ITEMS[6].children[3].hidden = true;
              MENU_ITEMS[6].children[4].hidden = true;
              MENU_ITEMS[6].children[5].hidden = true;
              MENU_ITEMS[6].children[9].hidden = true;
            } else{
              MENU_ITEMS[6].children[2].hidden = false;
              MENU_ITEMS[6].children[3].hidden = false;
              MENU_ITEMS[6].children[4].hidden = false;
              MENU_ITEMS[6].children[5].hidden = false;
              MENU_ITEMS[6].children[9].hidden = false;
            }
          // });
    });
    this.isLoadData = false;
  }
}

