import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentOnDeactivate } from 'src/app/shared/helpers/component.canDeActivate';
import { DrugsRequestsComponent } from './drugs-requests.component';
import { EditMyDrugRequestComponent } from './edit-my-drug-request/edit-my-drug-request.component';
import { SearchForDrugsComponent } from './search-for-drugs/search-for-drugs.component';
import { MyDrugsRequestsComponent } from './my-drugs-requests/my-drugs-requests.component';
import { PharmacyDrugRequestsGuard } from 'src/app/shared/helpers/Guards/pharmact.drugs.requests.guard';


const routes:Routes=[
  {path:'',component:DrugsRequestsComponent, children:[
    
    {path:'edit',component:EditMyDrugRequestComponent,canDeactivate:[ComponentOnDeactivate]},
    {path:'search',component:SearchForDrugsComponent},
    {path:'list',component:MyDrugsRequestsComponent},
    {path:'',canActivate:[PharmacyDrugRequestsGuard]},
  ]}
 ]
 
 @NgModule({
   exports: [RouterModule],
   imports: [RouterModule.forChild(routes)]
 })
export class PharmacyDrugsRequestsRoutingModule { }
