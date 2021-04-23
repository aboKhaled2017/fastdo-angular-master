import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { ProfileComponent } from '../profile.component';
import { ProfileService } from '../profile.service';
import { IErrorModel } from '../../../shared/models/Error.model';
import { CommonFormUtility } from '../../../shared/Utilities/form.utility';

@Component({
  selector: 'app-profile-contacts',
  templateUrl: './profile-contacts.component.html',
  styleUrls: ['./profile-contacts.component.scss']
})
export class ProfileContactsComponent extends ProfileComponent {

  fg:FormGroup;
  errors={}
  constructor(public profileService:ProfileService,
    public authService:AuthService,
    public loaderService:LoaderService,
    public toastService:ToastService,
    private fb:FormBuilder) { 
    super(profileService,authService,loaderService,toastService);
    this.fg=this.fb.group({
      landlinePhone:this.fb.control(this.currentUser.landlinePhone,[Validators.required,Validators.pattern(/^\d{4,15}$/)]),
      address:this.fb.control(this.currentUser.address)
    })
  }
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
    this.profileService.updateContacts(this.fg.value)
    .subscribe(()=>{
       this.toastService.showSuccess("تم تغيير بيانات التواصل بنجاح");
    },(err:IErrorModel)=>{
     if(err.hasValidationError){
      this.setErrors(err.error);
     }
    }) ;
  }

}
