import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDrugsRequestsComponent } from '../base.component';
import { DrugsRequestsService } from '../drugs-requests.service';
import { ISearchedStkDrugResponseModel, ISearchedStkDrug_StockResponseModel } from '../models/searchedStkDrugResponse.model';
import { ITbColModel } from 'src/app/shared/components/main-table/models/col.model';
import { of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-search-for-drugs',
  templateUrl: './search-for-drugs.component.html',
  styleUrls: ['./search-for-drugs.component.scss']
})
export class SearchForDrugsComponent extends BaseDrugsRequestsComponent{
 
  cols=new Subject<ITbColModel[]>();
 
  @ViewChild('col_2_display') col_2_display:TemplateRef<HTMLElement>;
  @ViewChild('col_3_display') col_3_display:TemplateRef<HTMLElement>;


  private getCols():ITbColModel[]{
   return [
    {name:'اسم الدواء',cols:2,propName:'name',classList:'notArabicFont'},
    {name:'عدد المخازن التى يتواجد بها',cols:1,propName:'stockCount',template:this.col_2_display},
    {name:'اعلى خصم من بين المخازن',cols:1,propName:'discount',template:this.col_3_display},
   ];
  }

  

  dataList:ISearchedStkDrugResponseModel[]=[];
  dataTable:{name:string,stockCount:number,hstStk:ISearchedStkDrug_StockResponseModel}[]=[];
  stores:{id:string,name:string}[]=[];

  constructor(public _service:DrugsRequestsService,
              public router:Router) {
    super(_service,router,'search');
    this.onRefresh();
    
    if(this._service.onFetchPackages.value.length==0)
       this._service.getWhere({},'myDrugReqs');

    this.subscription.push(this._service.onFetchData.subscribe(_data=>{
      this.dataList=_data;
      this.dataTable=this.mapToDataTable(_data);
    }));
    this.subscription.push(this._service.pgService.paginator.subscribe(_pg=>{
      if(_pg.urlName==this._service.searchDrugsPatternName)
      this.pg=_pg;
    }));
    this.subscription.push(this._service.dataStorageService.getAllStocksNames().subscribe(_data=>{
      this.stores=_data;
    }));
  }

  ngAfterViewInit(): void {
    of([]).pipe(delay(0)).subscribe(()=>{
      this.cols.next(this.getCols());
    });
  }
  
  mapToDataTable(_data:ISearchedStkDrugResponseModel[]){
    return _data.map(r=>({
      stocks:r.stocks,
      name:r.name,
      stockCount:r.stockCount,
      hstStk:this.getHighestDiscount(r.stocks)}));
  }

  private getHighestDiscount(stocks:ISearchedStkDrug_StockResponseModel[]){
    return stocks.sort((a1,a2)=>a1.discount-a2.discount)[0];
  }

  selectedStoreChanged(storeId:string){
    this._service.getWhere({stockId:storeId},'search');
  }

  onSearchDrugChange(text:string){
    text=text?text.trim() :'';
    this._service.getWhere({s:text},'search');
  }

}
