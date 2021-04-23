import { Component, Input, OnInit } from '@angular/core';
import { HTabeModel } from './hTabe.model';

@Component({
  selector: 'app-h-tabe',
  templateUrl: './h-tabe.component.html',
  styleUrls: ['./h-tabe.component.scss']
})
export class HTabeComponent implements OnInit {

  @Input('tabs') tabs:HTabeModel[];
  constructor() { }
  
  ngOnInit(): void {
  }
}
