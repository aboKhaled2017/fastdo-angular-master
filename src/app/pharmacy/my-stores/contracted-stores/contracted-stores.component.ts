import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatePageService } from 'src/app/shared/services/activatedPage.service';
import { BaseStoresComponent } from '../base.component';
import { E_PharmacyStoreComponentType } from '../models/enums';
import {IPharmacyContractedStkResponseModel } from '../models/IPharmacy.stk.search.model';
import { MyStoresService } from '../my-stores.service';

@Component({
  selector: 'app-contracted-stores',
  templateUrl: './contracted-stores.component.html',
  styleUrls: ['./contracted-stores.component.scss']
})
export class ContractedStoresComponent extends BaseStoresComponent<IPharmacyContractedStkResponseModel>{

  constructor(public storeService:MyStoresService<IPharmacyContractedStkResponseModel>,
    public activepageService:ActivatePageService,
    public router:Router){
      super(storeService,router,E_PharmacyStoreComponentType.contracted);
    }

    ngOnInit(): void {
    }
    getDetails(item:IPharmacyContractedStkResponseModel){
     return [
       {t1:'العنوان',t2:item.address},
       {t1:'العنوان التفصيلى',t2:item.addressInDetails},
       {t1:'الهاتف المحمول',t2:item.phoneNumber},
       {t1:'التليفون الارضى',t2:item.landeLinePhone}
     ]
    }
    cancelContract(id:string){
      this.storeService.cancelContract(id).subscribe(()=>{
        this.datalist=this.datalist.filter(e=>e.stockId!=id);
     });;
    }

}
