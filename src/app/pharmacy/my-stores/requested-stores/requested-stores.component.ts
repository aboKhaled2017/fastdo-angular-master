import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatePageService } from 'src/app/shared/services/activatedPage.service';
import { MyStoresComponent } from '../my-stores.component';
import { MyStoresService } from '../my-stores.service';
import { IPharmacyRequestedStkResponseModel } from '../models/IPharmacy.stk.search.model';
import { BaseStoresComponent } from '../base.component';
import { E_PharmacyStoreComponentType } from '../models/enums';
import { E_PharmacyRequestStatus } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-requested-stores',
  templateUrl: './requested-stores.component.html',
  styleUrls: ['./requested-stores.component.scss']
})
export class RequestedStoresComponent extends BaseStoresComponent<IPharmacyRequestedStkResponseModel> {

  constructor(public storeService:MyStoresService<IPharmacyRequestedStkResponseModel>,
    public activepageService:ActivatePageService,
    public router:Router){
      super(storeService,router,E_PharmacyStoreComponentType.requested);
    }

    getDetails(item:IPharmacyRequestedStkResponseModel){
     return [
       {t1:'العنوان',t2:item.address},
       {t1:'العنوان التفصيلى',t2:item.addressInDetails},
       {t1:'الهاتف المحمول',t2:item.persPhone},
       {t1:'التليفون الارضى',t2:item.landLinePhone}
     ]
    }
    cancelContract(id:string){
      this.storeService.cancelContract(id).subscribe(()=>{
         this.datalist=this.datalist.filter(e=>e.stockId!=id);
      });
    }
    getStatus(status:E_PharmacyRequestStatus){
      let obj={text:"",cls:"",message:undefined};
      switch(status){
        case E_PharmacyRequestStatus.Accepted :{
          obj.text="تم قبول طلبك";
          obj.message="تم قبول طلبك وخلال اقل من 48 ساعة سيقوم فاست دو بالتواصل بك لتأكيد الموافقة";
          obj.cls="badge-success";
          break;
        }
        case E_PharmacyRequestStatus.Pending :{
          obj.text="لم يتم الرد على طلبك حتى الان";
          obj.cls="badge-secondary";
          break;
        }
        case E_PharmacyRequestStatus.Disabled :{
          obj.text="تم تعطيلك من قبل المخزن";
          obj.message="من فضلك قم بالتواصل مع فاست دو لتعر ما هى سبب ومشكلة تعطيلك";
          obj.cls="badge-danger";
          break;
        }
        case E_PharmacyRequestStatus.Rejected :{
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
}