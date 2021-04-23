import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  isLogged=false;
  entityName:string;
 constructor(private authService:AuthService){}

 ngOnInit(): void {
   this.authService.currentUser.subscribe(val=>{
     if(!!val){
      this.isLogged=true;
      this.entityName=val.name;
     }
     else this.isLogged=false;
   })
 }
}
