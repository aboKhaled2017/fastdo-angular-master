import { Component} from '@angular/core';
import { IAreaModel } from 'src/app/shared/models/IAreaModel';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { JoinService } from '../../join.service';
import { JoinAsStoreService } from '../join-as-store-service';
import { BaseJoinAsStoreComponent } from '../base.component';

@Component({
  selector: 'app-join-as-store-step1',
  templateUrl: './join-as-store-step1.component.html',
  styleUrls: ['./join-as-store-step1.component.scss']
})
export class JoinAsStoreStep1Component extends BaseJoinAsStoreComponent {
  cities:IAreaModel[]=[];
  areas:IAreaModel[]=[];
  backgroundLoading=false;
  constructor(public joinService:JoinService,
              public joinAsStoreService: JoinAsStoreService,
              private loaderService:LoaderService) {
                super(joinService,joinAsStoreService);
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
      this.joinAsStoreService.submitStep1(this.fg.value)
      .subscribe(()=>{
        this.joinService.goToNextStep();
      },
      error=>{
        this.setErrors(error);
      });
    }
  }
}
