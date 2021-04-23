import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ActivatePageService } from '../../services/activatedPage.service';
import { Constants } from '../../constnts';

@Injectable()
export class PharmacyDrugRequestsGuard implements CanActivate{
    constructor(
        private router: Router,private activePageService: ActivatePageService
    ){ }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let defaultPage=this.activePageService.getActivePage(Constants.activePags.pharmacy_DrugsRequests);
    if(!defaultPage){
        defaultPage=`${state.url}/search`;
        this.activePageService.setActivePage(Constants.activePags.pharmacy_DrugsRequests,defaultPage);
    }
    this.router.navigate([defaultPage]);
    return false;
    }
}