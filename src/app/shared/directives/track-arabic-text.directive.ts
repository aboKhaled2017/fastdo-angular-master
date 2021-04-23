import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appTrackArabicText]'
})
export class TrackArabicTextDirective {
  @Input('appTrackArabicText') control:FormControl;
  @Input('appTrackArabicTextFromStart') trackFromStart:boolean;
  constructor(private elRef:ElementRef<HTMLInputElement>,private renderer:Renderer2) {}
  ngOnInit(): void {
    if(!this.control)return;
    if(this.trackFromStart){
      this.renderer.addClass(this.elRef.nativeElement,"notArabicFont");
    }
    this.control.valueChanges.subscribe((val:string)=>{
      if(val && val.length>0){
        this.renderer.addClass(this.elRef.nativeElement,"notArabicFont");
      }
      else{
        this.renderer.removeClass(this.elRef.nativeElement,"notArabicFont");
      }
    });
  }
}
