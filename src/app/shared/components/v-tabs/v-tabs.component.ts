import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { IVTabeModel } from './vtab.model';
import { VTabComponent } from './v-tab.component';

@Component({
  selector: 'app-v-tabs',
  templateUrl: './v-tabs.component.html',
  styleUrls: ['./v-tabs.component.scss']
})
export class VTabsComponent implements OnInit {

  active="tab0"
  @Input() hasIcon:boolean=false;
  @Input() tabs:IVTabeModel[];
  /* @ContentChildren(VTabComponent) contents:QueryList<VTabComponent>; */
  constructor() {
  
  }

  ngOnInit(): void {
  }
}
