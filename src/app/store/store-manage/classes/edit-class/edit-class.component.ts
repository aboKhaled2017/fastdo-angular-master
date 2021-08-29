import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent  {

  @Input('newClassInpCtrl') newClassInpCtrl:FormControl;
  form:FormGroup;
  constructor() { 
  }

  ngAfterViewInit(): void {
    of([]).pipe(delay(0)).subscribe(()=>{
      this.form=new FormGroup({
      newClass:this.newClassInpCtrl
     });
    })
  }
}
