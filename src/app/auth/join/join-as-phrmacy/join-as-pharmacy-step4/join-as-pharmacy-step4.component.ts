import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JoinService } from '../../join.service';
import { BaseJoinAsPharmacyComponent } from '../base.component';
import { JoinAsPharmacyService } from '../join-as-pharmacy.service';

@Component({
  selector: 'app-join-as-pharmacy-step4',
  templateUrl: './join-as-pharmacy-step4.component.html',
  styleUrls: ['./join-as-pharmacy-step4.component.scss']
})
export class JoinAsPharmacyStep4Component extends BaseJoinAsPharmacyComponent{

  @Output('onValid') onValid=new EventEmitter();

  constructor(public joinService:JoinService,public joinAsPharmacyService: JoinAsPharmacyService) {
    super(joinService,joinAsPharmacyService);
    this.errors={
      email:[],
      pasword:[],
      confirmPassword:[],
      g:undefined
    };
    
   }

  ngOnInit(): void {
    super.ngOnInit();
  }
  onNext(){
    if(this.fg.valid)
    {
      this.joinAsPharmacyService.submitStep4(this.fg.value)
      .subscribe(()=>{
        this.onValid.emit();
      },
      error=>{
        this.setErrors(error);
      });
    }
  }

}
