import { Injectable } from '@angular/core';

@Injectable()
export class ActivatePageService {
  private readonly pagesLabel:string="activePages";
  constructor() {
  if(!localStorage.getItem(this.pagesLabel)){
     localStorage.setItem(this.pagesLabel,JSON.stringify({}));
  }
  }
  get status(){
    return JSON.parse(localStorage.getItem(this.pagesLabel));
  }
  getActivePage(type:string){
    return this.status[type];
  }
  setActivePage(type:string,value:any){
  let status=this.status;
  status[type]=value;
  localStorage.setItem(this.pagesLabel,JSON.stringify(status));
  }
}
