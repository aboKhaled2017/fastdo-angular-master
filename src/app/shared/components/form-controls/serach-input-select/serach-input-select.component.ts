import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {  from, fromEvent } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ISearchMenuInputSelectData } from './models/ISearchMenu.model';

@Component({
  host: {
    '(document:click)': 'onDomClick($event)',
  },
  selector: 'app-serach-input-select',
  templateUrl: './serach-input-select.component.html',
  styleUrls: ['./serach-input-select.component.scss']
})
export class SerachInputSelectComponent implements OnInit {

  @ViewChild('indicator') indicator:ElementRef<HTMLElement>;
  @ViewChild('input') input:ElementRef<HTMLElement>;
  @ViewChild('select_menu') menue:ElementRef<HTMLElement>;
  @ViewChild('input_wapper') inputWapperEl:ElementRef<HTMLElement>;
  selectedItems:ISearchMenuInputSelectData[];
  menuOpened=false;
  isInputFocused=false;
  labelInBody=true;
  @Input('data') data:ISearchMenuInputSelectData[]
  @Input() label:string
  @Output('selectChange') selectChange=new EventEmitter<ISearchMenuInputSelectData[]>();
  constructor(private _eref: ElementRef) { 
  }
  
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    from(['focus','blur','keyup'])
    .pipe(mergeMap(e=>fromEvent(this.input.nativeElement,e)))
    .subscribe(ev=>{
     if(ev.type=='focus'){
        this.labelInBody=false;
     }
     else if(ev.type=='blur'){
      if(ev.target['value'] || this.data.some(e=>e.selected)){
        this.labelInBody=false;
      }
      else{
        this.labelInBody=true;
      }
     }
     else if(ev.type=='keyup'){
      this.menuOpened=true;
      let val=ev.target['value'] || '';
       this.data=this.data
             .map(e=>({...e,notMatched:!(<string>e.value).includes(val)}));
     }
    });

    fromEvent(this.inputWapperEl.nativeElement,'click').subscribe(ev=>{
      this.input.nativeElement.focus();
     });
  }
  onDomClick(event:Event){
    let target=event.target as HTMLElement;
    if(target.classList.contains('remover'))return;
    if(this.menue.nativeElement.contains(target as Node))return;

    if(target==this.indicator.nativeElement || target==this.input.nativeElement){
      this.menuOpened=!this.menuOpened;
    }
    else{
      this.menuOpened=false;
    }
    //if (this._eref.nativeElement.contains(event.target)) // or some similar check
  }
  filterSelected(data:ISearchMenuInputSelectData[]){
    return data.filter(e=>e.selected)
  }
  removeItem(item:ISearchMenuInputSelectData){
    if((item as any)=='all'){
      this.data=this.data.map(el=>({...el,selected:false}));
    }
    else{
      let ind=this.data.findIndex(e=>e.key==item.key);
      if(ind>-1){
        this.data[ind].selected=false;
      }
    }
    this.handleSelectChange();
  }
  toggleItem(index:number){
    this.data[index].selected= !this.data[index].selected;
    this.handleSelectChange();
  }
  handleSelectChange(){
    if(this.data.some(e=>e.selected)){
      this.labelInBody=false;
    }
    else{
      this.labelInBody=true;
    }
    this.selectChange.emit(
      this.data.filter(e=>e.selected)
      );
  }
}
