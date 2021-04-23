import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatePageService } from 'src/app/shared/services/activatedPage.service';
import { MyStoresService } from '../my-stores.service';
import { IPharmacySearchStkResponseModel } from '../models/IPharmacy.stk.search.model';
import { E_PharmacyStoreComponentType } from '../models/enums';
import { BaseStoresComponent } from '../base.component';
import { SearchInputComponent } from '../../../shared/components/form-controls/search-input/search-input.component';


@Component({
  selector: 'app-search-stores',
  templateUrl: './search-stores.component.html',
  styleUrls: ['./search-stores.component.scss']
})
export class SearchStoresComponent extends BaseStoresComponent<IPharmacySearchStkResponseModel>{

  @ViewChild(SearchInputComponent) searchInp:SearchInputComponent;
  constructor(public storeService:MyStoresService<IPharmacySearchStkResponseModel>,
              public activepageService:ActivatePageService,
              public router:Router){
      super(storeService,router,E_PharmacyStoreComponentType.searched);
    }
  
  ngOnInit(): void {
  }
  private onSearchChange=(value:string)=>{
    this.storeService.getWhere({s:(value || "").trim()},this.type);
  }
  ngAfterViewInit(): void {
   this.searchInp.textChanged
   .subscribe(this.onSearchChange)
  }
  getDetails(item:IPharmacySearchStkResponseModel){
   return [
     {t1:'العنوان',t2:item.address},
     {t1:'العنوان التفصيلى',t2:item.addressInDetails},
     {t1:'الهاتف المحمول',t2:item.persPhone},
     {t1:'التليفون الارضى',t2:item.landlinePhone}
   ]
  }
  sendRequest(id:string){
    this.storeService.sendRequest(id);
  }
}