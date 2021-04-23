import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CancelHttpService } from '../services/cancelHttp.service';

@Injectable()
export class CancelHttpInterceptor implements HttpInterceptor{
    constructor(private httpCancelService: CancelHttpService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
              .pipe(takeUntil(this.httpCancelService.onCancelPendingRequests()))
    }

}