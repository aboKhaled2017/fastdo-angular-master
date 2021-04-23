import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { AccountService } from '../../account.service';
import { LoaderService } from '../../../../shared/services/loader-service.service';
import { tap } from 'rxjs/operators';
import { IErrorModel } from 'src/app/shared/models/Error.model';
import { CustomValidators } from '../../../../shared/helpers/customValidators';

@Component({
  selector: 'app-account-confirm-edit-email',
  templateUrl: './account-confirm-edit-email.component.html',
  styleUrls: ['./account-confirm-edit-email.component.scss']
})
export class AccountConfirmEditEmailComponent{
  @Output() onSuccess=new EventEmitter();
  @Input('newEmail') _newEmail:string;
  errors={
    newEmail:[],
    code:[],
    g:undefined
  }
  form:FormGroup;
  loading=false;
  sendingMailAgain=false;
  constructor(private accountService: AccountService,
              private fb:FormBuilder,
              private loaderService: LoaderService,
              private toastService: ToastService) { 
  }
  setErrors(error){
    for(let prop in error){
      this.errors[prop]=error[prop];
      let ctrl=this.form.get(prop);
      if(ctrl){
        ctrl.markAsTouched();
        ctrl.setErrors({
          g:true
        });
      }
    }
  }
  ngOnInit(): void {
    this.form=this.fb.group({
      newEmail:this.fb.control('',[Validators.required,Validators.email,CustomValidators.matchToValue(this._newEmail)]),
      code:this.fb.control('',Validators.required)
    });
    this.loaderService.isLoading.subscribe(e=>this.loading=e);
  }
  get f(){
    return this.form.controls;
  }
  onSubmit(){
    if(this.form.invalid)return;
    this.accountService.updateEmailWithCode(this.form.value).subscribe(()=>{
      this.form.reset();
      this.toastService.showSuccess("تم تغيير كلمة البريد الالكترونى بنجاح");
      this.onSuccess.emit();
    },(error:IErrorModel)=>{
      console.log(error)
      if(error.hasValidationError){
      this.setErrors(error.error);
      }
      else {
        this.toastService.showInfo('لقد فشلت عملية التعديل');
        this.onSuccess.emit();
      }
    });
  }
  sendAgain(){
    this.sendingMailAgain=true;
    this.accountService.sendCodeToMailAgain(this._newEmail)  
    .subscribe(()=>{
       this.toastService.showInfo("لقد ارسلناالكودالى بريدك الالكترونى مرة اخرى");
       this.sendingMailAgain=false;
    },error=>{
      this.toastService.showError("حدثت مشكلة اثناء محاولة ارسال الكود");
      this.sendingMailAgain=false;
    });
  }
}
