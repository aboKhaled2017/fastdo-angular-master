export class CommonFormUtility {
   public static setErrors(error,errorsObj,form,setAction:(obj:any,prop:string,val:any)=>void=undefined, gErrorProp='g'){
        for(let prop in error){
          let val=error[prop];
          if(!setAction){
            errorsObj[prop]=(typeof(val)=="string")?[val]:val;
          }
          else{
            setAction(errorsObj,prop,typeof(val)=="string"?[val]:val);
          }
          let ctrl=form.get(prop);
          if(ctrl){
            ctrl.markAsTouched();
            ctrl.setErrors({
              [gErrorProp]:true
            });
          }
        }
   }
}