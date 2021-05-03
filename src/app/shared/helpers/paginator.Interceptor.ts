import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginatorService } from '../services/paginator.service';

@Injectable()
export class PaginatorInterceptor implements HttpInterceptor{
    constructor(private paginatorService: PaginatorService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return new Observable(
            observer => {
                // And subscribe to the original observable to ensure the HttpRequest is made
                const subscription = next.handle(req)
                  .subscribe(
                  event => {                  
                    if (event instanceof HttpResponse) {
                        if(event.headers.has('X-Pagination')){
                          var paginatorObj=event.headers.get('X-Pagination');
                          if(paginatorObj)
                          {
                            let sInd=req.url.indexOf('/api/');
                            let ind=req.url.indexOf('?');
                            this.paginatorService.paginator.next({
                              ...JSON.parse(paginatorObj),
                              urlName:req.url.substring(sInd>-1?sInd+5:0,ind>-1?ind:req.url.length)
                            });
                          }
                        }
                      observer.next(event);
                    }
                  },
                  err => {observer.error(err); },
                  () => { observer.complete(); });
                // return teardown logic in case of cancelled requests
                return () => {
                  subscription.unsubscribe();
                };
              });
    }

}