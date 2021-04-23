import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { PharmaClass, StoreUser } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { ModalPopupservice } from 'src/app/shared/services/modal.popup.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { environment } from 'src/environments/environment';

@Injectable()
export class ClassesService {

  classesList=new BehaviorSubject<PharmaClass[]>([]);
  constructor(private http:HttpClient,private authService:AuthService,
              private toastService:ToastService,
              public loaderService:LoaderService,
              public popupService:ModalPopupservice) { 
    this.classesList.next((this.authService.currentUserValue as StoreUser).pharmasClasses);
  }
  addNewClass(className:string){
   this.http.post(`${environment.apiUrl}/stk/phclasses/${className}`,null)
   .subscribe(_data=>{
   this.toastService.showSuccess('تم اضافة التصنيف بنجاح');
   this.authService.updateUserData(_data);
   this.classesList.next((this.authService.currentUserValue as StoreUser).pharmasClasses);
   },(err:IErrorModel)=>{
     this.toastService.showError(err.message);
   })
  }
  removeClass(body:{deletedClassId:string,replaceClassId:string}){
   this.http.request('delete',`${environment.apiUrl}/stk/phclasses/`,{body})
   .subscribe(_data=>{
    this.toastService.showSuccess('تم حذف التصنيف بنجاح');
    this.authService.updateUserData(_data);
    this.classesList.next((this.authService.currentUserValue as StoreUser).pharmasClasses);
   },(err:IErrorModel)=>{
     this.toastService.showError(err.message);
   })
  }
  updateClass(body:{newClass:string,oldClass:string}){
      this.http.put(`${environment.apiUrl}/stk/phclasses/`,body)
      .subscribe(_data=>{
        this.toastService.showSuccess('تم تعديل التصنيف بنجاح');
        this.authService.updateUserData(_data);
        this.classesList.next((this.authService.currentUserValue as StoreUser).pharmasClasses);
      },(err:IErrorModel)=>{
        this.toastService.showError(err.message);
      });
  }
}
