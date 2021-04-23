import { Component } from '@angular/core';
import { IGeneralPagination } from 'src/app/shared/models/IPagination.model';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { DrugRequestModel, IDrugRequestModel } from '../drugs/Models/drugRequest.model';
import { DrugSearchService } from './drug-search.service';
import { LoaderService } from '../../shared/services/loader-service.service';

@Component({
  selector: 'app-drugs-search',
  templateUrl: './drugs-search.component.html',
  styleUrls: ['./drugs-search.component.scss'],
  providers:[DrugSearchService]
})
export class DrugsSearchComponent{
 
  loading:boolean=false;
  pg:IGeneralPagination;
  reqModel:IDrugRequestModel;
  constructor(public drugSearchService:DrugSearchService,
              public paginatorService:PaginatorService) { 
    this.reqModel=new DrugRequestModel(this.pg);
    drugSearchService.loading.subscribe(v=>this.loading=v);
    this.paginatorService.paginator.subscribe(_pg=>{
      this.pg=_pg;
    });
    this.onRefresh();
  }
  onPageSelected(page){
    this.drugSearchService.getWhere({pageNumber:page});
  }
  onRefresh(){
    this.drugSearchService.getWhere({});
  }
  onPageSizeSelected(pageSize){
    this.drugSearchService.getWhere({pageNumber:1,pageSize:pageSize});
  }
}
