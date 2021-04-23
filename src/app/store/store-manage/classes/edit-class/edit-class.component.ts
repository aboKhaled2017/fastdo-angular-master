import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent  {

  @Input('options') options:{id:string,name:string}[];
  @Output() onSave=new EventEmitter();
  form:FormGroup;
  constructor() { 
    this._initForm();
  }
  private _initForm(){
     this.form=new FormGroup({
      newClass:new FormControl('',[Validators.required])
     });
  }

  onSubmit(){
    this.onSave.emit(this.form.get('newClass').value);
    this.form.reset();
  }

}
