import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http'
import { Observable,of,throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CommonUtilityService } from '../services/commonUtility.service';
import { ErrorModel } from '../models/Error.model';
import { ToastService } from '../services/toast.service.';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService,
              private uilityService: CommonUtilityService,
              private toastService:ToastService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err:HttpErrorResponse)=> {
      if(err.status==200) return of(new HttpResponse({status:200}));

      if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this.authService.logout();
          location.reload(true);
      }
      
      else if(err['error']['errors']){
         return throwError(new ErrorModel(err,this.uilityService));
      }
      else if(err.status==500 || err.status==0){
       this.toastService.showError(err.message)
      }
      /* if(err.error.errors || err.error?.status==400){
        return throwError(err.error.errors
          ?this.uilityService.convertObjPropsToCamleCseString(err.error.errors)
          :err);
      }
      if(err.error.status==404){

      } */
      //const error = err.error.message || err.statusText;
      return throwError(new ErrorModel(err,this.uilityService));
  }))
  }
}
