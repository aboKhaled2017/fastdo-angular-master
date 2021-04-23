import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from 'src/app/shared/models/User';
import { LoaderService } from '../../../shared/services/loader-service.service';
import { ToastService } from '../../../shared/services/toast.service.';
import { Role } from 'src/app/shared/models/Role';
import { ProfileComponent } from '../profile.component';
import { IErrorModel } from '../../../shared/models/Error.model';

@Component({
  selector: 'app-profile-basic-info',
  templateUrl: './profile-basic-info.component.html',
  styleUrls: ['./profile-basic-info.component.scss']
})
export class ProfileBasicInfoComponent  extends ProfileComponent {
  
  nameControl:FormControl;
  nameErrorMessage:string[];
  constructor(public profileService:ProfileService,
    public authService:AuthService,
    public loaderService:LoaderService,
    public toastService:ToastService) { 
    super(profileService,authService,loaderService,toastService);
    this.nameControl=new FormControl(this.currentUser.name,[Validators.required]);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
  submit(){
    if(this.nameControl.invalid)return;
    this.profileService.updateName({newName:this.nameControl.value})
    .subscribe(()=>{
       this.toastService.showSuccess("تم تغيير الاسم بنجاح");
    },(err:IErrorModel)=>{
      const _errMess=(err.hasValidationError && err.error?.newName)
      ?err.error.newName :err.message;
      this.nameErrorMessage=_errMess;
      this.nameControl.markAsTouched();
      this.nameControl.setErrors({g:true});
    }) ;
  }

}
