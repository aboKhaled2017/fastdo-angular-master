import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageRequestModel } from 'src/app/shared/models/Page.request.model';
import { IPharmacySearchStkResponseModel } from './models/IPharmacy.stk.search.model';
import { ToastService } from '../../shared/services/toast.service.';
import { IErrorModel } from '../../shared/models/Error.model';
import { E_PharmacyStoreComponentType } from './models/enums';
import { PaginatorService } from '../../shared/services/paginator.service';
import { LoaderService } from '../../shared/services/loader-service.service';
import { environment } from 'src/environments/environment';
import { ActivatePageService } from '../../shared/services/activatedPage.service';

@Injectable()
export class MyStoresService<TResponseModel>{

  private _onFetchData=new Subject<TResponseModel[]>();
  get onFetchData(){
    return this._onFetchData.asObservable();
  }
  private reqModel=new PageRequestModel({pageSize:2,pageNumber:1});
  getWhere(props:Partial<PageRequestModel>,componentType:E_PharmacyStoreComponentType){
    if(componentType==E_PharmacyStoreComponentType.contracted)
    this.getPageOfContractedStore(this.reqModel.reBuild(null,props));
    else if(componentType==E_PharmacyStoreComponentType.requested)
    this.getPageOfRequestedStore(this.reqModel.reBuild(null,props));
    else if(componentType==E_PharmacyStoreComponentType.searched)
    this.getPageOfSearchedStore(this.reqModel.reBuild(null,props));
  }
  constructor(private http:HttpClient,
              private toastService:ToastService,
              public pgService:PaginatorService,
              public loadingService:LoaderService,
              public activepageService:ActivatePageService) {
  }
  private getPageOfSearchedStore(req:PageRequestModel){
     this.http
    .get<IPharmacySearchStkResponseModel[]>(req.getFullUrl('pharmas/searchStks'))
    .pipe(take(3))
    .subscribe(data=>{
         this._onFetchData.next(data as any as TResponseModel[]);
    },(err:IErrorModel)=>{
      this.toastService.showError(err.message);
    });
  }
  private getPageOfContractedStore(req:PageRequestModel){
    this.http
   .get<IPharmacySearchStkResponseModel[]>(req.getFullUrl('pharmas/joinedStks'))
   .pipe(take(3))
   .subscribe(data=>{
        this._onFetchData.next(data as any as TResponseModel[]);
   },(err:IErrorModel)=>{
     this.toastService.showError(err.message);
   });
  }
  private getPageOfRequestedStore(req:PageRequestModel){
    this.http
   .get<IPharmacySearchStkResponseModel[]>(req.getFullUrl('pharmas/sentReqsStks'))
   .pipe(take(3))
   .subscribe(data=>{
        this._onFetchData.next(data as any as TResponseModel[]);
   },(err:IErrorModel)=>{
     this.toastService.showError(err.message);
   });
  }

  sendRequest(id:string){
     this.http.put(`${environment.apiUrl}/pharmas/stkRequests/${id}`,null)
    .subscribe(()=>{
      this.getPageOfSearchedStore(this.reqModel);
      this.toastService.showSuccess("تم ارسال طلبك بنجاح");
    },(err:IErrorModel)=>{
      this.toastService.showError(err.message);
    })
  }
  cancelContract(id:string){
    let afterCancel=new Subject<boolean>();
    this.http.delete(`${environment.apiUrl}/pharmas/stkRequests/${id}`)
   .subscribe(()=>{
     afterCancel.next(true);
     this.toastService.showSuccess("تم ارسال الغاء طلب تعاقدك بنجاح");
   },(err:IErrorModel)=>{
     this.toastService.showError(err.message);
   });
   return afterCancel;
 }
}
