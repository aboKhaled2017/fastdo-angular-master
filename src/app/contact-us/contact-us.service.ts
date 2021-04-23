import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactUsModel } from './contact-us.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ContactUsService {
  
  constructor(private http:HttpClient) {}
  
  addComplain(model:ContactUsModel){
   return this.http.post<ContactUsModel>(`${environment.apiUrl}/complains`,model);
  }
}
