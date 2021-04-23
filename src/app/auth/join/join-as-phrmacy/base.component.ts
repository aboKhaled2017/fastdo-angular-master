import { Component } from "@angular/core";
import { BaseJoinComponent } from "../base.component";
import { JoinService } from "../join.service";
import { JoinAsPharmacyService } from "./join-as-pharmacy.service";

@Component({
    template:''
})
export class BaseJoinAsPharmacyComponent extends BaseJoinComponent{

    constructor(public joinService:JoinService,
                public joinAsPharmacyService: JoinAsPharmacyService){
                  super(joinService);
                }
}