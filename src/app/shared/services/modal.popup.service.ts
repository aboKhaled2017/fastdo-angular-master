import { Injectable, TemplateRef } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { ConfirmModalComponent } from "../components/confirm-modal/confirm-modal.component";

@Injectable()
export class ModalPopupservice{
    constructor(private modalService: NgbModal){}
    openDeleteModal(obj:{
        deletedItem?:string,
        deletedType?:string,
        message?:string,
        template?:TemplateRef<any>,
        okBtntext?:string,
        cancelBtnText?:string}) {
        const modelRef= this.modalService.open(ConfirmModalComponent,{
          
        });
         modelRef.componentInstance['deletedType']=obj.deletedType || "الراكد";
        if(obj.deletedItem) modelRef.componentInstance["deletedName"]=obj.deletedItem;
        if(obj.message) modelRef.componentInstance['message']=obj.message;
        if(obj.template) modelRef.componentInstance['template']=obj.template;
        if(obj.okBtntext) modelRef.componentInstance['okBtntext']=obj.okBtntext;
        if(obj.cancelBtnText) modelRef.componentInstance['cancelBtnText']=obj.cancelBtnText;
         return modelRef;
    }
}