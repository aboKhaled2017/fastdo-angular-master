import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageRequestModel } from 'src/app/shared/models/Page.request.model';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { environment } from 'src/environments/environment';
import { IErrorModel } from '../../shared/models/Error.model';
import { ActivatePageService } from '../../shared/services/activatedPage.service';
import { IPharmaPackage, ISelectedPackage } from './models/PharmaPackagesModel';
import { ISearchedStkDrugResponseModel } from './models/searchedStkDrugResponse.model';
import { ModalPopupservice } from '../../shared/services/modal.popup.service';

@Injectable()
export class DrugsRequestsService{


  onFetchData=new Subject<ISearchedStkDrugResponseModel[]>();
  
  currentSelectedPackage=new BehaviorSubject<ISelectedPackage>(null);

  private reqModel=new PageRequestModel({pageSize:2,pageNumber:1});
  constructor(private http:HttpClient,
              private toastService:ToastService,
              public popupService: ModalPopupservice,
              public pgService:PaginatorService,
              public activatePageService:ActivatePageService,
              public loadingService:LoaderService,
              public dataStorageService:DataStorageService) {
  }
  getWhere(props:Partial<PageRequestModel>,type:string){
    if(type=='search') this.getPageOfSearchedStkDrugs(props);
    if(type=="myDrugReqs") this.getPageOfDrugPackages(props);
  }
  private getPageOfSearchedStkDrugs(props:Partial<PageRequestModel>){
    let model=this.reqModel.reBuild(null,props);
    let url=model.getFullUrl('pharmas/stkdrugs');
    this.http.get(url).subscribe(data=>{
      this.onFetchData.next(data as any);
    },(err:IErrorModel)=>{
      this.toastService.showError(err.message);
    })
  }
  onFetchPackages=new BehaviorSubject<IPharmaPackage[]>([]);
  private getPageOfDrugPackages(props:Partial<PageRequestModel>){
    let model=this.reqModel.reBuild(null,props);
    let url=model.getFullUrl('pharmas/stkdrugpackage');
    this.http.get<IPharmaPackage[]>(url)
        .subscribe(data=>{
             this.onFetchPackages.next(data);
        },(err:IErrorModel)=>{
             this.toastService.showError(err.message);
        });
  }

  deletePackage(pckgId:string){
    this.http.delete(`${environment.apiUrl}/pharmas/stkdrugpackage/${pckgId}`)
    .subscribe(()=>{
      this.toastService.showSuccess("لقد تم حذف الطلبية بنجاح");
      this.onFetchPackages.next(this.onFetchPackages.value.filter(e=>e.packageId!=pckgId));
    },
    (err:IErrorModel)=>{
      this.toastService.showError(err.message);
    });
  }
  getPackage(pckgId:string){
   return this.http.get<IPharmaPackage>(`${environment.apiUrl}/pharmas/stkdrugpackage/${pckgId}`)
    .pipe(catchError((err:IErrorModel)=>{
      this.toastService.showError(err.message);
      return of([] as any as IPharmaPackage);
    }));
  }
  savePackageChanges(){
    let pckg=this.currentSelectedPackage.value?.current;
    if(!pckg)return;
    this.http.put(`${environment.apiUrl}/pharmas/stkdrugpackage/${pckg.packageId}`,this.buildPackageJson(pckg))
    .subscribe(()=>{
      this.toastService.showSuccess("لقد تم تعديل الطلبية بنجاح");
      this.currentSelectedPackage.next({
        ...this.currentSelectedPackage.value,
        isChanged:false
      })
    },
    (err:IErrorModel)=>{
      this.toastService.showError(err.message);
    });
  }
  updatePackage(pckg: IPharmaPackage){
   this.currentSelectedPackage.next({
     ...this.currentSelectedPackage.value,
     current:pckg,
     isChanged:true
   });
  }
  setCurrentSelectedPackage(id:string){
    return new Observable(observer=>{
      let currPackg=this.currentSelectedPackage.value;
      if(currPackg){
        if(currPackg.isChanged){
          this.popupService.openDeleteModal({message:'هل تريد اهمال التغيرات على الباكج الحالية'})
          .result.then(()=>{
            this._setCurrentSelectedPackage(id);
            observer.next();
            observer.complete();
          })
          .catch(()=>{
            this.currentSelectedPackage.next(currPackg);
            observer.error();
          })
        }
        else{
          observer.error();
        }
      }
      else{
        this._setCurrentSelectedPackage(id);
        observer.next();
        observer.complete();
      }
    });
  }
  private _setCurrentSelectedPackage(id:string){
    let pckg=this.onFetchPackages.value.find(e=>e.packageId==id);
    this.currentSelectedPackage.next({
      original:pckg,
      isChanged:false,
      current:pckg
    });
  }
  private buildPackageJson(pack:IPharmaPackage){
    return {
      name:pack.name,
      fromStocks:pack.fromStocks.map(s=>({
        stockId:s.id,
        drugsList:s.drugs.map(d=>[d.id,d.quantity])
      }))
    };
  }
}
