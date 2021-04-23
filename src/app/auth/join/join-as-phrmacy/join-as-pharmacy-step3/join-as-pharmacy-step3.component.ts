import { Component, Input, OnInit } from '@angular/core';
import { JoinService } from '../../join.service';
import { BaseJoinAsPharmacyComponent } from '../base.component';
import { JoinAsPharmacyService } from '../join-as-pharmacy.service';

@Component({
  selector: 'app-join-as-pharmacy-step3',
  templateUrl: './join-as-pharmacy-step3.component.html',
  styleUrls: ['./join-as-pharmacy-step3.component.scss']
})
export class JoinAsPharmacyStep3Component extends BaseJoinAsPharmacyComponent implements OnInit {
  constructor(public joinService:JoinService,public joinAsPharmacyService: JoinAsPharmacyService,) {
    super(joinService,joinAsPharmacyService);
    this.errors={
      persPhone:[],
      linePhone:[],
      address:[],
      g:undefined
    };
   }
  ngOnInit(): void {
    super.ngOnInit();
  }
  onNext(){
    if(this.fg.valid)
    {
      this.joinAsPharmacyService.submitStep3(this.fg.value)
      .subscribe(()=>{
        this.joinService.goToNextStep();
      },
      error=>{
        this.setErrors(error);
      });
    }
  }

}
