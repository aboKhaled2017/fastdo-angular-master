import { TemplateRef } from "@angular/core";

export interface ITbColModel{
 name:string 
 cols:number
 propName:string |null
 order?:number
 display?:boolean
 classList?:string
 template?:TemplateRef<HTMLElement>
}