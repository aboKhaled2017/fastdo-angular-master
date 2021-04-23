import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { IPageRequestModel, PageRequestModel } from 'src/app/shared/models/Page.request.model';
import { PharmaClass, StoreUser } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
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
  classList:PharmaClass[]=[];
  constructor(private http:HttpClient,
              private toastService:ToastService,
              public loaderService:LoaderService,
              public pagingService:PaginatorService,
              private authService:AuthService,
              public modalService:ModalPopupservice) { 
              this.classList=(this.authService.currentUserValue as StoreUser).pharmasClasses;
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
  data.append('colNameOrder','1');
  data.append('colPriceOrder','2');
  data.append('colDiscountOrder','2');
  data.append('forClassId',classId);
  data.append('Sheet',file);
  this.http.put(`${environment.apiUrl}/stk/prods`,data)
  }
  private getClassName(classId:string,classList:PharmaClass[]){
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
