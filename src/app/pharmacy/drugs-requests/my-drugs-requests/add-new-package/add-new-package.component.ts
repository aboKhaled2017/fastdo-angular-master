import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalPopupservice } from 'src/app/shared/services/modal.popup.service';
import { DrugsRequestsService } from '../../drugs-requests.service';

@Component({
  selector: 'app-add-new-package',
  templateUrl: './add-new-package.component.html',
  styleUrls: ['./add-new-package.component.scss']
})
export class AddNewPackageComponent {

  @ViewChild('addPackageTemp') addPackageTemp:TemplateRef<HTMLElement>;
  nameInpControl=new FormControl('',[Validators.required]);
  constructor(public _service:DrugsRequestsService,private modalService:ModalPopupservice) { 

  }
  onAddNew(){
    this.modalService.openDeleteModal({
      template:this.addPackageTemp,
      message:"اضافة طلبية جديدة",
      okBtntext:"اضافة"
    }).result.then(()=>{
    if(this.nameInpControl.valid){
      this._service.addNewPackage(this.nameInpControl.value);
      this.nameInpControl.reset();
    }
    else{
      this._service.toastService.showError("من فضلك ادخل اسم صحيح للطلبية");
    }
    })
    .catch(()=>{})
  }

}
