import { Component, OnInit } from '@angular/core';
import { IGeneralPagination } from 'src/app/shared/models/IPagination.model';
import { IPageRequestModel, PageRequestModel } from 'src/app/shared/models/Page.request.model';
import { IStoreDrugRequestModel } from '../models/storeRequestDrugModel.model';
import { StoreRequestsDrugsService } from './store-requests-drugs.service';

@Component({
  selector: 'app-store-requests-drugs',
  templateUrl: './store-requests-drugs.component.html',
  styleUrls: ['./store-requests-drugs.component.scss'],
  providers:[StoreRequestsDrugsService]
})
export class StoreRequestsDrugsComponent implements OnInit {

  pg:IGeneralPagination;
  datalist:IStoreDrugRequestModel[]=[];
  loading:boolean=true;
  reqModel:IPageRequestModel=new PageRequestModel({pageNumber:1,pageSize:2});
  constructor(private dataService:StoreRequestsDrugsService) {
    this.dataService.onLoading.subscribe(e=>{
      this.loading=e;
    });
    this.dataService.paginatorService.paginator.subscribe(e=>{
     this.pg=e;
    });
    this.dataService.onFetchData.subscribe(data=>{
      this.datalist=data;
    });
    this.onRefresh();
   }

    ngOnInit(): void {
    }
    onPageSelected(page){
    this.dataService.getPageOfDrugs(this.reqModel.reBuild({pageNumber:page}));
    }
    onRefresh(){
    this.dataService.getPageOfDrugs(this.reqModel);
    }
    onPageSizeSelected(pageSize){
    this.dataService.getPageOfDrugs(this.reqModel.reBuild({pageNumber:1,pageSize:pageSize}));
    }

}
