import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreManageComponent } from './store-manage/store-manage.component';
import { StoreRequestsDrugsComponent } from './store-requests-drugs/store-requests-drugs.component';
import { StoreRequestsDrugCardComponent } from './store-requests-drugs/store-requests-drug-card/store-requests-drug-card.component';
import { DrugsComponent } from './store-manage/drugs/drugs.component';
import { PharmasComponent } from './store-manage/pharmas/pharmas.component';
import { PharmasRequestsComponent } from './store-manage/pharmas-requests/pharmas-requests.component';
import { ClassesComponent } from './store-manage/classes/classes.component';
import { StoreManageGuard } from '../shared/helpers/Guards/storeManageguard';
import { EditClassComponent } from './store-manage/classes/edit-class/edit-class.component';
import { PharmaRequestCardComponent } from './store-manage/pharmas-requests/pharma-request-card/pharma-request-card.component';
import { PharmaCardComponent } from './store-manage/pharmas/pharma-card/pharma-card.component';
import { AddDrugListComponent } from './store-manage/drugs/add-drug-list/add-drug-list.component';
import { EditDiscountComponent } from './store-manage/classes/edit-discount/edit-discount.component';



@NgModule({
  declarations: [ StoreManageComponent, StoreRequestsDrugsComponent, StoreRequestsDrugCardComponent, DrugsComponent, PharmasComponent, PharmasRequestsComponent, ClassesComponent, EditClassComponent, PharmaRequestCardComponent, PharmaCardComponent, AddDrugListComponent, EditDiscountComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[StoreManageGuard]
})
export class StoreModule { }
