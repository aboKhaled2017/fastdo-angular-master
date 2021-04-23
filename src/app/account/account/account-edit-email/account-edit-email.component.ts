import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { AccountComponent } from '../account.component';
import { AccountService } from '../account.service';
import { IErrorModel } from '../../../shared/models/Error.model';

@Component({
  selector: 'app-account-edit-email',
  templateUrl: './account-edit-email.component.html',
  styleUrls: ['./account-edit-email.component.scss']
})
export class AccountEditEmailComponent extends AccountComponent{
  emailVerified=false;
  emailControl:FormControl;
  emailErrorMessage:string[];
  constructor(public accountService:AccountService,
    public authService:AuthService,
    public loaderService:LoaderService,
    public toastService:ToastService) { 
    super(accountService,authService,loaderService,toastService);
    this.emailControl=new FormControl(this.currentUser.email,[Validators.required]);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
  submitEmail(){
    if(this.emailControl.invalid)return;
    this.accountService.updateEmailRequest(this.emailControl.value)
    .subscribe(()=>{
       this.emailVerified=true;
    },(err:IErrorModel)=>{
     if(err.hasValidationError && err.error?.newEmail){
      this.emailErrorMessage=err.error.newEmail;
      this.emailControl.markAsTouched();
      this.emailControl.setErrors({g:true});
     }
    }) ;
  }

}
