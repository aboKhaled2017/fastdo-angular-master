import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JoinService } from '../../join.service';
import { BaseJoinAsPharmacyComponent } from '../base.component';
import { JoinAsPharmacyService } from '../join-as-pharmacy.service';

@Component({
  selector: 'app-join-as-pharmacy-step2',
  templateUrl: './join-as-pharmacy-step2.component.html',
  styleUrls: ['./join-as-pharmacy-step2.component.scss']
})
export class JoinAsPharmacyStep2Component extends BaseJoinAsPharmacyComponent implements OnInit {
  backgroundLoading=false;
  commerialRegImgUrl="";
  licenseImgUrl="";
  constructor(public joinService:JoinService,
              public joinAsPharmacyService: JoinAsPharmacyService) {
                super(joinService,joinAsPharmacyService);
                this.errors={
                  commerialRegImg:[],
                  licenseImg:[],
                  g:undefined
                };
               }
  ngOnInit(): void {
    super.ngOnInit();
  }
  onNext(){
    if(this.fg.valid)
    {
      const formData = new FormData();
      formData.append('commerialRegImg', this.fg.get('commerialRegImg').value);
      formData.append('licenseImg', this.fg.get('licenseImg').value);
      this.joinAsPharmacyService.submitStep2(formData)
      .subscribe(()=>{
        this.joinService.goToNextStep();
      },
      error=>{
        this.setErrors(error);
      });
    }
  }
  onFileChange(prop,$event){
    if ($event.target.files.length === 0)
    {
      let ctrl=this.fg.get(prop);
      ctrl.reset();
      ctrl.markAsTouched();
      this.fg.updateValueAndValidity();
      this[`${prop}Url`] ="";
      return;
    }
    let file=$event.target.files[0];
    this.fg.patchValue({
      [prop]:file
    });
   this.validateAndSetUrl(prop,$event.target.files);
  }
  private validateAndSetUrl(prop:string,files:File[]){
    let error={};
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      error[prop] = ["Only images are supported."];
      this.setErrors(error);
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this[`${prop}Url`] = reader.result; 
    }
  }
}
