import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ITbColModel } from 'src/app/shared/components/main-table/models/col.model';
import { CustomValidators } from 'src/app/shared/helpers/customValidators';
import { IStockClass } from 'src/app/shared/models/StockClass.Model';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { ClassesService } from './classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  providers:[ClassesService]
})
export class ClassesComponent {
  @ViewChild('removeClassTemplate') removeClassTemplate:TemplateRef<HTMLElement>;
  @ViewChild('editClassTemplate') editClassTemplate:TemplateRef<HTMLElement>;
  @ViewChild('editDiscountTemplate') editDiscountTemplate:TemplateRef<HTMLElement>;
  @ViewChild('discount_offer') discount_offerTemplate:TemplateRef<HTMLElement>;
  cols:ITbColModel[]=[];
  loading=false;
  addNewClass=false;
  markedIdAsDeleted:string;
  relplacedClassId:string;
  replaceClassName="";
  pharmaClasses:IStockClass[]=[];
  _pharmaClasses:IStockClass[]=[];
  classNameControl=new FormControl('',[Validators.required]);
  replaceClassNameInpCtrl=new FormControl('',[Validators.required]);
  discountInpCtrl=new FormControl('',[Validators.required]);
  subscriptions:Subscription[]=[];
  _model:NgbModalRef;
  private getCols():ITbColModel[]{
   return [
    {name:'اسم التصنيف',cols:1,propName:'name'},
    {name:'عرض الخصم',cols:1,propName:'discount',template:this.discount_offerTemplate},
    {name:'عدد الصيدليات التابعة لهذا التصنيف',cols:1,propName:'count'},
    {name:'التحكم',cols:1,propName:null,display:true},
  ];
  }
  constructor(private _service:ClassesService,private _loaderService:LoaderService) { 
    this.subscriptions.push(
      this._service.classesList.subscribe(data=>{
        this._pharmaClasses=data;
      this.pharmaClasses=data.map(e=>({
        ...e,
        count:this._getCountOfPharmas(e.count) as any
      }));
      this.addNewClass=false;
    }));
    this.subscriptions.push(this._service.loaderService.isLoading.subscribe(e=>{
      this.loading=e;
    }));
   // this.subscriptions.push(_loaderService.isLoading.subscribe(e=>{this.loading=e}));
  }
  private _getCountOfPharmas(count:number){
    if(count==0)return "لايوجد";
    if(count==1)return 'صيدلية واحدة';
    if(count==2) return 'صيدليتان';
    if(count>2 && count <11) return `${count} صيدليات`;
    return `${count} صيدلية`;
  }
  addNewOrCancel(status:'add'|'cancel'){
  this.addNewClass=(status=='add');
  this.classNameControl.reset();
  }
  getSelectClassDropdown(){
    return this._pharmaClasses.filter(e=>e.id!=this.markedIdAsDeleted);
  }
  save(){
   this._service.addNewClass(this.classNameControl.value);
  }
  onDelete(id:string){
  let _class=this._pharmaClasses.find(e=>e.id==id);

  if(!_class)return;
   let message="هل انت متأكد من حذف هذا التصنيف";
   this.markedIdAsDeleted=_class.id;
   let modalOptions:any={message};
   if(_class.count>0)modalOptions.template=this.removeClassTemplate;
   this._model= this._service.popupService.openDeleteModal({...modalOptions});
   this._model
   .result.then(()=>{
      if(_class.count>0 && !this.relplacedClassId){
       this._service.toastService.showError('اختر التصنيف البديل');
      }
      else{
         this._service.removeClass({
       deletedClassId:_class.id,
       replaceClassId:this.relplacedClassId || ''
     });
     this.markedIdAsDeleted=undefined;
      }
     this.relplacedClassId='';
     
   })
   .catch(()=>{});
  }
  onEdit(id:string){
    let _class=this._pharmaClasses.find(e=>e.id==id);
    if(!_class)return;
    let message="تعديل التصنيف";
    this.markedIdAsDeleted=_class.id;
    let modalOptions:any={message};
    modalOptions.template=this.editClassTemplate;
    this._model= this._service.popupService.openDeleteModal({...modalOptions});
    this._model
    .result.then(_=>{
      let _name=this.replaceClassNameInpCtrl.value;
      if( _name &&  _name !=_class.name){
        this._service.updateClass({
          newClass: _name,
          oldClass:_class.name
        });
        this.replaceClassNameInpCtrl.reset();
        this.markedIdAsDeleted=undefined; 
      }
    })
    .catch(()=>{
      console.log('closed')
    });
  }
  onDiscountEdit(id:string){
    let _class=this._pharmaClasses.find(e=>e.id==id);
    if(!_class)return;
    let message=`تحديد نسبة الخصم للتصنيف (${_class.name})`;
    this.markedIdAsDeleted=_class.id;
    let modalOptions:any={message};
    modalOptions.template=this.editDiscountTemplate;
    this._model= this._service.popupService.openDeleteModal({...modalOptions});
    this._model
    .result.then(_=>{
      let _discountVal=this.discountInpCtrl.value;
      if( _discountVal &&  parseInt(_discountVal)>0 && _discountVal!=_class.discount){
        this._service.updateClassDiscount({
          classId: _class.id,
          discount:_discountVal
        });
        this.discountInpCtrl.reset();
        this.markedIdAsDeleted=undefined; 
      }
    })
    .catch(()=>{
      console.log('closed')
    });
  }
  onSelectedreplacedClass(id:string){
    this.relplacedClassId=id;
  }
  onSaveReplaceName(name:string){
   this.replaceClassName=name;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(e=>e.unsubscribe());
  }
  ngAfterViewInit(): void {
    of([]).pipe(delay(0)).subscribe(()=>{
      this.cols=this.getCols();
    });
  }
}
