import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../shared/helpers/Jwt.Interceptor';
import { ErrorInterceptor } from '../shared/helpers/error-interceptor';
import { CoreComponent } from './core.component';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicesSectionComponent } from './home/services-section/services-section.component';
import { LoaderService } from '../shared/services/loader-service.service';
import { LoaderInterceptor } from '../shared/helpers/loader.interceptor';
import { ToastService } from '../shared/services/toast.service.';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/helpers/Guards/auth.guard';
import { AlreadySignedGuard } from '../shared/helpers/Guards/already-signed.guard';
import { DataStorageService } from '../shared/services/data-storage.service';
import { ToastComponent } from './toast/toast.component';
import { AccountGuard } from '../shared/helpers/Guards/account.guard';
import { ActivateEmailComponent } from '../shared/components/activate-email/activate-email.component';
import { PaginatorService } from '../shared/services/paginator.service';
import { PaginatorInterceptor } from '../shared/helpers/paginator.Interceptor';
import { ComponentOnDeactivate } from '../shared/helpers/component.canDeActivate';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent, PageNotFoundComponent,
     CoreComponent, ServicesSectionComponent,ToastComponent,ActivateEmailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CoreRoutingModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbToastModule,
    SharedModule
  ],
  providers:[
    AuthService,
    AuthGuard,
    AccountGuard,
    AlreadySignedGuard,
    UserService,
    LoaderService,
    PaginatorService,
    ToastService,
    DataStorageService,
    ComponentOnDeactivate,
    {provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:PaginatorInterceptor,multi:true}
  ],
  exports:[
    CoreComponent,ToastComponent
  ]
})
export class CoreModule { }
