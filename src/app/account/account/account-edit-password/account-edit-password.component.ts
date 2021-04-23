import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { CommonFormUtility } from 'src/app/shared/Utilities/form.utility';
import { AccountComponent } from '../account.component';
import { AccountService } from '../account.service';
import { CustomValidators } from '../../../shared/helpers/customValidators';

@Component({
  selector: 'app-account-edit-password',
  templateUrl: './account-edit-password.component.html',
  styleUrls: ['./account-edit-password.component.scss']
})
export class AccountEditPasswordComponent extends AccountComponent {

  fg:FormGroup;
  errors={}
  isEmailConfirmed=true;
  constructor(public accountService:AccountService,
    public authService:AuthService,
    public loaderService:LoaderService,
    public toastService:ToastService,
    private fb:FormBuilder) { 
    super(accountService,authService,loaderService,toastService);
    this.fg=this.fb.group({
      oldPassword:this.fb.control('',[Validators.required]),
      newPassword:this.fb.control('',[Validators.required]),
      confirmPassword:this.fb.control('',[Validators.required])
    },
    {
      validators:[CustomValidators.MustMatch('newPassword','confirmPassword')]
    });
    
  }
  get isMailConfirmed(){return this.authService.currentUserValue.emailConfirmed}
  get hasGError(){return this.errors['g']}
  setErrors(error){
    CommonFormUtility.setErrors(error,this.errors,this.fg);
  }
  get f(){
    return this.fg.controls;
  }
  ngOnInit(): void {
    super.ngOnInit();
  }
  submit(){
    if(this.fg.invalid)return;
    this.accountService.updatePassword(this.fg.value)
    .subscribe(()=>{
      this.fg.reset();
       this.toastService.showSuccess("تم تغيير كلمة المرور بنجاح");
    },(err:IErrorModel)=>{
     if(err.hasValidationError){
      this.setErrors(err.error);
     }
    }) ;
  }

}
