import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.scss']
})
export class EditDiscountComponent  {

  @Input('discountInpCtrl') discountInpCtrl:FormControl;
  form:FormGroup;
  constructor() { 
  }

  ngAfterViewInit(): void {
    of([]).pipe(delay(0)).subscribe(()=>{
      this.form=new FormGroup({
      discount:this.discountInpCtrl
     });
    })
  }
}
