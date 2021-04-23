import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class CustomValidators{
    static match(target: AbstractControl){
        return (control:AbstractControl):ValidationErrors=>{
            if(control.value!=target.value){
                return {
                    match:true
                }
            }
            return null;
        }
    }
    static intNumber(control: AbstractControl){
        if(control.value && !Number.isInteger(parseFloat(control.value))){
            return {
                notNumber:true
            }
        }
        return null;
    }
    static matchToValue(target: any){
        return (control:AbstractControl):ValidationErrors=>{
            if(control.value && control.value!=target){
                return {
                    match:true
                }
            }
            return null;
        }
    }
    static MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
    
            if (matchingControl.errors && !matchingControl.errors.match) {
                // return if another validator has already found an error on the matchingControl
                return;
            }
    
            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ match: true });
            } else {
                matchingControl.setErrors(null);
            }
        
        }
    }
}