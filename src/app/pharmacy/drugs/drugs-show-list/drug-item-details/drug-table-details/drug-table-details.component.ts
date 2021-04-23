import { Component, Input, OnInit } from '@angular/core';
import { IDrugModel } from '../../../Models/DrugModel';
import { DrugsService } from '../../../drugs.service';

@Component({
  selector: 'app-drug-table-details',
  templateUrl: './drug-table-details.component.html',
  styleUrls: ['./drug-table-details.component.scss']
})
export class DrugTableDetailsComponent implements OnInit {

  @Input('drug') drug:IDrugModel;
  
  constructor(private drugsService: DrugsService) { }
  get priceType(){
    return this.drugsService.getPriceType(this.drug.priceType);
  }
  get shortDesc(){
    return this.drugsService.get_drugStateFormate(this.drug);
  }
  get consumeType(){
    return this.drugsService.getDrugConsumeStateWithDiscount(this.drug);
  }
  ngOnInit(): void {
  }
}
