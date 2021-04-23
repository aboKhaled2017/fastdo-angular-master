import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactUsService } from './contact-us.service';
import { SharedModule } from '../shared/shared.module';
 
@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([{path:'',component:ContactUsComponent}])
  ],
  exports:[RouterModule],
  providers:[ContactUsService]
})
export class ContactUsModule { }
