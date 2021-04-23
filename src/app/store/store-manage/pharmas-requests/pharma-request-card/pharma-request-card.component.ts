import { Component, Input, OnInit } from '@angular/core';
import { E_PharmacyRequestStatus } from 'src/app/shared/enums/enums';
import { IPharmaRequest } from 'src/app/store/models/IPharmaRequest.model';
import { PharmasRequestsService } from '../pharmas-requests.service';

@Component({
  selector: 'app-pharma-request-card',
  templateUrl: './pharma-request-card.component.html',
  styleUrls: ['./pharma-request-card.component.scss']
})
export class PharmaRequestCardComponent  {
 
  loading=false;
  @Input('card') item:IPharmaRequest;
  @Input() index:number;
  constructor(private _service:PharmasRequestsService) { }

  getDetails(){
    let item=this.item.pharma;
     return [
       {t1:'العنوان',t2:item.address},
       {t1:'العنوان التفصيلى',t2:item.addressInDetails},
       {t1:'الهاتف المحمول',t2:item.phoneNumber},
       {t1:'التليفون الارضى',t2:item.landlinePhone}
     ]
  }

  getStatus(){
    let status:E_PharmacyRequestStatus=this.item.status;
    let obj={text:"",cls:"",message:undefined};
    switch(status){
      case E_PharmacyRequestStatus.Accepted :{
        obj.text="لقد قبلت هذا الطلب";
        obj.cls="badge-success";
        break;
      }
      case E_PharmacyRequestStatus.Pending :{
        obj.text="لم تقم بالرد على هذا الطلب";
        obj.cls="badge-secondary";
        break;
      }
      case E_PharmacyRequestStatus.Disabled :{
        obj.text="لقد قمت بتعطيل هذا الطلب من";
        obj.cls="badge-danger";
        break;
      }
      case E_PharmacyRequestStatus.Rejected :{
        obj.text="لقد قمت برفض هذا الطلب";
        obj.cls="badge-danger";
        break;
      }
      default:{
       obj.text="لم تقم بالرد على هذا الطلب";
        obj.cls="badge-secondary";
        break;
      }
    }
    return obj;
  }
  updateStatus(pharmaId:string,status:E_PharmacyRequestStatus){
    this.loading=true;
    this._service.updateRequestStatus(pharmaId,status,this.index)
    .subscribe(()=>{
      this.loading=false;
    })
  }
}
