import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { E_PharmacyRequestStatus } from 'src/app/shared/enums/enums';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { IPageRequestModel, PageRequestModel } from 'src/app/shared/models/Page.request.model';
import { IStockClass } from 'src/app/shared/models/StockClass.Model';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { environment } from 'src/environments/environment';
import { IPharmaResponseModel } from '../../models/IPharmaResponseModel.model';

@Injectable()
export class MyPharmasServiceService {

  reqModel=new PageRequestModel({pageNumber:1,pageSize:2});
  pharmas=new BehaviorSubject<IPharmaResponseModel[]>([]);
  classList:IStockClass[]=[];
  constructor(private http:HttpClient,
              private toastService:ToastService,
              public loaderService:LoaderService,
              public pagingService:PaginatorService,
              private dataService:DataStorageService) { 
                dataService.getAllStockClasses().subscribe(e=>{
                  this.classList=e;
                });
  }
  
  getPageOfPharmaRequests(pg:Partial<IPageRequestModel>,props?:any){
    this.reqModel.reBuild(pg,props);
    this.http.get<IPharmaResponseModel[]>(this.reqModel.getFullUrl(`stk/joinedPharmas`))
    .subscribe(_data=>{
      this.pharmas.next(_data);
    },(err:IErrorModel)=>{
      this.toastService.showError(err.message);
    })
  }
  updateRequestStatus(id:string,status:E_PharmacyRequestStatus,indexofItem:number){
    let body=[
      {op: "replace", value: status, path: "/Status"}
    ];
    this.loaderService.skipNextRequest=true;
   return this.http.patch(`${environment.apiUrl}/stk/pharmaReqs/${id}`,body)
    .pipe(
      tap(()=>{
        let message=status==E_PharmacyRequestStatus.Disabled
        ?'تم تعطيل الصيدلية'
        :status==E_PharmacyRequestStatus.Accepted
           ?'تم تفعيل الصيدلية'
           :'تم الغاء التعاقد مع الصيدلية';
        this.toastService.showSuccess(message);
        this.updateItemInList(indexofItem,status);
    }),
    catchError((err:IErrorModel)=>{
       this.toastService.showError(err.message);
      return of([]);
    }));
  }
  private updateItemInList(index:number,status:E_PharmacyRequestStatus){
    let items=this.pharmas.value;
    let _item=items[index];
     if(_item){
       if(status==E_PharmacyRequestStatus.Rejected){
        items.splice(index,1);
        this.getPageOfPharmaRequests({});
       }
       else{
       _item.status=status;
      items[index]=_item;
       } 
      this.pharmas.next(items);
     }
  }
}
