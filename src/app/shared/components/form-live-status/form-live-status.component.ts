import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-live-status',
  templateUrl: './form-live-status.component.html',
  styleUrls: ['./form-live-status.component.scss']
})
export class FormLiveStatusComponent implements OnInit {

  @Input('form') form:FormGroup;
  @Input('props') props:string[]
  controls:FormControl[]=[];
  constructor() { }

  ngOnInit(): void {
    for(let prop in this.form.controls){
      this.controls.push(this.form.get(prop) as FormControl)
    }
  }

}
