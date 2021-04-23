import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-timeline',
  templateUrl: './vertical-timeline.component.html',
  styleUrls: ['./vertical-timeline.component.scss']
})
export class VerticalTimelineComponent implements OnInit {
  
  steps=[
    "بيانات الهوية",
    "بيانات اثبات الهوية",
    "بيانات التواصل",
    "بيانات الحساب"]
  @Input('current') current (){}
  constructor() { }

  ngOnInit(): void {
  }

}
