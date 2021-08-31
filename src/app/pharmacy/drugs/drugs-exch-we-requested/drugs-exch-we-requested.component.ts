import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { ActivatePageService } from 'src/app/shared/services/activatedPage.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { ModalPopupservice } from 'src/app/shared/services/modal.popup.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { DrugsBaseComponent } from '../base.component';
import { DrugsService } from '../drugs.service';

@Component({
  selector: 'app-drugs-exch-we-requested',
  templateUrl: './drugs-exch-we-requested.component.html',
  styleUrls: ['./drugs-exch-we-requested.component.scss']
})
export class DrugsExchWeRequestedComponent extends DrugsBaseComponent<any>{

constructor(public paginatorService:PaginatorService,
    private drugsService:DrugsService,
    public loaderService:LoaderService,
    public activepageService: ActivatePageService,
    private route:ActivatedRoute,
    private modalPopupservice:ModalPopupservice,
    public router:Router,
    private toastService:ToastService) { 
      super(activepageService,loaderService,paginatorService,
        router,drugsService.getRequestedExchangedDrugs.bind(drugsService));

  }
  selectedId:string="";
  cardLoading=false;
  drugs=[];
 get reqs(){
   return this.datalist;
 }
  ngOnInit(): void {
  }
  getStatus(s){
  if(s==0)return {t:"لم يتم الموافقة بعد" ,c:'text-info'};
  if(s==1)return  {t:"تم الموافقة عليه",c:'text-success'};
  if(s==2) return  {t:"تم  رفض الطلب",c:'text-danger'};
  return "";
  }
 getReqDetails(id:string){
this.selectedId=id;
this.drugsService.getExchReceivedDetails(id).subscribe(data=>{
  console.log(data)
  this.drugs=data.requestedDrugs.map(e=>({
    ...e,
    s:this.getStatus(e.status)
  }));
})
 }
 rejectDrugReq(reqId:string,id:string){
   this.drugsService.rejectDrugReqFromReceiver(reqId,this.drugs.map(e=>e.id) as any).subscribe(d=>{
    this.toastService.showSuccess("تم الغاء الراكد");
   this.drugs=this.drugs.filter(e=>e.id!=id)
  },(err:IErrorModel)=>{
      console.log(err)
        this.toastService.showError(err.message);
  });
 }
}
