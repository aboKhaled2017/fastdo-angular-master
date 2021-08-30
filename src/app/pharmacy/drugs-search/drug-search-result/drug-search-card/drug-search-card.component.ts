import { Component, Input, OnInit } from '@angular/core';
import { IDrugSearchModel } from 'src/app/pharmacy/models/DrugSearchModel';
import { DrugUtility } from 'src/app/shared/Utilities/drug.utility';
import { DrugSearchService } from '../../drug-search.service';
import { IErrorModel } from '../../../../shared/models/Error.model';
import { ToastService } from '../../../../shared/services/toast.service.';
import { IDrugReqResponseModel } from 'src/app/pharmacy/models/DrugRequestResponseModel';

@Component({
  selector: 'app-drug-search-card',
  templateUrl: './drug-search-card.component.html',
  styleUrls: ['./drug-search-card.component.scss']
})
export class DrugSearchCardComponent  {
  isSelected=false;
  @Input('drug') card:IDrugSearchModel;
  @Input('index') index:number;
  loading:boolean=false;
  isSpecifiedPharmaSelected=false;
  constructor(private drugSearchService:DrugSearchService,
              private toastService:ToastService) { 
                drugSearchService.selectedPharmacy.subscribe(e=>{
                  this.isSpecifiedPharmaSelected=!!e;
                })
              }
  isDetailsShow=false;
  getItemDetails(){
    return [
      {t1:'النوع',t2:this.card.type},
      {t1:DrugUtility.getDrugStateFormate(this.drugSearchService.lastPageOfData[this.index])},
      {t1:'تاريخ الصلاحية',t2:this.card.valideDate},
      {t1:'نوع السعر',t2:this.card['priceType']},
      {t1:'الخصم',t2:this.card.discount}
    ];
  }
  makeRequest(type:'purchase'|'cancel'){
    this.loading=true;
    let _id=type=='purchase'?this.card.id:this.card.requestId;
    this.drugSearchService.makeRequest(_id,type)
    .subscribe((drugReq:IDrugReqResponseModel)=>{
        this.loading=false;
        if(type=='purchase') {
          this.toastService.showSuccess('تم ارسال الطلب بنجاح');
          this.card={
            ...this.card,
            isMadeRequest:true,
            id:drugReq.lzDrugId,
            requestId:drugReq.id,
            pharmacyId:drugReq.pharmacyId
          }
        }
        else {
          this.toastService.showSuccess('تم الغاء الطلب بنجاح');
          this.card.isMadeRequest=false;
        }
    },(err:IErrorModel)=>{
      this.loading=false;
      this.toastService.showError(err.message);
    });
  }
  onChange(ev){
    this.isSelected=!this.isSelected;
    this.drugSearchService.switchDrugFromSelectedDrugsList(this.card.id);
  }
}
