import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ActivatePageService } from '../../services/activatedPage.service';

@Injectable()
export class DrugGuard implements CanActivate{
    constructor(
        private router: Router,private activePageService: ActivatePageService
    ){ }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let defaultPage=this.activePageService.getActivePage('drugs');
    if(!defaultPage){
        defaultPage=`${state.url}/list`;
        this.activePageService.setActivePage('drugs',defaultPage);
    }
    this.router.navigate([defaultPage]);
    return false;
    }
}