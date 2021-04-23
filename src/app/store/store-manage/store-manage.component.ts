import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HTabeModel } from 'src/app/shared/components/h-tabe/hTabe.model';
import { Constants } from 'src/app/shared/constnts';
import { ActivatePageService } from 'src/app/shared/services/activatedPage.service';

@Component({
  selector: 'app-store-manage',
  templateUrl: './store-manage.component.html',
  styleUrls: ['./store-manage.component.scss']
})
export class StoreManageComponent  {

  subscription:Subscription;
  tabs:HTabeModel[];
  constructor(private route:ActivatedRoute,private router:Router,private activePageService:ActivatePageService) { 

  this.subscription= this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
  .subscribe(event=>{
    activePageService.setActivePage(Constants.activePags.storeManage,event['url']);
  });

   this._setTabs();
  }
  private _setTabs(){
    this.tabs=[
      {id:1, iconClass:'fa-plus-circle',link:'/store/manage-store/drugs',text:'منتجات الادوية'},
      {id:2,iconClass:'fa-th-list',link:'/store/manage-store/pharmas',text:'صيدلياتى'},
      {id:3,iconClass:'fa-th-list',link:'/store/manage-store/pharmas-requests',text:'طلبات الصيدليات'},
      {id:4,iconClass:'fa-th-list',link:'/store/manage-store/classes',text:'التصنيفات'},
    ];
  }
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

}
