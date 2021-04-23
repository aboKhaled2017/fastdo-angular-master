import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { JoinService } from "./join.service";
import { CommonFormUtility } from '../../shared/Utilities/form.utility';
import { IErrorModel, ErrorModel } from '../../shared/models/Error.model';

@Component({
    template:''
})
export class BaseJoinComponent{
    @Input('g') fg:FormGroup;
    @Input('step') currentStep:number;
    errors:{}
    constructor(public joinService:JoinService){}
    setErrors(err:IErrorModel|any){
      if(err instanceof ErrorModel && err.hasValidationError)
        CommonFormUtility.setErrors(err.error,this.errors,this.fg);
      else  CommonFormUtility.setErrors(err,this.errors,this.fg);
    }
    ngOnInit(): void {
        this.joinService.onSummaryErrorSubmitted.subscribe(error=>{
            if(error){
              let _error={};
              Object.keys(this.errors).reduce((prev,val)=>{
              if(error[val])prev[val]=error[val];
              return prev;
            },_error);
            this.setErrors(_error);
            }
        });
    }
    get f(){
      return this.fg.controls;
    }
}