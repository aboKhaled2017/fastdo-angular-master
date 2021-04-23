import { Injectable } from "@angular/core";

@Injectable()
export class CommonUtilityService {

  constructor() { }
   convertStrToCamleCseString(str:string){
   return `${str.charAt(0).toLocaleLowerCase()}${str.slice(1)}`;
  }
  convertObjPropsToCamleCseString(obj){
   const newObj={};
   for(let prop in obj){
    let val=obj[prop];
    newObj[this.convertStrToCamleCseString(prop)]=(typeof(val)=="string")?[val]:val;
   }
   return newObj;
  }
}
