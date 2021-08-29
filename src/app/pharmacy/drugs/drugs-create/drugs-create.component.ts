import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../../shared/constnts';
import { LoaderService } from '../../../shared/services/loader-service.service';
import { CommonFormUtility } from '../../../shared/Utilities/form.utility';
import { CustomValidators } from '../../../shared/helpers/customValidators';
import { DrugCreateService } from './drug-create.service';
import { ToastService } from '../../../shared/services/toast.service.';
import { IErrorModel } from '../../../shared/models/Error.model';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DrugsService } from '../drugs.service';
import { bufferTime, debounceTime, delay, first, tap} from 'rxjs/operators';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { BasicUtility } from 'src/app/shared/Utilities/basic.utility';
import { OnDeactivate } from '../../../shared/helpers/component.canDeActivate';
import { ModalPopupservice } from 'src/app/shared/services/modal.popup.service';
import { ActivatePageService } from 'src/app/shared/services/activatedPage.service';

@Component({
  selector: 'app-drugs-create',
  templateUrl: './drugs-create.component.html',
  styleUrls: ['./drugs-create.component.scss'],
  providers:[DrugCreateService]
})
export class DrugsCreateComponent implements OnDeactivate {

  fg:FormGroup;
  allErrors={
    name:{required:'اسم الراكد مطلوب',g:''},
    type:{required:'نوع الراكد مطلوب',g:''},
    quantity:{required:'كمية الراكد مطلوب',g:'',notNumber:'الكمية غير صحيحة'},
    price:{required:'سعر الراكد مطلوب',g:''},
    consumeType:{required:'نوع استهلاك الراكد مطلوب',g:''},
    valideDate:{required:'تاريخ صلاحية الراكد مطلوب',g:''},
    priceType:{required:'نوع سعر الراكد مطلوب',g:''},
    unitType:{required:'نوع وحدة الراكد مطلوب',g:''},
    discount:{required:'نسبة خصم الراكد مطلوب',g:''},
    code:{required:'رقم الباركود مطلوب',g:''},
    desc:{required:'وصف الراكد مطلوب',g:''},
  }
  formChangesSubscription:Subscription=new Subscription();
  drugsTypes=Constants.lists.drugsTypes;
  drugsUnitTypes=Constants.lists.drugsUnits;
  drugsPriceTypes=Constants.lists.drugsPriceTypes;
  drugsConsumeTypes=Constants.lists.drugsConsumeTypes;
  liveText="";
  isEditMode=false;
  isAnyChanges=false;
  get codeControl(){
    return this.fg.get('code');
  }
  get nameControl(){
       return this.fg.get('name');
  }
  get typeControl(){
       return this.fg.get('type');
  }
  private initForm(){
     this.fg=this.fb.group({
      code:this.fb.control('',[Validators.required]),
      name:this.fb.control('',[Validators.required]),
      type:this.fb.control('',[Validators.required]),
      quantity:this.fb.control('',[Validators.required,Validators.pattern(Constants.numberPattern),
        CustomValidators.intNumber]),
      price:this.fb.control('',[
        Validators.required,
        Validators.pattern(Constants.floatNumberPatter)]),
      consumeType:this.fb.control(this.drugsConsumeTypes[0].value,[Validators.required]),
      valideDate:this.fb.control('',[Validators.required]),
      discount:this.fb.control('',[
        Validators.required,
        Validators.pattern(Constants.floatNumberPatter)]),
      priceType:this.fb.control(this.drugsPriceTypes[0].value,[Validators.required]),
      unitType:this.fb.control('',[Validators.required]),
      desc:this.fb.control('',[Validators.required]),
     });
     this.fg.get('consumeType').disable();
  }
  constructor(private fb:FormBuilder,
              public loaderService:LoaderService,
              private toastService:ToastService,
              private drugCreateService:DrugCreateService,
              private drugsService:DrugsService,
              public activepageService: ActivatePageService,
              private route:ActivatedRoute,
              public router:Router,
              private modalService:ModalPopupservice) {
    this.initForm();window['f']=this.fg;
    this.liveText=drugCreateService.get_liveState_for_addDrug({});
    this.fg.valueChanges.subscribe(val=>{
      this.liveText=drugCreateService.get_liveState_for_addDrug(val);
    });
    
    of(true).pipe(delay(0)).subscribe(()=>{
      this.trackRouting();
    });
    activepageService.setActivePage('drugs',router.url);
  }

  cancelEdit(){
   this.router.navigate(['../'],{relativeTo:this.route})
  }

  get f(){
    return this.fg.controls;
  }
  resetForm(){
    this.fg.reset({
      type:'',
      unitType:'',
      consumeType:this.drugsConsumeTypes[0].value,
      priceType:this.drugsPriceTypes[0].value
    });
  }
  submit(){
    if(this.fg.invalid)return;
    let _value=this.fg.getRawValue();
    let _date=_value['valideDate'] as Date;
    _date=new Date(_date['year'],_date['month']-1,_date['day']);
    _value['valideDate']=_date.toISOString();
    (this.isEditMode
        ?this.drugCreateService.updateDrug(_value)
        :this.drugCreateService.addDrug(_value))
    .subscribe(()=>{
      if(this.isEditMode){
        this.toastService.showInfo("تم تعديل الراكد بنجاح");
      }
      else{
        this.resetForm();
        this.toastService.showSuccess("تم اضافة الراكد بنجاح");
      }
      this.isAnyChanges=false;
    },
    (err:IErrorModel)=>{
      if(err.hasValidationError){
        CommonFormUtility.setErrors(err.error,this.allErrors,this.fg,(obj,prop,val)=>{
          obj[prop]['g']=val;
        });
      }
      else{
        this.toastService.showError(err.message);
      }
    });
  }
  trackRouting() {
    let id=this.route.snapshot.paramMap.get('id');
    let task=of(true);
    if(id){
      this.isEditMode=true;
      this.drugsService.updateTabe.next({id:1,props:{text:'تعديل راكد',iconClass:"fa-edit"}})
      task=new Observable(o=>{
        this.drugsService.getDrugById(id).subscribe(drug=>{
          this.fg.addControl('id',this.fb.control(id,[Validators.required]));
          this.fg.addControl('oldName',this.fb.control(drug.name,[Validators.required]));
          this.fg.patchValue({...drug,valideDate:BasicUtility.getDatePickerObjectValue(drug.valideDate)});
          o.next(true);
        },err=>{
          this.router.navigate(['']);
        }); 
      })
    }
    else{
      this.drugsService.updateTabe.next({id:1,props:{text:'اضافة راكد',iconClass:"fa-plus-circle"}})
    }
    task
    .subscribe(()=>{
      this.formChangesSubscription.add(
        this.formChangesSubscription=this.fg.valueChanges
         .pipe(first())
        .subscribe(()=>{
        this.isAnyChanges=true;
      }));
    });
  }
  ngAfterViewInit(): void {
        
  }
  handleOnDetectCodeNumber(){
    let toggleDisable=()=>{

    }
    this.codeControl.valueChanges.pipe(debounceTime(500)).subscribe((v:string)=>{
      if(v&& v.trim()&&v.length>5){
        this.drugCreateService.getMetaDataForThisDrugCode(v).subscribe(d=>{
        if(d.name && d.name.trim()){
          this.nameControl.setValue(d.name);
          this.nameControl.disable();
        }
        else{
           this.nameControl.enable();
        }
        if(d.type && d.type.trim()){
           this.typeControl.setValue(d.type);
           this.typeControl.disable();
        }
        else{
          this.typeControl.enable();
        }
        if(d.hasThisDrug){
         CommonFormUtility.setErrors({code:{g:["هذا الراكد موجود بالفعل"]}},this.allErrors,this.fg);
        }
      },_=>{
          this.nameControl.enable();
           this.typeControl.enable();
      });
      }
      else{
         this.nameControl.enable();
        this.typeControl.enable(); 
      }
    });  
  }
  ngOnInit(): void {
   this.handleScannerDetection();
  this.handleOnDetectCodeNumber();  
  }
  handleScannerDetection(){
    let str = '';
    let timer = null;
    fromEvent(document.body,'keypress').subscribe(e=>{
    
     e.stopPropagation();
     e.cancelBubble=true;
    
     if (e['key'] === 'Enter') {
        clearTimeout(timer);
      }
      else{
          str += e['key'];
      }
     
      if (timer) {
          clearTimeout(timer);
      }
      timer = setTimeout(() => {
         if(str.startsWith('622')){
            this.codeControl.setValue(str);
         }
          str = '';   
      }, 100);
    });
  }
  private resetTab(){
    this.drugsService.updateTabe.next({id:1,props:{text:'اضافة راكد',iconClass:"fa-plus-circle"}})
  }
  ngOnDeactivate(currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot, 
    nextState?: RouterStateSnapshot):boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  {
    let away=()=>{
      if(this.isEditMode)this.resetTab();
    }
    return this.isAnyChanges
    ?new Observable(ob=>{
      this.modalService.openDeleteModal({message:"هل تريد اهمال التغرات الموجود"})
      .result.then(()=>{
         away();
         ob.next(true);
      },()=>{
         ob.next(false);
      })
    })
    :of(true).pipe(tap(()=>away()));
  }
  ngOnDestroy(): void {
    this.formChangesSubscription.unsubscribe();
  }
  
}

