import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[loadingStatus]'
})
export class LoadingStatusDirective {
  @Input('loadingStatus') isLoading:boolean;
  constructor(private elRef:ElementRef<HTMLInputElement>,private renderer:Renderer2) {}
  ngOnInit(): void {
    this.renderer.addClass(this.elRef.nativeElement,'loading-data-status position-relative');
    //let el=this.renderer.
    //this.renderer.appendChild(this.elRef.nativeElement,)
    if(this.isLoading){
      this.renderer.addClass(this.elRef.nativeElement,'loading-data-status');
    }
    else{
      this.renderer.removeClass(this.elRef.nativeElement,'loading-data-status');
    }
  }
}
