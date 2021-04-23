import { Component } from '@angular/core';
import { MyStoresService } from './my-stores.service';
import { IGeneralPagination } from '../../shared/models/IPagination.model';
import { E_PharmacyStoreComponentType } from './models/enums';
import { IPharmacyStkComponentType } from './models/IPharmacy.stk.search.model';
import { Router } from '@angular/router';
import { Constants } from '../../shared/constnts';

@Component({
  selector: 'app.base-mystore',
  template:''
})
export class BaseStoresComponent<TResponseModel> implements IPharmacyStkComponentType{

  loading=false;
  pg:IGeneralPagination;
  datalist:TResponseModel[]=[];
  type: E_PharmacyStoreComponentType;
  constructor(public storeService:MyStoresService<TResponseModel>,
              public router:Router,
              type:E_PharmacyStoreComponentType) {
    this.type=type;
    storeService. activepageService.setActivePage(Constants.activePags.pharmacy_Stores,router.url);
    this.storeService.pgService.paginator.subscribe(_pg=>{
      this.pg=_pg;
    });
    this.storeService.onFetchData.subscribe(this.setDataList);
    this.storeService.loadingService.isLoading.subscribe(e=>this.loading=e);
    this.onRefresh();
  }
  private setDataList=(data:TResponseModel[])=>{
    this.datalist=data;
  }
 
  onPageSelected(page){
    this.storeService.getWhere({pageNumber:page},this.type);
  }
  onRefresh(){
    this.storeService.getWhere({},this.type);
  }
  onPageSizeSelected(pageSize){
    this.storeService.getWhere({pageNumber:1,pageSize:pageSize},this.type);
  }
}
