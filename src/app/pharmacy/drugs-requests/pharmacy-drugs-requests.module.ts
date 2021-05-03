import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyDrugRequestsGuard } from 'src/app/shared/helpers/Guards/pharmact.drugs.requests.guard';
import { EditMyDrugRequestComponent } from './edit-my-drug-request/edit-my-drug-request.component';
import { MyDrugsRequestsComponent } from './my-drugs-requests/my-drugs-requests.component';
import { SearchForDrugsComponent } from './search-for-drugs/search-for-drugs.component';
import { SharedModule } from '../../shared/shared.module';
import { PharmacyDrugsRequestsRoutingModule } from './pharmacy-drugs-requests-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DrugsRequestsService } from './drugs-requests.service';
import { DrugsRequestsComponent } from './drugs-requests.component';
import { AddNewPackageComponent } from './my-drugs-requests/add-new-package/add-new-package.component';
import { ManageCurrentPackageComponent } from './search-for-drugs/manage-current-package/manage-current-package.component';
import { DrugsTableComponent } from './search-for-drugs/drugs-table/drugs-table.component';



@NgModule({
  declarations: [DrugsRequestsComponent,SearchForDrugsComponent, MyDrugsRequestsComponent, EditMyDrugRequestComponent, AddNewPackageComponent, ManageCurrentPackageComponent, DrugsTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    PharmacyDrugsRequestsRoutingModule,
    ReactiveFormsModule
  ],
  providers:[PharmacyDrugRequestsGuard,DrugsRequestsService]
})
export class PharmacyDrugsRequestsModule { }
