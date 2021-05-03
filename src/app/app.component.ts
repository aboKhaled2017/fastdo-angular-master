import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { ChatAdapter } from 'ng-chat';
import { Subscription } from 'rxjs';
import { TechSupportAdapter } from './shared/components/chat/adapter';
import { User } from './shared/models/User';
import { AuthService } from './shared/services/auth.service';
import { CancelHttpService } from './shared/services/cancelHttp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  
  public adapter: ChatAdapter ;
  currentUser: User;
  loadingLazyLoadedRoute=false;
  subscriptions:Subscription[]=[];
  constructor(
      private router: Router,
      public techSupportChatAdapter:TechSupportAdapter,
      private cancelHttpReq:CancelHttpService,
      private authenticationService: AuthService) {
      this.subscriptions.push(this.authenticationService.currentUser.subscribe(x => this.currentUser = x));

      this.subscriptions.push(this.router.events.subscribe(event => {
        if (event instanceof RouteConfigLoadStart) {
            this.loadingLazyLoadedRoute = true;
        } else if (event instanceof RouteConfigLoadEnd) {
            this.loadingLazyLoadedRoute = false;
        }
        else if (event instanceof NavigationStart) {
          this.cancelHttpReq.cancelPendingRequests()
        }
      }));
    
  }
  get userRole() {
      return  this.currentUser?.role;
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/signin']);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(e=>e.unsubscribe());
  }
}
