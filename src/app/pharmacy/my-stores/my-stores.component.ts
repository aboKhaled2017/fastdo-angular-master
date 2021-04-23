import { Component } from '@angular/core';
import { HTabeModel } from 'src/app/shared/components/h-tabe/hTabe.model';
import { MyStoresService } from './my-stores.service';
import { ActivatePageService } from '../../shared/services/activatedPage.service';
import { Constants } from '../../shared/constnts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-stores',
  templateUrl: './my-stores.component.html',
  styleUrls: ['./my-stores.component.scss'],
  providers:[MyStoresService]
})
export class MyStoresComponent{

  tabs:HTabeModel[];
  constructor(public activepageService:ActivatePageService,
              public router:Router) {
    this.tabs=[
      {id:1, iconClass:'fa-building',link:'/pharmacy/mystores/contracted',text:'المخازن المتاعقد معها'},
      {id:2,iconClass:'fa-building',link:'/pharmacy/mystores/search',text:'البحث عن مخازن'},
      {id:3,iconClass:'fa-building',link:'/pharmacy/mystores/requested',text:'مخازن تم طلبها'}
    ];
    activepageService.setActivePage(Constants.activePags.pharmacy_Stores,router.url);
  }
}
