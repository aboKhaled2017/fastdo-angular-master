import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { ProfileService } from '../../profile/profile.service';
import { AccountComponent } from '../account.component';
import { AccountService } from '../account.service';
import { Constants } from '../../../shared/constnts';

@Component({
  selector: 'app-account-edit-phone',
  templateUrl: './account-edit-phone.component.html',
  styleUrls: ['./account-edit-phone.component.scss']
})
export class AccountEditPhoneComponent extends AccountComponent{

  phoneControl:FormControl;
  phoneErrorMessage:string[];
  constructor(public accountService:AccountService,
    public authService:AuthService,
    public loaderService:LoaderService,
    public toastService:ToastService) { 
    super(accountService,authService,loaderService,toastService);
    this.phoneControl=new FormControl(this.currentUser.persPhone,[Validators.required,Validators.pattern(Constants.phoneRegexPattern)]);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
  submit(){
    if(this.phoneControl.invalid)return;
    this.accountService.updatePhone({newPhone:this.phoneControl.value})
    .subscribe(()=>{
       this.toastService.showSuccess("تم تغيير رقم الهاتف بنجاح");
    },(err:IErrorModel)=>{
      const _errMess=(err.hasValidationError && err.error?.newPhone)
      ?err.error.newPhone :err.message;
      this.phoneErrorMessage=_errMess;
      this.phoneControl.markAsTouched();
      this.phoneControl.setErrors({g:true});
    }) ;
  }

}
