import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/helpers/Guards/auth.guard';
import { AlreadySignedGuard } from './shared/helpers/Guards/already-signed.guard';
import { AccountGuard } from './shared/helpers/Guards/account.guard';

const routes: Routes = [
  {path:'', component: HomeComponent,pathMatch:'full'},
  {path:'my',canActivate:[AccountGuard],loadChildren:()=>import('./account/account.module').then(a=>a.AccountModule)},
  {path:'auth',canActivate:[AlreadySignedGuard], loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'pharmacy',canActivate:[AuthGuard] ,data:{roles:["pharmacy"]},loadChildren:()=>import('./pharmacy/pharmacy.module').then(m=>m.PharmacyModule)},
  {path:'store',canActivate:[AuthGuard] ,data:{roles:["store"]},loadChildren:()=>import('./store/store.module').then(m=>m.StoreModule)},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
