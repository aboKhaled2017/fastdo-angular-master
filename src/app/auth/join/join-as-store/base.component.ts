import { Component } from "@angular/core";
import { JoinService } from "../join.service";
import { JoinAsStoreService } from "./join-as-store-service";
import { BaseJoinComponent } from '../base.component';

@Component({
    template:''
})
export class BaseJoinAsStoreComponent extends BaseJoinComponent{

    constructor(public joinService:JoinService,
                public joinAsStoreService: JoinAsStoreService){
                  super(joinService);
                }
}