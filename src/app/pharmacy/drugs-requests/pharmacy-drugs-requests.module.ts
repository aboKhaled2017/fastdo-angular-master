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



@NgModule({
  declarations: [DrugsRequestsComponent,SearchForDrugsComponent, MyDrugsRequestsComponent, EditMyDrugRequestComponent],
  imports: [
    CommonModule,
    SharedModule,
    PharmacyDrugsRequestsRoutingModule,
    ReactiveFormsModule
  ],
  providers:[PharmacyDrugRequestsGuard,DrugsRequestsService]
})
export class PharmacyDrugsRequestsModule { }
