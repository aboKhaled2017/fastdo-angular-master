import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export declare interface OnDeactivate{
 ngOnDeactivate:(currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot, 
    nextState?: RouterStateSnapshot)=>boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
}

export class ComponentOnDeactivate implements CanDeactivate<OnDeactivate>{
    canDeactivate(component: OnDeactivate, currentRoute: ActivatedRouteSnapshot,
         currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): 
         boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
             if(!component)return true;
         return component.ngOnDeactivate(currentRoute,currentState,nextState);
    }
    
}