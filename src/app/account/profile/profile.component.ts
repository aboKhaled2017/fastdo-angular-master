import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/shared/models/Role';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { BaseAccountComponent } from '../base.component';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss','../account.base.component.scss'],
  providers:[ProfileService]
})
export class ProfileComponent extends BaseAccountComponent {

  constructor(public profileService:ProfileService,
              public authService:AuthService,
              public loaderService:LoaderService,
              public toastService:ToastService) { 
    super(authService,loaderService,toastService);
    this.currentUser=this.authService.currentUserValue;
    this.loaderService.isLoading.subscribe(v=>this.isLoading=v);
    this.isPharmacy=this.currentUser.role==Role.pharmacy;
  }
  ngOnInit(): void {
  }

}
