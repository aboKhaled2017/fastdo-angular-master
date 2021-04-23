import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class JoinAsPharmacyService {
  constructor(private http:HttpClient){}
  submitStep1(data:any){
    return this.http.post(`${environment.apiUrl}/ph/signup/step1`,data);
  }
  submitStep2(data:any){
    return this.http.post(`${environment.apiUrl}/ph/signup/step2`,data);
  }
  submitStep3(data:any){
    return this.http.post(`${environment.apiUrl}/ph/signup/step3`,data);
  }
  submitStep4(data:any){
    return this.http.post(`${environment.apiUrl}/ph/signup/step4`,data);
  }
}
