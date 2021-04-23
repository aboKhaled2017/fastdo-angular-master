import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PharmaClass } from 'src/app/shared/models/User';
import { DrugsService } from '../drugs.service';

@Component({
  selector: 'app-add-drug-list',
  templateUrl: './add-drug-list.component.html',
  styleUrls: ['./add-drug-list.component.scss']
})
export class AddDrugListComponent  {

  @ViewChild('uploadFileTemp') uploadFileTemp:TemplateRef<HTMLElement>;
  private _modal:NgbModalRef;
  classes:PharmaClass[];
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
    alert('ok')
      //this._service.uploadDrugsFile()
   })
   .catch(()=>{});
  }
   onExcelFileChange(file:File){
     console.log(file)
   }
   onSelectClass(id:string){
     console.log(id)
   }
}
