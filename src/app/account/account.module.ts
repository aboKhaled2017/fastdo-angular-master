import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileBasicInfoComponent } from './profile/profile-basic-info/profile-basic-info.component';
import { ProfileContactsComponent } from './profile/profile-contacts/profile-contacts.component';
import { BaseAccountComponent } from './base.component';
import { AccountEditEmailComponent } from './account/account-edit-email/account-edit-email.component';
import { AccountEditPhoneComponent } from './account/account-edit-phone/account-edit-phone.component';
import { AccountEditPasswordComponent } from './account/account-edit-password/account-edit-password.component';
import { AccountConfirmEditEmailComponent } from './account/account-edit-email/account-confirm-edit-email/account-confirm-edit-email.component';
import { AccountConfirmEmailComponent } from './account/account-confirm-email/account-confirm-email.component';



@NgModule({
  declarations: [ProfileComponent,AccountComponent, ProfileBasicInfoComponent, ProfileContactsComponent,BaseAccountComponent, AccountEditEmailComponent, AccountEditPhoneComponent, AccountEditPasswordComponent, AccountConfirmEditEmailComponent, AccountConfirmEmailComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    NgbNavModule
  ],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AccountModule { 
  
}
