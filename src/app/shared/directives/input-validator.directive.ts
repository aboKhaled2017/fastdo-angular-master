import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appInputValidator]'
})
export class InputValidatorDirective {
  
  //@Input('appInputValidator') form: FormGroup;
  @Input('appInputValidator') applyValidator: boolean;
  constructor(private inputEl:ElementRef<HTMLInputElement>,private renderer:Renderer2){}
  ngOnInit(): void {
   if(this.applyValidator){
     this.renderer.addClass(this.inputEl.nativeElement,"text-danger");
   }
  }
  private validateForm(){
 
  }
  private traversForm(form:FormGroup){
    Object.values(form.controls).forEach(control=>{
      if(control instanceof FormGroup)this.traversForm(control);
      else{
        console.log(control)
      }
    });
  }
}
