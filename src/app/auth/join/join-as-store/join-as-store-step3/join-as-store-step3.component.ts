import { Component } from '@angular/core';
import { JoinService } from '../../join.service';
import { JoinAsStoreService } from '../join-as-store-service';
import { BaseJoinAsStoreComponent } from '../base.component';

@Component({
  selector: 'app-join-as-store-step3',
  templateUrl: './join-as-store-step3.component.html',
  styleUrls: ['./join-as-store-step3.component.scss']
})
export class JoinAsStoreStep3Component extends BaseJoinAsStoreComponent {

  constructor(public joinService:JoinService,
              public joinAsStoreService: JoinAsStoreService) {
                super(joinService,joinAsStoreService);
                this.errors = {
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
      this.joinAsStoreService.submitStep3(this.fg.value)
      .subscribe(()=>{
        this.joinService.goToNextStep();
      },
      error=>{
        this.setErrors(error);
      });
    }
  }

}
