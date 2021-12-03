import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NbToastrService } from '@nebular/theme';
import { MasterService } from "../../../_services/master.service";
import * as moment from 'moment';

@Component({
  selector: 'delete-uang-biaya',
  styleUrls: ['./delete-uang-biaya.component.scss'],
  templateUrl: './delete-uang-biaya.component.html',
})
export class DeleteUangBiayaComponent implements OnDestroy, OnInit {
    dataForm: any;
    submitLoading: Boolean = false;
    baseService = "core/uang-biaya";
    deleteAbsenService = "core/uang-biaya-delete";

    constructor(
      protected ref: NbDialogRef<DeleteUangBiayaComponent>,
      private toastrService: NbToastrService,
      private masterService: MasterService
    ) {}

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    onCancel() {
      this.ref.close();
    }

    onDelete() {
      
      this.submitLoading = true;

      const param = { 
        "tanggal" : this.dataForm.tanggal, 
        "cabang" : this.dataForm.cabang, 
        "kelas_inten" : this.dataForm.kelas_inten, 
        "mata_pelajaran" :this.dataForm.mata_pelajaran, 
        "guru" : this.dataForm.guru, 
        "kuis" : this.dataForm.kuis
      }
  
      this.masterService.deleteBy(this.deleteAbsenService, param).subscribe(
        res => {
            if (res['success']){   
              this.showToast('top-right', 'success', 'You have successfully deleted absensi kuis.');
            }
        },
        err => {
          this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
        },
      );      
    }

    showToast(position, status, messages) {
      this.toastrService.show(
        '',
        messages,
        { position, status });
    }
}