import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { E_StkDrugPackageRequestStatus } from 'src/app/shared/enums/enums';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { IPageRequestModel } from 'src/app/shared/models/Page.request.model';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { CommonHttpUtility } from 'src/app/shared/Utilities/http.utility';
import { environment } from 'src/environments/environment';
import { IStoreDrugRequestModel } from '../models/storeRequestDrugModel.model';


@Injectable()
export class StoreRequestsDrugsService {

  onLoading=new Subject<boolean>();
  onFetchData=new Subject<IStoreDrugRequestModel[]>();
  constructor(private http:HttpClient,
              public loaderService:LoaderService,
              public paginatorService:PaginatorService,
              public toastService:ToastService) { }

  getPageOfDrugs(req:IPageRequestModel){
  this.onLoading.next(true);
   this.http
   .get<IStoreDrugRequestModel[]>(CommonHttpUtility.constructUrl(`${environment.apiUrl}/stk/drugsReqs`,req))
   .subscribe(data=>{
     this.onLoading.next(false);
   this.onFetchData.next(data);
   },(err:IErrorModel)=>{
      this.onLoading.next(false);
    this.toastService.showError(err.message);
   });
  }

  updateStatus(id:string,status:E_StkDrugPackageRequestStatus){
    this.loaderService.skipNextRequest=true;
    let data=[
      {op:'replace',value:true,path:'/Seen'},
      {op:'replace',value:status,path:'/Status'}
    ];
    return this.http.patch(`${environment.apiUrl}/stk/drugsReqs/${id}`,data);
  }
}

