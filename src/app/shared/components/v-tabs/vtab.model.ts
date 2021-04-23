import { TemplateRef } from "@angular/core";

export interface IVTabeModel{
    title:string
    template:TemplateRef<HTMLElement>,
    disabled?:boolean
}