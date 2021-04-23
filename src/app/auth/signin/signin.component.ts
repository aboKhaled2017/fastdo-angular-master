import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { LoaderService } from '../../shared/services/loader-service.service';
import { CommonFormUtility } from '../../shared/Utilities/form.utility';
import { IErrorModel } from '../../shared/models/Error.model';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    errors = {
      email:[],
      password:[],
      g:undefined
    };
  constructor(private authService: AuthService,
              private router:Router,
              private route:ActivatedRoute,
              private loaderService:LoaderService,
              private formBuilder:FormBuilder) { 
    loaderService.isLoading.subscribe(val=>this.loading=val);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:this.formBuilder.control('', [Validators.required,Validators.email]),
      password: this.formBuilder.control('', Validators.required),
      userType:this.formBuilder.control(null,Validators.required)
  });
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  setErrors(error){
    CommonFormUtility.setErrors(error,this.errors,this.form);
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.authService.login(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            (err:IErrorModel) => {
               if(err.hasValidationError) this.setErrors(err.error);
            });
}
}
