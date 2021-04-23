import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service.';
import { BasicUtility } from 'src/app/shared/Utilities/basic.utility';

@Component({
  selector: 'app-file-upload-btn',
  templateUrl: './file-upload-btn.component.html',
  styleUrls: ['./file-upload-btn.component.scss']
})
export class FileUploadBtnComponent {

  @Input() btnClass:string;
  @Input() text:string;
  @Input() accept:string;
  @Input() errorMess:string='الملف الذى رفعته غير صحيح';
  @Input() disabled=false;
  @Output() onChange=new EventEmitter<File>();
  constructor(private toastService:ToastService) {

  }
  onFileSelect(input: HTMLInputElement): void {
    const file = input.files[0];
    if(file && file.size && file.size>0){
     if(this.validateExtension(file)){
       this.onChange.emit(file);
     }
    }
    else{
      this.onChange.emit(undefined);
    }
  }
 private validateExtension(file:File){
  //let ext=BasicUtility.getDateStringFromDateObjectStr(name);
  if(!this.accept.split(',').includes(file.type)){
    this.toastService.showError(this.errorMess);
    return false;
  }
  return true;
 }
}
