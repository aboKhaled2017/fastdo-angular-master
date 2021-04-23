import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ITbColModel } from 'src/app/shared/components/main-table/models/col.model';
import { IGeneralPagination } from 'src/app/shared/models/IPagination.model';
import { PharmaClass } from 'src/app/shared/models/User';
import { IStkDrugResponseModel } from '../../models/IStockDrugResponse.model';
import { DrugsService } from './drugs.service';
import { BasicUtility } from 'src/app/shared/Utilities/basic.utility';
import { Constants } from 'src/app/shared/constnts';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss'],
  providers:[DrugsService]
})
export class DrugsComponent  {

  @ViewChild('discountDisplay') discountDisplay:TemplateRef<HTMLElement>;
  subscription:Subscription[]=[];
  loading=false;
  pg:IGeneralPagination;
  _datalist:IStkDrugResponseModel[]=[];
  classes:PharmaClass[]=[];
  mappedDataList:Partial<IStkDrugResponseModel>[]=[];
  cols:ITbColModel[]=[];
  constructor(private _service:DrugsService) {  
    this.subscription.push(
      _service.pagingService.paginator.subscribe(_pg=>{
      this.pg=_pg;
    }));
    this.subscription.push(
      _service.drugs.subscribe(_data=>{
      this._datalist=_data;
      this.mappedDataList=_data.map(e=>({
        ...e
      }))
    }));
     this.subscription.push(this._service.loaderService.isLoading.subscribe(e=>{
      this.loading=e;
    }));
    this.classes=this._service.classList;
    this.onRefresh();
  }
  private _getCols():ITbColModel[]{
   return [
    {name:'اسم المنتج',cols:1,propName:'name',classList:'notArabicFont'},
    {name:'السعر',cols:1,propName:'price'},
    {name:'الخصم',cols:1,propName:'discount',template:this.discountDisplay},
    {name:'التحكم',cols:1,propName:null,display:true},
  ];
  }
  onPageSelected(pageNumber:number){
    this._service.getPageOfDrugs({pageNumber});
  }
  onRefresh(){
    this._service.getPageOfDrugs({});
  }
  onPageSizeSelected(pageSize:number){
    this._service.getPageOfDrugs({pageNumber:1,pageSize});
  }
  ngOnDestroy(): void {
   this.subscription.forEach(e=>e.unsubscribe());
  }
  onSearchInpChange(text:string){
      text=text ?text.trim():'';
      this._service.getPageOfDrugs(null,{s:text});
  }
  ngAfterViewInit(): void {
    of([]).pipe(delay(0)).subscribe(()=>{
      this.cols=this._getCols();
    });
  }
  onDelete(id:string){
    this._service.deleteDrug(id);
  }
  onDeleteAll(){
    this._service.deleteAllDrugs();
  }
  onDownloadTemplate(){
    BasicUtility.downloadFile(Constants.drugsTemplateFilePath);
  }
  
}
