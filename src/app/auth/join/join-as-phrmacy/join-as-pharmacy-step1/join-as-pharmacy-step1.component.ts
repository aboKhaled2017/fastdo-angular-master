import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAreaModel } from 'src/app/shared/models/IAreaModel';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { JoinService } from '../../join.service';
import { BaseJoinAsPharmacyComponent } from '../base.component';
import { JoinAsPharmacyService } from '../join-as-pharmacy.service';

@Component({
  selector: 'app-join-as-pharmacy-step1',
  templateUrl: './join-as-pharmacy-step1.component.html',
  styleUrls: ['./join-as-pharmacy-step1.component.scss']
})
export class JoinAsPharmacyStep1Component extends BaseJoinAsPharmacyComponent{
  cities:IAreaModel[]=[];
  areas:IAreaModel[]=[];
  backgroundLoading=false;
  constructor(public joinService:JoinService,
              public joinAsPharmacyService: JoinAsPharmacyService,
              private loaderService:LoaderService) {
                super(joinService,joinAsPharmacyService);
                this.errors={
                  name:[],
                  mgrName:[],
                  ownerName:[],
                  areaId:[],
                  cityId:[],
                  g:undefined
                };
  }

  ngOnInit(): void {
    this.joinService.getCities().subscribe(cities=>{
      this.cities=cities;
     });
     this.loaderService.isBackgroundLoading.subscribe(val=>{
      this.backgroundLoading=val;
    });
    super.ngOnInit();
  }
  onCitySelected(id:number){
    this.joinService.getAreasOfCityId(id).subscribe(areas=>{ 
      this.areas=areas;
    });
  }
  onNext(){
    if(this.fg.valid)
    {
      this.joinAsPharmacyService.submitStep1(this.fg.value)
      .subscribe(()=>{
        this.joinService.goToNextStep();
      },
      error=>{
        this.setErrors(error);
      });
    }
  }
}
