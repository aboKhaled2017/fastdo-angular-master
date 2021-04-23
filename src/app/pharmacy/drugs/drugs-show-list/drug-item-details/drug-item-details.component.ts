import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IVTabeModel } from 'src/app/shared/components/v-tabs/vtab.model';
import { E_drug_ConsumeType } from 'src/app/shared/enums/enums';
import { IDrugModel } from '../../Models/DrugModel';

@Component({
  selector: 'app-drug-item-details',
  templateUrl: './drug-item-details.component.html',
  styleUrls: ['./drug-item-details.component.scss']
})
export class DrugItemDetailsComponent implements OnInit {
 
  @Input('drug') drug:IDrugModel;
  tabs:IVTabeModel[];
  @ViewChild('detailstable') detailsTable:TemplateRef<HTMLElement>;
  @ViewChild('addtopackage') addToPackage:TemplateRef<HTMLElement>;
  @ViewChild('packagestatus') packageStatus:TemplateRef<HTMLElement>;
  private getTabs():IVTabeModel[]{
    return [
      {title:"كل البيانات",template:this.detailsTable},
      {title:"اضف الى باكج",template:this.addToPackage,disabled:this.drug.consumeType==E_drug_ConsumeType.burning},
      {title:"حالة الراكد",template:this.packageStatus}
    ]
  }
  constructor() {
    
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tabs=this.getTabs(); 
    }, 0);
  }
}
