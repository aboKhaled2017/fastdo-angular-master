import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LoaderService } from '../shared/services/loader-service.service';
import { ContactUsService } from './contact-us.service';
import { ToastService } from '../shared/services/toast.service.';
import { CommonFormUtility } from '../shared/Utilities/form.utility';
import { IErrorModel } from '../shared/models/Error.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  form:FormGroup;
  loading=false;
  errors={
    name:[],
    message:[],
    email:[],
    subject:[]
  }
  public isLoading=false;
  constructor(private fb:FormBuilder,
              private crudService:ContactUsService,
              loaderService: LoaderService,
              private toastService:ToastService) { 
      loaderService.isLoading.subscribe(val=>this.isLoading=val);
  }
  
  ngOnInit(): void {
    this.form=this.fb.group({
     name:this.fb.control('',Validators.pattern(/^[\w ,.'-]+$/i)),
     email:this.fb.control('',[Validators.required,Validators.email]),
     subject:this.fb.control('',Validators.required),
     message:this.fb.control('',Validators.required)
    });
  }
  get f(){
    return this.form.controls
  }
  
  setErrors(error){
    CommonFormUtility.setErrors(error,this.errors,this.form);
  }
  onSubmit(){
    if(this.form.invalid)return;
    this.crudService.addComplain(this.form.value).subscribe(model=>{
        this.form.reset();
        this.toastService.showInfo('تم ابلاغ رسالتك بنجاح', {
          autohide: false,
        });
    },(err:IErrorModel)=>{
      if(err.hasValidationError)this.setErrors(err.error);
    });
  }
  setTestData(){
    this.form.setValue({
      name:'mohamed khaled',
      email:'ahmed@gmail',
      subject:'test complain post',
      message:'this is just my test message'
    });
  }
  
}
