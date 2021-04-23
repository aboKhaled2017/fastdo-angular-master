import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { E_PharmacyRequestStatus } from 'src/app/shared/enums/enums';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { IPageRequestModel, PageRequestModel } from 'src/app/shared/models/Page.request.model';
import { PharmaClass, StoreUser } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { environment } from 'src/environments/environment';
import { IPharmaRequest } from '../../models/IPharmaRequest.model';

@Injectable()
export class PharmasRequestsService {

  reqModel=new PageRequestModel({pageNumber:1,pageSize:2});
  pharmas=new BehaviorSubject<IPharmaRequest[]>([]);
  classList:PharmaClass[]=[];
  constructor(private http:HttpClient,
              private toastService:ToastService,
              public loaderService:LoaderService,
              public pagingService:PaginatorService,
              private authService:AuthService) { 
              this.classList=(this.authService.currentUserValue as StoreUser).pharmasClasses;
  }
  
  getPageOfPharmaRequests(pg:Partial<IPageRequestModel>,props?:any){
    this.reqModel.reBuild(pg,props);
    this.http.get<IPharmaRequest[]>(this.reqModel.getFullUrl(`stk/joinRequests`))
    .subscribe(_data=>{
      this.pharmas.next(_data);
    },(err:IErrorModel)=>{
      this.toastService.showError(err.message);
    })
  }
  updateRequestStatus(id:string,status:E_PharmacyRequestStatus,indexofItem:number){
    let body=[
      {op: "replace", value: true, path: "/Seen"},
      {op: "replace", value: status, path: "/Status"}
    ];
    this.loaderService.skipNextRequest=true;
   return this.http.patch(`${environment.apiUrl}/stk/pharmaReqs/${id}`,body)
    .pipe(
      tap(()=>{
        this.toastService.showSuccess('تم تحديث حالة الطلب');
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
      _item.status=status;
      items[index]=_item;
      this.pharmas.next(items);
     }
  }
}
