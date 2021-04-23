import { Component, Input, OnInit } from '@angular/core';
import { E_StkDrugPackageRequestStatus } from 'src/app/shared/enums/enums';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { BasicUtility } from 'src/app/shared/Utilities/basic.utility';
import { IStoreDrugRequestModel } from '../../models/storeRequestDrugModel.model';
import { StoreRequestsDrugsService } from '../store-requests-drugs.service';

@Component({
  selector: 'app-store-requests-drug-card',
  templateUrl: './store-requests-drug-card.component.html',
  styleUrls: ['./store-requests-drug-card.component.scss']
})
export class StoreRequestsDrugCardComponent  {

  @Input('card') _card:IStoreDrugRequestModel&{[key:string]:any};
  @Input('index') index:number;
  card:IStoreDrugRequestModel&{[key:string]:any};
  loading:boolean=false;
  isDetailsShow=false;
  constructor(private dataService:StoreRequestsDrugsService) { 
   
  }
  ngOnInit(): void {
    this.mapToCardView();
  }
  mapToCardView(){
    this.card={
      ...this._card,
      createdAt:BasicUtility.getDateStringFromDateObjectStr(this._card.createdAt),
      _status:this.getStatus() as any
    }
  }
  private getStatus(){
    let status=this._card.status;
   switch (status) {
     case E_StkDrugPackageRequestStatus.Accepted:
       return {
        text:'لقد قبلت طلبك',
        cls:'badge-success'
      };
     case E_StkDrugPackageRequestStatus.Completed:
       return {
        text:'تم اكتمال الطلب',
        cls:'badge-primary'
      };
     case E_StkDrugPackageRequestStatus.Pending:
      return {
        text:'لم ترد الرد على الطلب حتى لاان',
        cls:'badge-secondary'
      };
     case E_StkDrugPackageRequestStatus.Rejected:
      return {
        text:'لقد قمت برفض طلبك',
        cls:'badge-danger'
      };
     case E_StkDrugPackageRequestStatus.AtNegotioation:
      return {
        text:'الطلب فى حالة تفاوض',
        cls:'badge-info'
      };
     default:
       return {
        text:'لقد قبلت طلبك',
        cls:'badge-success'
      };
   }
  }
  updateStatus(id:string,status:E_StkDrugPackageRequestStatus){
       this.loading=true;
    this.dataService.updateStatus(id,status).subscribe(()=>{
      this.dataService.toastService.showSuccess('تم تغيير حالة الطلب بنجاح');
     this.loading=false;
     this._card.status=status;
     this.mapToCardView();
    },(err:IErrorModel)=>{
      this.dataService.toastService.showError(err.message);
     this.loading=false;
    });
  }
  getDrugs(){
    return this.card.drugs.map(d=>({
      name:d.name,
      q:d.quantity
    }));
  }
}
