import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/models/Role';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../shared/services/auth.service';
import { IProfileContactModel } from '../models/IProfileContact.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class ProfileService {
  private get _urlFPart(){
    return `${environment.apiUrl}/${this.authService.currentUserValue.role==Role.pharmacy?'ph':'stk'}`;
  }
  constructor(private http:HttpClient,private authService:AuthService) { }
  updateName(nameObj:{newName:string}){
    return this.http.patch(`${this._urlFPart}/membership/name`,nameObj).pipe(tap(data=>{
      this.authService.updateUserData(data);
    }));
  }
  updateContacts(contactsData:IProfileContactModel){
    return this.http.patch(`${this._urlFPart}/membership/contacts`,contactsData).pipe(tap(data=>{
      this.authService.updateUserData(data);
    }));
  }
}
