import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ITbColModel } from '../models/col.model';
import { IDrugModel } from '../../../../pharmacy/drugs/Models/DrugModel';

@Component({
  host: { style: 'display:none'  },
  selector: 'app-main-table-row-section',
  templateUrl: './main-table-row-section.component.html',
  styleUrls: ['./main-table-row-section.component.scss']
})
export class MainTableRowSectionComponent implements OnInit {

  @Input() item:IDrugModel;
  @Input('cols') cols:ITbColModel[];
  @Input('collapsed') public collapsed_tr:TemplateRef<HTMLElement>;
  collapsed=true;

  constructor(private readonly viewContainer: ViewContainerRef) {}

  
  @ViewChild('content', { static: true }) content: TemplateRef<{}>;

  ngOnInit() {
    this.viewContainer.createEmbeddedView(this.content);
  }
  toggle(){
    this.collapsed=!this.collapsed;
  }
  get collapsedColsPan(){
    return this.collapsed_tr?this.cols.length+1:this.cols.length;
  }
}
