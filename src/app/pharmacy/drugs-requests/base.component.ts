import { Component, Inject } from '@angular/core';
import { IGeneralPagination } from '../../shared/models/IPagination.model';
import { IPageRequestModel } from 'src/app/shared/models/Page.request.model';
import { Observable, Subscription } from 'rxjs';
import { DrugsRequestsService } from './drugs-requests.service';
import { Router } from '@angular/router';
import { Constants } from '../../shared/constnts';

export type DrugFetchFunc<T>=(req: IPageRequestModel)=>Observable<T[]>;
type DataListMapper<T,V>=(data:T[])=>V[]

@Component({
  selector: 'app.base-mystore',
  template:''
})
export class BaseDrugsRequestsComponent{

  pg:IGeneralPagination;
  loading:boolean;
  reqModel:IPageRequestModel;
  subscription:Subscription[]=[];
  constructor(public storeService:DrugsRequestsService,
              public router:Router,
              @Inject('type') public type:string) {

    this.storeService.activatePageService.setActivePage(Constants.activePags.pharmacy_DrugsRequests,router.url);
   
    this.storeService.loadingService.isLoading.subscribe(e=>this.loading=e);
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
  ngOnDestroy(): void {
    this.subscription.forEach(e=>e.unsubscribe());
  }
}
