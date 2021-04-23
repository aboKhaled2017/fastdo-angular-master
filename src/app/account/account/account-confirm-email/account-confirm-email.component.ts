import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { AccountComponent } from '../account.component';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-confirm-email',
  templateUrl: './account-confirm-email.component.html',
  styleUrls: ['./account-confirm-email.component.scss']
})
export class AccountConfirmEmailComponent extends AccountComponent{

  codeControl:FormControl;
  sendingCodeAgain=false;
  codeErrorMessage:string[];
  private _currentEmail:string;
  constructor(public accountService:AccountService,
    public authService:AuthService,
    public loaderService:LoaderService,
    public toastService:ToastService,
    private router:Router) { 
    super(accountService,authService,loaderService,toastService);
    this._currentEmail=this.authService.currentUserValue.email;
    this.codeControl=new FormControl('',[Validators.required]);
  }
  
  ngOnInit(): void {
    super.ngOnInit();
  }
  activate(){
    if(this.codeControl.invalid)return;
    this.accountService.activateEmail({
      code:this.codeControl.value,
      email:this._currentEmail
    })
    .subscribe(()=>{
       this.toastService.showSuccess("تم تفعيل البريد الالكترونى الخاص بك");
       this.router.navigate(['/']);
    },(err:IErrorModel)=>{
      console.log(err)
      const _errMess=(err.hasValidationError && (err.error?.code || err.error?.g))
      ?err.error.code||err.error.g :err.message;
      this.codeErrorMessage=_errMess;
      this.codeControl.markAsTouched();
      this.codeControl.setErrors({g:true});
    }) ;
  }
  sendCodeAgain(){
    this.sendingCodeAgain=true;
    this.loaderService.skipNextRequest=true;
    this.accountService.sendEmailConfirmCodeToMailAgain(this._currentEmail)  
    .subscribe(()=>{
       this.toastService.showInfo("لقد ارسلناالكودالى بريدك الالكترونى مرة اخرى");
       this.sendingCodeAgain=false;
    },error=>{
      this.toastService.showError("حدثت مشكلة اثناء محاولة ارسال الكود");
      this.sendingCodeAgain=false;
    });
  }
}
