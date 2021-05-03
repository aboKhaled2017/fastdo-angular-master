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
import { E_drug_requestStatus } from 'src/app/shared/enums/enums';
import { IFromStockDrugPackage } from './models/PharmaDrugpackageResponse.model';

@Injectable()
export class DrugsRequestsService{

  searchDrugsPatternName="pharmas/stkdrugs"
  drugsPackagePatternName="pharmas/stkdrugpackage";
  onFetchData=new Subject<ISearchedStkDrugResponseModel[]>();
  
  currentSelectedPackage=new BehaviorSubject<ISelectedPackage>(null);
  onFetchPackages=new BehaviorSubject<IPharmaPackage[]>([]);
  private reqModel=new PageRequestModel();
  constructor(private http:HttpClient,
              public toastService:ToastService,
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
    this.reqModel.reBuild(null,props);
    let url=this.reqModel.getFullUrl(this.searchDrugsPatternName);
    this.http.get(url).subscribe(data=>{
      this.onFetchData.next(data as any);
    },(err:IErrorModel)=>{
      this.toastService.showError(err.message);
    })
  }
 
  private getPageOfDrugPackages(props:Partial<PageRequestModel>){
    let model=this.reqModel.reBuild(null,props);
    let url=model.getFullUrl(this.drugsPackagePatternName);
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
  addNewPackage(name:string){
    let body={
      name,
      fromStocks:[]
    }
    this.http.post(`${environment.apiUrl}/pharmas/stkdrugpackage`,body)
    .subscribe(()=>{
      this.toastService.showSuccess("لقد تم اضافة الطلبية بنجاح");
     this.getPageOfDrugPackages({});
    },
    (err:IErrorModel)=>{
      let message=err.message;
      if(err.hasValidationError && err.error){
        if(err.error['name'])message=err.error['name'][0];
        if(err.error['g'])message=err.error['g'][0];
      }
      this.toastService.showError(message);
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
          this._setCurrentSelectedPackage(id);
          observer.next();
          observer.complete();
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
  addToCurrentPackage(drugId:string,stockId:string,quantity:number,drugName:string,stockName:string,price:number,discount:number){
    let currentPckg=this.currentSelectedPackage.value;
    if(!currentPckg){
      this.toastService.showError('قم بأختيار طلبية من القائمة');
      return;
    }
    let pckg=currentPckg.current;
    let drug={
       id:drugId,
       name:drugName,
       quantity:quantity,
       price,
       discount
    };
    let stock:IFromStockDrugPackage;
    let stkInd=pckg.fromStocks.findIndex(e=>e.id==stockId);
    if(stkInd>-1){
      stock=pckg.fromStocks.splice(stkInd,1)[0];
    }
    if(stock){
       stock.drugs.push(drug as any);
    }
    else{
   stock={
     id:stockId,
     name:stockName,
     status:E_drug_requestStatus.Pending,
     seen:false,
     drugs:[drug as any]
   } as any;
    }
    pckg.fromStocks.push(stock);
    currentPckg.current=pckg;
    currentPckg.isChanged=true;
    this.currentSelectedPackage.next(currentPckg);
    this.toastService.showSuccess('تم اضافة المنتج الى الطلبية');
  }
}
