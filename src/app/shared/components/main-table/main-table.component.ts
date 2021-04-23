import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ITbColModel } from './models/col.model';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {
  
  @Input('cols') cols:ITbColModel[];
  @Input() data:{[key:string]:any}[];
  @Input('controls') public controls:TemplateRef<HTMLElement>;
  @Input('collapsed') public collapsed_tr:TemplateRef<HTMLElement>;
  @Input('tstyle') tstyle={thead:{},tbody:{}} 
  @Input('tclass') tclass={thead:"",tbody:""};
  constructor() { }

  ngOnInit(): void {
  }
}
