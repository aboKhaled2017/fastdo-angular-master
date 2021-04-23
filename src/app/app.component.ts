import { Component } from '@angular/core';
import { ActivationEnd, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { User } from './shared/models/User';
import { AuthService } from './shared/services/auth.service';
import { CancelHttpService } from './shared/services/cancelHttp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;
  loadingLazyLoadedRoute=false;
  constructor(
      private router: Router,
      private cancelHttpReq:CancelHttpService,
      private authenticationService: AuthService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      //on routing lazy loaded components
      this.router.events.subscribe(event => {
        if (event instanceof RouteConfigLoadStart) {
            this.loadingLazyLoadedRoute = true;
        } else if (event instanceof RouteConfigLoadEnd) {
            this.loadingLazyLoadedRoute = false;
        }
        else if (event instanceof NavigationStart) {
          this.cancelHttpReq.cancelPendingRequests()
        }

  /*       if (event instanceof NavigationEnd || 
          event instanceof NavigationCancel ||
          event instanceof NavigationError) {
          console.log(event)
      } */
    });
  }

  get userRole() {
      return  this.currentUser?.role;
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/signin']);
  }
}
