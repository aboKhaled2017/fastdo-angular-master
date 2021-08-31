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
  selector: 'app-drugs-exch-we-received',
  templateUrl: './drugs-exch-we-received.component.html',
  styleUrls: ['./drugs-exch-we-received.component.scss']
})
export class DrugsExchWeReceivedComponent extends DrugsBaseComponent<any>{

constructor(public paginatorService:PaginatorService,
    private drugsService:DrugsService,
    public loaderService:LoaderService,
    public activepageService: ActivatePageService,
    private route:ActivatedRoute,
    private modalPopupservice:ModalPopupservice,
    public router:Router,
    private toastService:ToastService) { 
      super(activepageService,loaderService,paginatorService,
        router,drugsService.getReceivedExchangedDrugs.bind(drugsService));

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
  if(s==0)return {t:"لم تقم بالموافقة بعد" ,c:'text-info'};
  if(s==1)return  {t:"تم الموافقة عليه",c:'text-success'};
  if(s==2) return  {t:"لقد قمت برفض الطلب",c:'text-danger'};
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
 acceptDrugReq(reqId:string,id:string){
this.drugsService.updateExchDrugReq(reqId,id,1).subscribe(d=>{
    this.toastService.showSuccess("تم الموافقة على الطلب");
   var ind= this.drugs.findIndex (e=>e.id==id);
   if(ind>-1){
     this.drugs[ind]={...this.drugs[ind],status:1, s:this.getStatus(1)}
   }
  },(err:IErrorModel)=>{
    console.log(err)
        this.toastService.showError(err.message);
  });
 }
 rejectDrugReq(reqId:string,id:string){
  this.drugsService.updateExchDrugReq(reqId,id,2).subscribe(d=>{
    this.toastService.showSuccess("تم رفض الطلب");
     var ind= this.drugs.findIndex (e=>e.id==id);
   if(ind>-1){
     this.drugs[ind]={...this.drugs[ind],status:2, s:this.getStatus(2)}
   }
  },(err:IErrorModel)=>{
      console.log(err)
        this.toastService.showError(err.message);
  });
 }
}
