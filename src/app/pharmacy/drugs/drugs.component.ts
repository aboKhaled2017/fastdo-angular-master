import { Component, OnInit } from '@angular/core';
import { HTabeModel } from '../../shared/components/h-tabe/hTabe.model';
import { DrugsService } from './drugs.service';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss']
})
export class DrugsComponent implements OnInit {
  tabs:HTabeModel[];
  constructor(private drugsService: DrugsService) {
    this.tabs=[
      {id:1, iconClass:'fa-plus-circle',link:'/pharmacy/mydrugs/edit',text:'اضافة راكد'},
      {id:2,iconClass:'fa-th-list',link:'/pharmacy/mydrugs/list',text:'عرض الرواكد'},
      {id:3,iconClass:'fa-th-list',link:'/pharmacy/mydrugs/we-requested',text:'رواكد قمنا بطلبها'},
      {id:4,iconClass:'fa-th-list',link:'/pharmacy/mydrugs/we-recieved',text:'طلبات ارسلت الينا'},
      {id:5,iconClass:'fa-th-list',link:'/pharmacy/mydrugs/exh-we-recieved',text:'طلبات استبدال ارسلت الينا'},
      {id:6,iconClass:'fa-th-list',link:'/pharmacy/mydrugs/exh-we-requested',text:'طلبات استبدال قمنا بها'},
    ];
    this.drugsService.updateTabe.subscribe(data=>{
      let tabInd=this.tabs.findIndex(e=>e.id==data.id);
      if(tabInd>-1){
        let tab=this.tabs[tabInd];
        tab={...tab,...data.props};
        this.tabs.splice(tabInd,1,tab);
      }
    });
  }

  ngOnInit(): void {
  }

}
