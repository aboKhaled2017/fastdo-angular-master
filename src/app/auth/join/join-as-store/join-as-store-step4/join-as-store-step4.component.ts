import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JoinService } from '../../join.service';
import { JoinAsStoreService } from '../join-as-store-service';
import { BaseJoinAsStoreComponent } from '../base.component';

@Component({
  selector: 'app-join-as-store-step4',
  templateUrl: './join-as-store-step4.component.html',
  styleUrls: ['./join-as-store-step4.component.scss']
})
export class JoinAsStoreStep4Component extends BaseJoinAsStoreComponent{

  @Output('onValid') onValid=new EventEmitter();
  
  constructor(public joinService:JoinService,
              public joinAsStoreService: JoinAsStoreService) {
                super(joinService,joinAsStoreService);
                this.errors = {
                  email:[],
                  pasword:[],
                  confirmPassword:[],
                  g:undefined
                };
  }
  ngOnInit(){
    super.ngOnInit();
  }
  onNext(){
    if(this.fg.valid)
    {
      this.joinAsStoreService.submitStep4(this.fg.value)
      .subscribe(()=>{
        this.onValid.emit();
      },
      error=>{
        this.setErrors(error);
      });
    }
  }
}
