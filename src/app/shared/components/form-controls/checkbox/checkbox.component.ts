import { Component, Input, OnInit } from '@angular/core';
import { BasicUtility } from 'src/app/shared/Utilities/basic.utility';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  id:string;
  @Input() checked=false;
  @Input() label;
  @Input() disabled=false;
  constructor() { 
    this.id=BasicUtility.getUniqueId(4);
  }

  ngOnInit(): void {
  }

}
