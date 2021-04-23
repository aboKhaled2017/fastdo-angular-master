import { Component, NgModuleRef, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ITbColModel } from 'src/app/shared/components/main-table/models/col.model';
import { PharmaClass, StoreUser } from 'src/app/shared/models/User';
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
  cols:ITbColModel[];
  loading=false;
  addNewClass=false;
  markedIdAsDeleted:string;
  relplacedClassId:string;
  replaceClassName="";
  pharmaClasses:PharmaClass[]=[];
  _pharmaClasses:PharmaClass[]=[];
  classNameControl=new FormControl('',[Validators.required]);
  replaceClassNameControl=new FormControl('',[Validators.required]);
  subscriptions:Subscription[]=[];
  _model:NgbModalRef;
  private getCols():ITbColModel[]{
   return [
    {name:'اسم التصنيف',cols:1,propName:'name'},
    {name:'عدد الصيدليات التابعة لهذا التصنيف',cols:1,propName:'count'},
    {name:'التحكم',cols:1,propName:null,display:true},
  ];
  }
  constructor(private _service:ClassesService) { 
    this.cols=this.getCols();
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
     this._service.removeClass({
       deletedClassId:_class.id,
       replaceClassId:this.relplacedClassId || ''
     });
     this.relplacedClassId='';
     this.markedIdAsDeleted=undefined;
   })
   .catch(()=>{});
  }
  onEdit(id:string){
    let _class=this._pharmaClasses.find(e=>e.id==id);
    if(!_class)return;
    let message="تعديل التصنيف";
    this.markedIdAsDeleted=_class.id;
    let modalOptions:any={message};
    if(_class.count==0) modalOptions.template=this.editClassTemplate;
    this._model= this._service.popupService.openDeleteModal({...modalOptions});
    this._model
    .result.then(newClass=>{
      if(newClass && newClass !=_class.name){
        this._service.updateClass({
          newClass,
          oldClass:_class.name
        });
        this.markedIdAsDeleted=undefined; 
      }
    })
    .catch(()=>{
      alert('closed')
    });
  }
  onSelectedreplacedClass(id:string){
    this.relplacedClassId=id;
  }
  onSaveReplaceName(name:string){
   this.replaceClassName=name;
  }
  onEditSaved(newClass:string){
   this._model.close(newClass);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(e=>e.unsubscribe());
  }
}
