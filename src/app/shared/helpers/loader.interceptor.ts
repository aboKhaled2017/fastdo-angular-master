import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { LoaderService } from '../services/loader-service.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor{
    private requests: HttpRequest<any>[] = [];
    private isBackgroundService=false;
    constructor (private loaderService:LoaderService){}
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(req);
        this.isBackgroundService=req.url.endsWith(`areas/all`);
        if(this.isBackgroundService){
           this.loaderService.isBackgroundLoading.next(true);
        }
        else{
          if(this.loaderService.skipNextRequest) this.loaderService.skipNextRequest=false;
          else {
            this.loaderService.isLoading.next(true);
          }
        }
      
        // We create a new observable which we return instead of the original
        return new Observable(
            observer => {
                // And subscribe to the original observable to ensure the HttpRequest is made
                const subscription = next.handle(req)
                  .subscribe(event => {
                    if (event instanceof HttpResponse) {
                      observer.next(event);
                    }
                  },err => {observer.error(err); },
                  () => {observer.complete(); });
                // return teardown logic in case of cancelled requests
                return () => {
                  this.removeRequest(req);
                  subscription.unsubscribe();
                };
        });
    }
    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
          this.requests.splice(i, 1);
        }
        if(this.isBackgroundService){
          this.loaderService.isBackgroundLoading.next(false);
       }
       else{
       if(this.requests.length==0)
        this.loaderService.isLoading.next(false);
       }
     
    }
    
}