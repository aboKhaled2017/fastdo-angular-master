import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ResetPasswordService {

  constructor(private http:HttpClient) { }
  checkIfEmailExists(emailObj:{email:string}){
    return this.http.post(`${environment.apiUrl}/auth/ForgotPassword`,emailObj);
  }
  resetPassword(data:any){
    return this.http.post(`${environment.apiUrl}/auth/ResetPassword`,data);
  }
}
