 
import { ResetPasswordService } from './reset-password.service';
import { IErrorModel } from '../../shared/models/Error.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers:[ResetPasswordService]
})
export class ForgotPasswordComponent implements OnInit {
  isLoading=false;
  emailControl:FormControl;
  emailErrorMessage:string[];
  emailValidated=false;
  constructor(private resetPassService:ResetPasswordService) {
    this.emailControl=new FormControl('',[Validators.required,Validators.email]);
  }

  ngOnInit(): void {
  }
  submitEmail(){
    if(this.emailControl.invalid)return;
    this.isLoading=true;
    this.resetPassService.checkIfEmailExists({email:this.emailControl.value})
    .subscribe(()=>{
      this.emailValidated=true;
      this.isLoading=false;
    },(err:IErrorModel)=>{
      this.emailValidated=false;
      this.isLoading=false;
     if(err.hasValidationError && err.error?.email){
      this.emailErrorMessage=err.error.email;
      this.emailControl.markAsTouched();
      this.emailControl.setErrors({g:true});
     }
    })
  }
}
