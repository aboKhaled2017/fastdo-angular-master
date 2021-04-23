import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { delay, first } from 'rxjs/operators';
import { CustomValidators } from 'src/app/shared/helpers/customValidators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { JoinService } from '../join.service';
import { JoinAsStoreService } from './join-as-store-service';
import { UserType } from '../../../shared/models/ILogin';

@Component({
  selector: 'app-join-as-store',
  templateUrl: './join-as-store.component.html',
  styleUrls: ['./join-as-store.component.scss'],
  providers:[JoinAsStoreService]
})
export class JoinAsStoreComponent implements OnInit {

  form:FormGroup;
  currentStep:number=0;
  loading=false;
  completed=false;
  returnUrl:string;
  generalError:string;
  constructor(private joinService:JoinService,
              private fb:FormBuilder,
              private authService:AuthService,
              private router:Router,
              private route:ActivatedRoute,
              private loaderService:LoaderService) { }
  private getFormMembershipGroup(){
     return this.fb.group({
       name:this.fb.control('',[Validators.required]),
       mgrName:this.fb.control('',[Validators.required]),
       ownerName:this.fb.control('',[Validators.required]),
       cityId:this.fb.control('',[Validators.required]),
       areaId:this.fb.control('',[Validators.required])
    });
  }
  private getFormIdentityGroup(){
    return this.fb.group({
      commerialRegImg:this.fb.control('',[Validators.required]),
      licenseImg:this.fb.control('',[Validators.required]),
   });
  }
  private getFormContactGroup(){
    return this.fb.group({
      persPhone:this.fb.control('',[Validators.required,Validators.pattern(/^01(1|2|5|0|7)\d{8,8}$/)]),
      linePhone:this.fb.control('',[Validators.required,Validators.pattern(/^\d{4,15}$/)]),
      address:this.fb.control('')
   });
  }
  private getFormAccountGroup(){
    const passwordCtrl=this.fb.control('',[Validators.required]);
    return this.fb.group({
      email:this.fb.control('',[Validators.required,Validators.email]),
      password:passwordCtrl,
      confirmPassword:this.fb.control('',[Validators.required,CustomValidators.match(passwordCtrl)])
   });
  }
  private setErrors(error){
   this.generalError=error['g'];
   this.joinService.onSummaryErrorSubmitted.next(error);
  }
  private setDefaultData(){
    setTimeout(() => {
      this.form.setValue({
       0:{
         name:'ahmed ali',
         mgrName:'walid mohamed',
         ownerName:'samy kamal',
         cityId:1,areaId:5
       },
       1:{
         commerialRegImg:'',
         licenseImg:''
       },
       2:{
         persPhone:'01152565658',
         linePhone:'78787',
         address:''
       },
       3:{email:'a1@gggg.com',password:'AAaa123',confirmPassword:'AAaa123'}
      })
   }, 2000);
  }
  ngOnInit(): void {
    this.joinService.reset();
    this.joinService.currentOperation.next("store");
    this.joinService.currentStep.pipe(delay(0)).subscribe(step=>{
      this.currentStep=step;
    });
    this.joinService.whenStepsCompleted.subscribe(()=>{
      this.completed=true;
    })
    this.form=this.fb.group({
        0:this.getFormMembershipGroup(),
        1:this.getFormIdentityGroup(),
        2:this.getFormContactGroup(),
        3:this.getFormAccountGroup()
    });
    this.loaderService.isLoading.subscribe(val=>{
      this.loading=val;
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   //this.setDefaultData();
  }
  onPrev(){
   this.joinService.goToPrevStep();
  }
  onSubmit(){
    this.authService.signup(this.getFormData(),UserType.Stocker)
        .pipe(first())
        .subscribe(
            authData => {
                this.joinService.goToNextStep();
                setTimeout(() => {
                  this.router.navigate([this.returnUrl]);
                }, 3000);                
            },
            error => {
                alert(JSON.stringify(error))
                this.setErrors(error);
            });
  }
  group(step:string){
    return this.form.get(step.toString())
  }
  private getFormData(){
    let formValue=Object.assign({},...Object.values(this.form.value));
    const formData=new FormData();
    Object.entries(formValue).forEach(el=>{
      //let prop=el[0][0].toUpperCase()+el[0].slice(1)
      formData.append(el[0],el[1] as any);
    });
    return formData;
  }

}
