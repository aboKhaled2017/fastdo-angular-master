import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-select-input',
  templateUrl: './custom-select-input.component.html',
  styleUrls: ['./custom-select-input.component.scss']
})
export class CustomSelectInputComponent implements OnInit {
  @Input('control') c:FormControl;
  @Input() placeholder:string;
  @Input('errors') errors:{[key:string]:string}
  @Input() topPlaceholder:string;
  @Input('options') options:{value:string,title:string}[]
  isFocused=false;
  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
