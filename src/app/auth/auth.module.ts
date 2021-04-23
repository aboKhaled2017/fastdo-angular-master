import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinComponent } from './join/join.component';
import { SigninComponent } from './signin/signin.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JoinAsPhrmacyComponent } from './join/join-as-phrmacy/join-as-phrmacy.component';
import { JoinAsStoreComponent } from './join/join-as-store/join-as-store.component';
import { SharedModule } from '../shared/shared.module';
import { JoinAsPharmacyStep1Component } from './join/join-as-phrmacy/join-as-pharmacy-step1/join-as-pharmacy-step1.component';
import { JoinAsPharmacyStep2Component } from './join/join-as-phrmacy/join-as-pharmacy-step2/join-as-pharmacy-step2.component';
import { JoinAsPharmacyStep3Component } from './join/join-as-phrmacy/join-as-pharmacy-step3/join-as-pharmacy-step3.component';
import { JoinAsPharmacyStep4Component } from './join/join-as-phrmacy/join-as-pharmacy-step4/join-as-pharmacy-step4.component';
import { JoinAsStoreStep1Component } from './join/join-as-store/join-as-store-step1/join-as-store-step1.component';
import { JoinAsStoreStep2Component } from './join/join-as-store/join-as-store-step2/join-as-store-step2.component';
import { JoinAsStoreStep3Component } from './join/join-as-store/join-as-store-step3/join-as-store-step3.component';
import { JoinAsStoreStep4Component } from './join/join-as-store/join-as-store-step4/join-as-store-step4.component';
import { SuccessSignupComponent } from './join/success-signup/success-signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';



@NgModule({
  declarations: [
    SigninComponent,
    JoinComponent,
    JoinAsPhrmacyComponent,
    JoinAsStoreComponent,
    JoinAsPharmacyStep1Component,
    JoinAsPharmacyStep2Component,
    JoinAsPharmacyStep3Component,
    JoinAsPharmacyStep4Component,
    JoinAsStoreStep1Component,
    JoinAsStoreStep2Component,
    JoinAsStoreStep3Component,
    JoinAsStoreStep4Component,
    SuccessSignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
