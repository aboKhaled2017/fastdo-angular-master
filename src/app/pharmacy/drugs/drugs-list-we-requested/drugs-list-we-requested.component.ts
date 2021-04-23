import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { E_drug_requestStatus } from 'src/app/shared/enums/enums';
import { ActivatePageService } from 'src/app/shared/services/activatedPage.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { DrugsBaseComponent } from '../base.component';
import { DrugsService } from '../drugs.service';
import { IRequestedDrugViewModel } from '../Models/requestedDrug.viewModel';
import { IErrorModel } from '../../../shared/models/Error.model';
import { ModalPopupservice } from '../../../shared/services/modal.popup.service';

@Component({
  selector: 'app-drugs-list-we-requested',
  templateUrl: './drugs-list-we-requested.component.html',
  styleUrls: ['./drugs-list-we-requested.component.scss']
})
export class DrugsListWeRequestedComponent extends DrugsBaseComponent<IRequestedDrugViewModel> {

  private  _buildRequestModel(){
    this.reqModel.addCriteria("status");
    this.reqModel.addCriteria("seen");   
  }
  constructor(public paginatorService:PaginatorService,
    private drugsService:DrugsService,
    public loaderService:LoaderService,
    public activepageService: ActivatePageService,
    private route:ActivatedRoute,
    private modalPopupservice:ModalPopupservice,
    public router:Router,
    private toastService:ToastService) { 
      super(activepageService,loaderService,paginatorService,
        router,drugsService.getPageOfMadeRequests.bind(drugsService));
      this._buildRequestModel();
  }

  get getDataList(){
    return this.datalist.map(e=>({
      ...e,statusObj:this.getStatusText(e.status)
    }));
  }
  private getStatusText(status:E_drug_requestStatus){
    let obj={text:"",cls:"",message:undefined};
    switch(status){
      case E_drug_requestStatus.Accepted :{
        obj.text="تم قبول طلبك";
        obj.message="تم قبول طلبك وخلال اقل من 48 ساعة سيقوم فاست دو بالتواصل بك ,لتوصيل طلبك";
        obj.cls="badge-success";
        break;
      }
      case E_drug_requestStatus.AcceptedForAnotherOne :{
        obj.text="للاسف تم حجز الطلب لصيدلية اخرى";
        obj.cls="badge-danger";
        break;
      }
      case E_drug_requestStatus.AtNegotioation :{
        obj.text="مازال فى حالة تفاوض";
        obj.cls="badge-warning";
        break;
      }
      case E_drug_requestStatus.Completed :{
        obj.text="اكتمل طلبك";
        obj.cls="badge-info";
        break;
      }
      case E_drug_requestStatus.Rejected :{
        obj.text="تم رفض طلبك";
        obj.cls="badge-danger";
        break;
      }
      default:{
        obj.text="لم يتم الرد على طلبك حتى الان";
        obj.cls="badge-secondary";
        break;
      }
    }
   return obj;
  }
  cancelRequest(id:string){
    this.modalPopupservice.openDeleteModal({message:"هل تريد بالفعل الغاء هذا الطلب"})
    .result.then(()=>{
      this.drugsService.deleteRequest(id)
      .pipe(first())
      .subscribe(()=>{
        this.onRefresh();
        this.toastService.showSuccess("تم حذف الطلب بنجاح");
      },(err:IErrorModel)=>{
        this.toastService.showError(err.message);
      })
    },()=>{});   
  }
}
