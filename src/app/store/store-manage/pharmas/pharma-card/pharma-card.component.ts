import { Component, Input, OnInit } from '@angular/core';
import { E_PharmacyRequestStatus } from 'src/app/shared/enums/enums';
import { IPharmaResponseModel } from 'src/app/store/models/IPharmaResponseModel.model';
import { MyPharmasServiceService } from '../my-pharmas-service.service';

@Component({
  selector: 'app-pharma-card',
  templateUrl: './pharma-card.component.html',
  styleUrls: ['./pharma-card.component.scss']
})
export class PharmaCardComponent  {

  loading=false;
  @Input('card') item:IPharmaResponseModel;
  @Input() index:number;
  constructor(private _service:MyPharmasServiceService) { }

  getDetails(){
    let item=this.item.pharma;
     return [
       {t1:'العنوان',t2:item.address},
       {t1:'العنوان التفصيلى',t2:item.addressInDetails},
       {t1:'الهاتف المحمول',t2:item.phoneNumber},
       {t1:'التليفون الارضى',t2:item.landlinePhone}
     ]
  }

  updateStatus(pharmaId:string,status:E_PharmacyRequestStatus){
    this.loading=true;
    this._service.updateRequestStatus(pharmaId,status,this.index)
    .subscribe(()=>{
      this.loading=false;
    });
  }

}
