import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MyStoresComponent } from './my-stores/my-stores.component';
import { SharedModule } from '../shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ContractedStoresComponent } from './my-stores/contracted-stores/contracted-stores.component';
import { SearchStoresComponent } from './my-stores/search-stores/search-stores.component';
import { PharmacyStoreGuard } from '../shared/helpers/Guards/pharmacy-stores.guard';
import { RequestedStoresComponent } from './my-stores/requested-stores/requested-stores.component';

@NgModule({
  declarations: [MyStoresComponent, ContractedStoresComponent, SearchStoresComponent,RequestedStoresComponent],
  imports: [
    CommonModule,
    PharmacyRoutingModule,
    ReactiveFormsModule,
    SharedModule,  
    NgbPaginationModule,
  ],
  providers:[PharmacyStoreGuard]
})
export class PharmacyModule { }
