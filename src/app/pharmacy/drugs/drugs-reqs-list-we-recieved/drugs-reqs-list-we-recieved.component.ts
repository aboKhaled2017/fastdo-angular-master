import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { E_drug_requestStatus } from 'src/app/shared/enums/enums';
import { ActivatePageService } from 'src/app/shared/services/activatedPage.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { DrugsBaseComponent } from '../base.component';
import { DrugsService } from '../drugs.service';
import { IReicevedDrugViewModel } from '../Models/recievedDrug.viewModel';
import { ModalPopupservice } from '../../../shared/services/modal.popup.service';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-drugs-reqs-list-we-recieved',
  templateUrl: './drugs-reqs-list-we-recieved.component.html',
  styleUrls: ['./drugs-reqs-list-we-recieved.component.scss']
})
export class DrugsReqsListWeRecievedComponent  extends DrugsBaseComponent<IReicevedDrugViewModel>  {

  statusLoading:boolean=false;
  focusedItem:string;
  constructor(public paginatorService:PaginatorService,
    private drugsService:DrugsService,
    public loaderService:LoaderService,
    public activepageService: ActivatePageService,
    private route:ActivatedRoute,
    public router:Router,
    private modalPopupservice:ModalPopupservice,
    
    private toastService:ToastService) { 
      super(activepageService,
        loaderService,paginatorService,
        router,
        drugsService.getPageOfRecievedRequests.bind(drugsService),
        data=>data.map(e=>({
          ...e,statusObj:this.getStatusText.bind(this)(e.status)
        })));
 
  }

  ngOnInit(): void {
  }
  private getStatusText(status:E_drug_requestStatus){
    let obj={text:"",cls:"",message:undefined};
    switch(status){
      case E_drug_requestStatus.Accepted :{
        obj.text="لقد قمت بالموافقة على هذا الطلب";
        obj.cls="badge-success";
        break;
      }
      case E_drug_requestStatus.AcceptedForAnotherOne :{
        obj.text="الطلب بالفعل قيد الموافقة لصيدلية اخرى قامت بطلبه";
        obj.cls="badge-warning";
        break;
      }
      case E_drug_requestStatus.AtNegotioation :{
        obj.text="مازال فى حالة تفاوض";
        obj.cls="badge-warning";
        break;
      }
      case E_drug_requestStatus.Completed :{
        obj.text="هذا الطلب مكتمل";
        obj.cls="badge-info";
        break;
      }
      case E_drug_requestStatus.Rejected :{
        obj.text="لقد قمت برفض هذا الطلب";
        obj.cls="badge-danger";
        break;
      }
      default:{
        obj.text="لم تقم بالرد على هذا الطلب حتى الان";
        obj.cls="badge-secondary";
        break;
      }
    }
   return obj;
  }
  onStatusUpdated({id,status}:{id:string,status:E_drug_requestStatus}){
    let itemInd=this.datalist.findIndex(e=>e.id==id);
      if(itemInd>-1){
       let item=this.datalist[itemInd];
       item.status=status;
       this.datalist.splice(itemInd,1,item);
 
      this.setDataList(this.datalist);
   
      }
      else{
        this.onRefresh();
      }
  }
}
