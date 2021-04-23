import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { E_drug_requestStatus } from 'src/app/shared/enums/enums';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { DrugsService } from '../../drugs.service';
import { IRequestedDrugViewModel } from '../../Models/requestedDrug.viewModel';

@Component({
  selector: 'app-drugs-reqs-we-received-card',
  templateUrl: './drugs-reqs-we-received-card.component.html',
  styleUrls: ['./drugs-reqs-we-received-card.component.scss']
})
export class DrugsReqsWeReceivedCardComponent implements OnInit {

  loading=false;
  @Output() onUpdateStatus=new EventEmitter<{id:string,status:any}>();
  @Input('card') item:IRequestedDrugViewModel;
  constructor(private drugsService:DrugsService,
              private toastService:ToastService,
              private loaderService:LoaderService) { }

  ngOnInit(): void {
  }
  updateStatus(id:string,status:E_drug_requestStatus){

    this.loaderService.skipNextRequest=true;
    this.loading=true;
    this.drugsService.changeRequestStatus(id,status)
    .pipe(first())
    .subscribe(()=>{
      this.loading=false;
      this.toastService.showSuccess("تم تحديث حالة الطلب بنجاح");
      this.onUpdateStatus.emit({id,status});   
    },(err:IErrorModel)=>{
      this.toastService.showError(err.message);
        this.loading=false;
    })  
  }
}
