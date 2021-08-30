import { Component } from '@angular/core';
import { DrugUtility } from 'src/app/shared/Utilities/drug.utility';
import { IDrugSearchModel } from '../../models/DrugSearchModel';
import { DrugSearchService } from '../drug-search.service';

@Component({
  selector: 'app-drug-search-result',
  templateUrl: './drug-search-result.component.html',
  styleUrls: ['./drug-search-result.component.scss']
})
export class DrugSearchResultComponent {

  datalist:IDrugSearchModel[]=[];
  constructor(private drugSearchService:DrugSearchService) { 
    this.drugSearchService.onFetchData.subscribe(this.setDataList);
  }
  private setDataList=(data:IDrugSearchModel[])=>{
    this.datalist=data.map(e=>({
      ...e,
      priceType:DrugUtility.getPriceType(e.priceType) as any,
      unitType:DrugUtility.getUnitType(e.unitType) as any
    }));
  }

 
  
}
