import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentOnDeactivate } from 'src/app/shared/helpers/component.canDeActivate';
import { DrugGuard } from 'src/app/shared/helpers/Guards/drugs.guard';
import { DrugsCreateComponent } from './drugs-create/drugs-create.component';
import { DrugsExchWeReceivedComponent } from './drugs-exch-we-received/drugs-exch-we-received.component';
import { DrugsExchWeRequestedComponent } from './drugs-exch-we-requested/drugs-exch-we-requested.component';
import { DrugsListWeRequestedComponent } from './drugs-list-we-requested/drugs-list-we-requested.component';
import { DrugsReqsListWeRecievedComponent } from './drugs-reqs-list-we-recieved/drugs-reqs-list-we-recieved.component';
import { DrugsShowListComponent } from './drugs-show-list/drugs-show-list.component';
import { DrugsComponent } from './drugs.component';

 
 
const routes:Routes=[
  {path:'',component:DrugsComponent, children:[
    {path:'edit/:id',component:DrugsCreateComponent,canDeactivate:[ComponentOnDeactivate]},
    {path:'edit',component:DrugsCreateComponent}, //should be handled here for deactivate
    
    {path:'list',component:DrugsShowListComponent},
    {path:'we-requested',component:DrugsListWeRequestedComponent},
    {path:'we-recieved',component:DrugsReqsListWeRecievedComponent},
    {path:'exh-we-recieved',component:DrugsExchWeReceivedComponent},
     {path:'exh-we-requested',component:DrugsExchWeRequestedComponent},
    {path:'',canActivate:[DrugGuard]},
  ]}
 ]
 
 @NgModule({
   exports: [RouterModule],
   imports: [RouterModule.forChild(routes)]
 })
export class DrugsRoutingModule { }
