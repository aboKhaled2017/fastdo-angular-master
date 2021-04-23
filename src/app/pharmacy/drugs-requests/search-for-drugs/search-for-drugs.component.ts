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
  innerCols:ITbColModel[]=[];
  @ViewChild('col_2_display') col_2_display:TemplateRef<HTMLElement>;
  @ViewChild('col_3_display') col_3_display:TemplateRef<HTMLElement>;
  @ViewChild('price_display') price_display:TemplateRef<HTMLElement>;
  @ViewChild('discount_display') discount_display:TemplateRef<HTMLElement>;
  @ViewChild('status_display') status_display:TemplateRef<HTMLElement>;

  private getCols():ITbColModel[]{
   return [
    {name:'اسم الدواء',cols:2,propName:'name',classList:'notArabicFont'},
    {name:'عدد المخازن التى يتواجد بها',cols:1,propName:'stockCount',template:this.col_2_display},
    {name:'اعلى خصم من بين المخازن',cols:1,propName:'discount',template:this.col_3_display},
   ];
  }

  private getInnerCols():ITbColModel[]{
    return [
     {name:'المخزن',cols:1,propName:'stockName',classList:'notArabicFont'},
     {name:'السعر',cols:1,propName:'price',template:this.price_display},
     {name:'الخصم',cols:1,propName:'discount',template:this.discount_display},
     {name:'حالة الانضمام',cols:1,propName:'isJoinedTo',template:this.status_display},
     {name:'',cols:1,propName:null,display:true},
    ];
  }

  dataList:ISearchedStkDrugResponseModel[]=[];
  dataTable:{name:string,stockCount:number,hstStk:ISearchedStkDrug_StockResponseModel}[]=[];
  stores:{id:string,name:string}[]=[];
  packages:{id:string,name:string}[]=[];
  selectedPackageId:string;
  
  constructor(public storeService:DrugsRequestsService,
              public router:Router) {
    super(storeService,router,'search');
    this.onRefresh();
    
    if(this.storeService.onFetchPackages.value.length==0)
    this.storeService.getWhere({pageSize:2,pageNumber:1},'myDrugReqs');
    
    this.storeService.currentSelectedPackage.subscribe(e=>{
      this.selectedPackageId=e?.original?.packageId;
    });

    this.storeService.onFetchData.subscribe(_data=>{
      this.dataList=_data;
      this.dataTable=this.mapToDataTable(_data);
    });
   
    this.storeService.dataStorageService.getAllStocksNames().subscribe(_data=>{
      this.stores=_data;
    });

   this.storeService.onFetchPackages.subscribe(_packs=>{
    this.packages=_packs.map(e=>({
      id:e.packageId,
      name:e.name
    }));
   });
  }

  ngAfterViewInit(): void {
    of([]).pipe(delay(0)).subscribe(()=>{
      this.innerCols=this.getInnerCols()
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

  onSelectedPackgChange(id:string){
    this.storeService.setCurrentSelectedPackage(id).subscribe(()=>{},()=>{});
  }

  selectedStoreChanged(storeId:string){
    this.storeService.getWhere({stockId:storeId},'search');
  }

  onSearchDrugChange(text:string){
    text=text?text.trim() :'';
    this.storeService.getWhere({s:text},'search');
  }

  addToPackage(id:string,stockId:string,quantity:number){
    
  }
}
