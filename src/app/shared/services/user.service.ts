import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUserProfile } from '../models/IUserProfile';

@Injectable()
export class UserService {

  constructor(private http:HttpClient) { }
  getAll() {
    return this.http.get<IUserProfile[]>(`${environment.apiUrl}/users/all`);
  }

  getById(id: number) {
      return this.http.get<IUserProfile>(`${environment.apiUrl}/users/${id}`);
  }
}
