import { Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-loading-status',
  templateUrl: './loading-status.component.html',
  styleUrls: ['./loading-status.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LoadingStatusComponent implements OnInit {
  @Input('loading') isLoading:boolean
  @Input() innerClass="";
  constructor(private elementRef:ElementRef<HTMLElement>,private dom:Renderer2) { }

  ngOnInit(): void {
    console.log()
  }
  ngAfterViewInit(): void {
    this.dom.addClass(this.elementRef.nativeElement.parentElement,'loading-wrapper')
  }

}
