import { Component } from "@angular/core";
import { Role } from "../shared/models/Role";
import { User } from "../shared/models/User";
import { AuthService } from "../shared/services/auth.service";
import { LoaderService } from "../shared/services/loader-service.service";
import { ToastService } from "../shared/services/toast.service.";

@Component({
    selector:'app-base-account',
    templateUrl:'./account.base.component.html',
    styleUrls:['./account.base.component.scss']
})
export class BaseAccountComponent{
    active = 'top';
    isLoading=false;
    isPharmacy=true;
    currentUser:User={} as any
    constructor(public authService:AuthService,
                public loaderService:LoaderService,
                public toastService:ToastService) { 
      this.currentUser=this.authService.currentUserValue;
      this.loaderService.isLoading.subscribe(v=>{
          this.isLoading=v
      });
      this.isPharmacy=this.currentUser.role==Role.pharmacy;
    }
    ngOnInit(): void {
    }
}