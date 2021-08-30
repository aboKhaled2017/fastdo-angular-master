import { Component } from '@angular/core';
import { IGeneralPagination } from 'src/app/shared/models/IPagination.model';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { DrugRequestModel, IDrugRequestModel } from '../drugs/Models/drugRequest.model';
import { DrugSearchService } from './drug-search.service';

@Component({
  selector: 'app-drugs-search',
  templateUrl: './drugs-search.component.html',
  styleUrls: ['./drugs-search.component.scss'],
  providers:[DrugSearchService]
})
export class DrugsSearchComponent{
  selectedPharmacy:{ pharmacyId: string; pharmacyName: string;}=null;
  selectedDrgsToExchange:string[]=[];
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
    this.drugSearchService.selectedPharmacy.subscribe(e=>{
      console.log(e)
      this.selectedPharmacy=e;
    });
    this.drugSearchService.selectedDrugsToExchange.subscribe(e=>{
      this.selectedDrgsToExchange=e;
    })
  }
   exchange(){
    if(this.selectedDrgsToExchange.length<1){
      alert('قم باختيار راكد واحد على الاقل')
    }
    else{
      console.log(this.selectedDrgsToExchange);
      this.drugSearchService.ExecuteExchange().subscribe(
        o=>{
          alert("تم ارسال طلب الاستبدال")
          this.onRefresh();
        },
        error=>{
     console.log(error)
      });
    }
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
