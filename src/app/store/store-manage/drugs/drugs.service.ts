import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { IPageRequestModel, PageRequestModel } from 'src/app/shared/models/Page.request.model';
import { IStockClass } from 'src/app/shared/models/StockClass.Model';
import {StoreUser } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { ModalPopupservice } from 'src/app/shared/services/modal.popup.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { environment } from 'src/environments/environment';
import { IStkDrugResponseModel } from '../../models/IStockDrugResponse.model';

@Injectable()
export class DrugsService {

  reqModel=new PageRequestModel({pageNumber:1,pageSize:2});
  drugs=new BehaviorSubject<IStkDrugResponseModel[]>([]);
  classList:IStockClass[]=[];
  constructor(private http:HttpClient,
              public toastService:ToastService,
              public loaderService:LoaderService,
              public pagingService:PaginatorService,
              private dataService:DataStorageService,
              public modalService:ModalPopupservice) { 
                this.dataService.getAllStockClasses().subscribe(d=>{
                  this.classList=d;
                });
  }
  
  getPageOfDrugs(pg:Partial<IPageRequestModel>,props?:any){
    this.reqModel.reBuild(pg,props);
    this.http.get<IStkDrugResponseModel[]>(this.reqModel.getFullUrl(`stk/prods`))
    .subscribe(_data=>{
      this.drugs.next(_data.map(e=>({
        ...e,
        discount:this.mapDiscountToObj(e.discount as any)
      })));
    },(err:IErrorModel)=>{
      this.toastService.showError(err.message);
    })
  }
  deleteDrug(id:string){
  
  this.modalService.openDeleteModal({message:'هل انت متأكد من حذف هذا الراكد'})
    .result.then(()=>{
        this.http.delete(`${environment.apiUrl}/stk/prods/${id}`)
        .pipe(
          tap(()=>{
            this.toastService.showSuccess('تم حذف المنتج بنجاح');
            this.getPageOfDrugs({});
        }),
        catchError((err:IErrorModel)=>{
          this.toastService.showError(err.message);
          return of([]);
        })).subscribe();
    })
    .catch(()=>{});
  }
  deleteAllDrugs(){
    this.modalService.openDeleteModal({message:'هل انت متأكد من حف جميع منتجات المخزن'})
    .result.then(()=>{
        this.http.delete(`${environment.apiUrl}/stk/prods`)
        .pipe(
          tap(()=>{
            this.toastService.showSuccess('تم حذف جميع المنتجات بنجاح');
             this.getPageOfDrugs({});
        }),
        catchError((err:IErrorModel)=>{
          this.toastService.showError(err.message);
          return of([]);
        })).subscribe();
    })
    .catch(()=>{});
  }
  uploadDrugsFile(file:File,classId:string){
  let data=new FormData();
  data.append('colNameOrder','0');
  data.append('colPriceOrder','1');
  data.append('colDiscountOrder','2');
  data.append('forClassId',classId);
  data.append('Sheet',file);
  return this.http.put(`${environment.apiUrl}/stk/prods`,data).pipe(tap(()=>{
    this.getPageOfDrugs({});
    this.toastService.showSuccess('تم رفع المنتجات بنجاح');
  }),catchError((err:IErrorModel)=>{
    console.log(err)
   if(err.hasValidationError){
     let message=err.error['sheet']
     ?err.error['sheet'][0]
     :err.error['g'][0]
    this.toastService.showError(message)
   }
   else{
    this.toastService.showError(err.message)
   }
    return of([]);
  }));
  }
  private getClassName(classId:string,classList:IStockClass[]){
    return classList.find(e=>e.id==classId.toLowerCase())?.name ||'Not Unkown';
  }
  private mapDiscountToObj(obj:any):[string,number][]{
   let arr= (JSON.parse(obj) as {Item1:string,Item2:number}[]);
   return arr.map(e=>[this.getClassName(e.Item1,this.classList),e.Item2]) ;
  }
  private removeDrugFormList(id:string){
    let _items=this.drugs.value;
    let ind=_items.findIndex(e=>e.id==id);
    if(ind>-1){
      _items.splice(ind,1);
      this.drugs.next(_items);
      let pg=this.pagingService.paginator.value;
      this.pagingService.paginator.next({
        ...pg,
        totalCount:pg.totalCount-1,
      })
    }
  }
  
}
