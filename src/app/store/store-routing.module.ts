import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreManageGuard } from '../shared/helpers/Guards/storeManageguard';
import { ClassesComponent } from './store-manage/classes/classes.component';
import { DrugsComponent } from './store-manage/drugs/drugs.component';
import { PharmasRequestsComponent } from './store-manage/pharmas-requests/pharmas-requests.component';
import { PharmasComponent } from './store-manage/pharmas/pharmas.component';
import { StoreManageComponent } from './store-manage/store-manage.component';
import { StoreRequestsDrugsComponent } from './store-requests-drugs/store-requests-drugs.component';

const routes:Routes=[
  {path:'',children:[
    {path:'manage-store',component:StoreManageComponent,children:[
      {path:'drugs',component:DrugsComponent},
      {path:'pharmas',component:PharmasComponent},
      {path:'pharmas-requests',component:PharmasRequestsComponent},
      {path:'classes',component:ClassesComponent},
      {path:'',canActivate:[StoreManageGuard]}
    ]},
    {path:'store-requested-drugs',component:StoreRequestsDrugsComponent}
  ]}
 ]
 
 @NgModule({
   exports: [RouterModule],
   imports: [RouterModule.forChild(routes)]
 })
export class StoreRoutingModule { }
