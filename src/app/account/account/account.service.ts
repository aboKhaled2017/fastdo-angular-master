import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../shared/services/auth.service';
import { tap } from 'rxjs/operators';
import { IEmailEditModel } from '../models/IEmailEdit.model';
import { IPhoneEditModel } from '../models/IPhoneEdit.model';
import { IPasswordEditModel } from '../models/IPasswordEdit.model';
import { IActivateEmailModel } from '../models/IActivateEmail.model';

@Injectable()
export class AccountService {
  constructor(private http:HttpClient,private authService:AuthService) { }
  
  updateEmailRequest(newEmail:string){
    return this.http.get(`${environment.apiUrl}/manage/email?newEmail=${newEmail}`);
  }
  sendCodeToMailAgain(newEmail:string){
    return this.http.get(`${environment.apiUrl}/manage/sendCodeToMailAgain?newEmail=${newEmail}`);
  }
  sendEmailConfirmCodeToMailAgain(email:string){
    return this.http.get(`${environment.apiUrl}/auth/SendMeEmailConfirmCodeAgain?email=${email}`);
  }
  updateEmailWithCode(model:IEmailEditModel){
    return this.http.post(`${environment.apiUrl}/manage/email`,model).pipe(tap(data=>{
      this.authService.updateUserData(data);
    }));
  }
  updatePhone(model:IPhoneEditModel){
    return this.http.post(`${environment.apiUrl}/manage/phone`,model).pipe(tap(data=>{
      this.authService.updateUserData(data);
    }));
  }
  updatePassword(model:IPasswordEditModel){
    return this.http.post(`${environment.apiUrl}/manage/password`,model);
  }
  activateEmail(model:IActivateEmailModel){
    return this.http.post(`${environment.apiUrl}/auth/confirmemail`,model).pipe(tap(data=>{
      this.authService.setUserEmailActivated();
    }));
  }
}
