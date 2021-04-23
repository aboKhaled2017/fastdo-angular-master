import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrugsRequestsComponent } from './drugs-requests/drugs-requests.component';
import { MyStoresComponent } from './my-stores/my-stores.component';
import { ContractedStoresComponent } from './my-stores/contracted-stores/contracted-stores.component';
import { RequestedStoresComponent } from './my-stores/requested-stores/requested-stores.component';
import { SearchStoresComponent } from './my-stores/search-stores/search-stores.component';
import { PharmacyStoreGuard } from '../shared/helpers/Guards/pharmacy-stores.guard';

const routes:Routes=[
 {path:'',children:[
   {
     path:'mydrugs',
     loadChildren:()=>import('./drugs/drugs.module').then(m=>m.DrugsModule)
   },
   {
    path:'request-drugs-from-stores',
    loadChildren:()=>import('./drugs-requests/pharmacy-drugs-requests.module').then(m=>m.PharmacyDrugsRequestsModule)
   },
   {
     path:'serachdrugs',
     loadChildren:()=>import('./drugs-search/drug-search.module').then(e=>e.DrugSearchModule),
     data:{preload:true}
   },
   {path:'mystores',component:MyStoresComponent,children:[
     {path:'contracted',component:ContractedStoresComponent},
     {path:'requested',component:RequestedStoresComponent},
     {path:'search',component:SearchStoresComponent},
     {path:'',canActivate:[PharmacyStoreGuard]},
   ]},
   {path:'request-drugs-from-stores',component:DrugsRequestsComponent},
 ]}
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class PharmacyRoutingModule { }
