import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Constants } from "../../constnts";
import { ActivatePageService } from '../../services/activatedPage.service';

@Injectable()
export class StoreManageGuard implements CanActivate{
    constructor(
        private router: Router,private activePageService: ActivatePageService
    ){ }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let defaultPage=this.activePageService.getActivePage(Constants.activePags.storeManage);
    if(!defaultPage){
        defaultPage=`${state.url}/drugs`;
        this.activePageService.setActivePage(Constants.activePags.storeManage,defaultPage);
    }
    this.router.navigate([defaultPage]);
    return false;
    }
}