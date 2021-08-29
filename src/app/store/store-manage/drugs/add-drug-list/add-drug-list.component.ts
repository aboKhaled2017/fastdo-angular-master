import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IStockClass } from 'src/app/shared/models/StockClass.Model';
import { DrugsService } from '../drugs.service';

@Component({
  selector: 'app-add-drug-list',
  templateUrl: './add-drug-list.component.html',
  styleUrls: ['./add-drug-list.component.scss']
})
export class AddDrugListComponent  {

  @ViewChild('uploadFileTemp') uploadFileTemp:TemplateRef<HTMLElement>;
  private _modal:NgbModalRef;
  classes:IStockClass[];
  selectedFile:File;
  selectedClassId:string;
  private _btnPlaceHolder="رفع ملف ادوية";
  btnPlaceholder=this._btnPlaceHolder;
  constructor(private _service:DrugsService) { 
     this.classes= this._service.classList;
  }
  onOpenModal(){
  this._modal=this._service.modalService.openDeleteModal({
    message:'رفع ملف تقرير بمنتجات المخزن',
    template:this.uploadFileTemp,
    okBtntext:'ارسال',
  });
  this._modal.result.then(()=>{
    if(this.selectedFile && this.selectedClassId){
      this._service.uploadDrugsFile(this.selectedFile,this.selectedClassId)
      .subscribe(()=>{
       
      });     
    }
    else{
      let message="";
      if(!this.selectedClassId)message="من فضلك اختر نوع التصنيف";
      if(!this.selectedFile)message="من فضلك قم بتحميل ملف البيانات";
      this._service.toastService.showError(message);
    }
   })
   .catch(()=>{})
   .finally(()=>{
        this.selectedClassId=undefined;
        this.selectedFile=undefined;
        this.btnPlaceholder=this._btnPlaceHolder;
   });
  }
   onExcelFileChange(file:File){
    let fileName=file?.name || '';
    this.selectedFile=file;
    this.btnPlaceholder=this._btnPlaceHolder+` (${fileName}) `;
   }
   onSelectClass(id:string){
     this.selectedClassId=id;
   }
}
