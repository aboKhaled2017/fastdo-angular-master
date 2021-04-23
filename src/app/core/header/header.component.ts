
import { Component} from '@angular/core';
import { UserType } from 'src/app/shared/models/ILogin';
import { Role } from 'src/app/shared/models/Role';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent  {
  public isMenuCollapsed = true;
  public isLogged=false;
  public role:Role;
  constructor(private authService:AuthService){}

 ngOnInit(): void {
   this.authService.currentUser.subscribe(user=>{
     if(!!user){
      this.isLogged=true;
      this.role= user.role;
     }
     else {
      this.isLogged=false;
      this.role=null;
     }
       
   })
 }

 logoutUser(){
   this.authService.logout();
 }
}
