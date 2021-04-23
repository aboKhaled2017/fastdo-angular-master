import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTabeModel } from 'src/app/shared/components/h-tabe/hTabe.model';
import { Constants } from 'src/app/shared/constnts';
import { ActivatePageService } from 'src/app/shared/services/activatedPage.service';

@Component({
  selector: 'app-drugs-requests',
  templateUrl: './drugs-requests.component.html',
  styleUrls: ['./drugs-requests.component.scss']
})
export class DrugsRequestsComponent  {

  tabs:HTabeModel[];
  constructor(public activepageService:ActivatePageService,
              public router:Router) {
    this.tabs=[
      {id:1, iconClass:'fa-search',link:'/pharmacy/request-drugs-from-stores/search',text:'البحث عن منتجات ادوية'},
      {id:2,iconClass:'fa-th-list',link:'/pharmacy/request-drugs-from-stores/list',text:'الطلبيات'},
      {id:3, iconClass:'fa-edit',link:'/pharmacy/request-drugs-from-stores/edit',text:'تعديل طلبية'}
    ];
  }

}
