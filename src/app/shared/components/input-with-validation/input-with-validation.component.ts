import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-with-validation',
  templateUrl: './input-with-validation.component.html',
  styleUrls: ['./input-with-validation.component.scss']
})
export class InputWithValidationComponent implements OnInit {

  @Input('type') type='text';
  @Input('isArabicFont') isArabicFont=false;
  @Input('control') c:FormControl;
  @Input() placeholder:string;
  @Input('errors') errors:{[key:string]:string}
  @Input('options') options:{value:string,title:string}[]
  @Input('autofocus') autofocus=false;
  constructor() {}

  ngOnInit(): void {
  }
  dateChanged(){
    this.c.markAsTouched();
  }
  onDateSelect(ev){
    alert()
  }
}
