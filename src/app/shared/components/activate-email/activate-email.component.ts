import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activate-email',
  templateUrl: './activate-email.component.html',
  styleUrls: ['./activate-email.component.scss']
})
export class ActivateEmailComponent implements OnInit {
  email:string;
  isEmailConfirmed:boolean=true;
  constructor(private authService:AuthService) { 
    authService.currentUser.subscribe(user=>{
      if(user){
        this.isEmailConfirmed=user.emailConfirmed;
        this.email=user.email;
      }
      else{
        this.isEmailConfirmed=true;
      }
    })
  }
 
  ngOnInit(): void {
  }

}
