import { Component } from '@angular/core';
import { JoinService } from '../../join.service';
import { JoinAsStoreService } from '../join-as-store-service';
import { BaseJoinAsStoreComponent } from '../base.component';

@Component({
  selector: 'app-join-as-store-step2',
  templateUrl: './join-as-store-step2.component.html',
  styleUrls: ['./join-as-store-step2.component.scss']
})
export class JoinAsStoreStep2Component extends BaseJoinAsStoreComponent{
  backgroundLoading=false;
  commerialRegImgUrl="";
  licenseImgUrl="";
  constructor(public joinService:JoinService,
              public joinAsStoreService: JoinAsStoreService,) { 
                super(joinService,joinAsStoreService);
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
      this.joinAsStoreService.submitStep2(formData)
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
