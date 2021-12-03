import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NbToastrService } from '@nebular/theme';
import { MasterService } from "../../../_services/master.service";

@Component({
  selector: 'delete-jurusan-universitas',
  styleUrls: ['./delete-jurusan-universitas.component.scss'],
  templateUrl: './delete-jurusan-universitas.component.html',
})
export class DeleteJurusanUniversitasComponent implements OnDestroy, OnInit {
    dataForm: any;
    submitLoading: Boolean = false;
    baseService = "core/jurusan-universitas";

    constructor(
      protected ref: NbDialogRef<DeleteJurusanUniversitasComponent>,
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

      // const data = {
      //   profile: [this.dataForm.id]
      // }
      this.masterService.delete(this.baseService, this.dataForm.id).subscribe(
        res => {
            if (res['success']){                
                this.showToast('top-right', 'success', 'You have successfully deleted a jurusan universitas.');
                this.ref.close({'success' : true});
            } else {
              this.showToast('top-right', 'danger', 'Something went wrong, please try again later.');
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