import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { IStockClass } from 'src/app/shared/models/StockClass.Model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { ModalPopupservice } from 'src/app/shared/services/modal.popup.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { environment } from 'src/environments/environment';

@Injectable()
export class ClassesService {

  classesList=new BehaviorSubject<IStockClass[]>([]);
  constructor(private http:HttpClient,private authService:AuthService,
              public toastService:ToastService,
              public loaderService:LoaderService,
              public dataService:DataStorageService,
              public popupService:ModalPopupservice) { 
                this.dataService.getAllStockClasses().subscribe(e=>{
                    this.classesList.next(e);
                });
  }
  addNewClass(className:string){
   this.http.post(`${environment.apiUrl}/stk/classes/${className}`,null)
   .subscribe((m:{id:string,stockId:string,className:string})=>{
   this.toastService.showSuccess('تم اضافة التصنيف بنجاح');
   let _classes=this.classesList.value;
   _classes.push({
     id:m.id,
     count:0,
     name:className,
     discount:null
   });
   this.classesList.next(_classes);
   },(err:IErrorModel)=>{
     this.toastService.showError(err.message);
   })
  }

  removeClass(body:{deletedClassId:string,replaceClassId:string}){
   this.http.request('delete',`${environment.apiUrl}/stk/classes`,{body})
   .subscribe(_data=>{
    this.toastService.showSuccess('تم حذف التصنيف بنجاح');
    let _classes=this.classesList.value;
    var deletedClass=_classes.find(e=>e.id==body.deletedClassId);
    if(deletedClass.count>0){
       var replacedClassInd=_classes.findIndex(e=>e.id==body.replaceClassId);
      _classes[replacedClassInd].count=deletedClass.count;
    }
    this.classesList.next(_classes.filter(e=>e.id!=body.deletedClassId));
   },(err:IErrorModel)=>{
     if(!err.hasValidationError)
     this.toastService.showError(err.message);
     else{
       this.toastService.showError(err.error['replaceClassId'] || err.message);
     }
   })
  }

  updateClass(body:{newClass:string,oldClass:string}){
      this.http.put(`${environment.apiUrl}/stk/classes/`,body)
      .subscribe(_data=>{
        this.toastService.showSuccess('تم تعديل التصنيف بنجاح');
        let _classes=this.classesList.value;
        let ind=_classes.findIndex(c=>c.name==body.oldClass);
        if(ind>-1){
          _classes[ind].name=body.newClass;
          this.classesList.next(_classes);
        }
      },(err:IErrorModel)=>{
        if(!err.hasValidationError)
        this.toastService.showError(err.message);
        else{
          this.toastService.showError(err.error['newClass'] || err.message);
        }
      });
  }
  updateClassDiscount(body:{classId:string,discount:number}){
    if(body.discount<1 ||body.discount>100){
      this.toastService.showError('نسبة خصم يحب ان تكون بين 1 الى 100');
      return;
    }
      this.http.put(`${environment.apiUrl}/stk/classes/discount`,body)
      .subscribe(_data=>{
        this.toastService.showSuccess('تم تعديل نسبة الخصم للتصنيف بنجاح');
        let _classes=this.classesList.value;
        let ind=_classes.findIndex(c=>c.id==body.classId);
        if(ind>-1){
          _classes[ind].discount=body.discount;
          this.classesList.next(_classes);
        }
      },(err:IErrorModel)=>{
        if(!err.hasValidationError)
        this.toastService.showError(err.message);
        else{
          this.toastService.showError(err.error['classId'] || err.error['discount'] || err.message);
        }
      });
  }
}
