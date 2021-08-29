import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { IGeneralPagination } from 'src/app/shared/models/IPagination.model';
import { IStockClass } from 'src/app/shared/models/StockClass.Model';
import { IPharmaRequest } from '../../models/IPharmaRequest.model';
import { PharmasRequestsService } from './pharmas-requests.service';

@Component({
  selector: 'app-pharmas-requests',
  templateUrl: './pharmas-requests.component.html',
  styleUrls: ['./pharmas-requests.component.scss'],
  providers:[PharmasRequestsService]
})
export class PharmasRequestsComponent  {

  @ViewChild('selectClass') selectClassInp:ElementRef<HTMLSelectElement>; 
  subscription:Subscription[]=[];
  loading=false;
  pg:IGeneralPagination;
  _datalist:IPharmaRequest[]=[];
   options:IStockClass[]=[];
  mappedDataList:Partial<IPharmaRequest>[]=[];
  constructor(private _service:PharmasRequestsService) { 
    this.subscription.push(
      _service.pagingService.paginator.subscribe(_pg=>{
      this.pg=_pg;
    }));
    this.subscription.push(
      _service.pharmas.subscribe(_data=>{
      this._datalist=_data;
      this.mappedDataList=_data.map(e=>({
        ...e
      }))
    }));
     this.subscription.push(this._service.loaderService.isLoading.subscribe(e=>{
      this.loading=e;
    }));
    this.options=this._service.classList;
    this.onRefresh();
  }
  onPageSelected(pageNumber:number){
    this._service.getPageOfPharmaRequests({pageNumber});
  }
  onRefresh(){
    this._service.getPageOfPharmaRequests({});
  }
  onPageSizeSelected(pageSize:number){
    this._service.getPageOfPharmaRequests({pageNumber:1,pageSize});
  }
  ngOnDestroy(): void {
   this.subscription.forEach(e=>e.unsubscribe());
  }
  onSearchInpChange(text:string){
      text=text ?text.trim():'';
      this._service.getPageOfPharmaRequests(null,{s:text});
  }
  ngAfterViewInit(): void {
   this.subscription.push(fromEvent(this.selectClassInp.nativeElement,'change').subscribe(e=>{
     let val=(e.target as any).value;
     this._service.getPageOfPharmaRequests(null,{pharmaClass:val});
   }));
  }
}
