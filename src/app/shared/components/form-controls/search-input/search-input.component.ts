import { Renderer2 } from '@angular/core';
import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from, fromEvent, of, Subject } from 'rxjs';
import { debounceTime, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Output('textChanged') textChanged=new Subject<string>();
  @Input('label') label:string;
  @Input() hasIcon:boolean=true;
  @ViewChild('input') input:ElementRef<HTMLInputElement>;
  @ViewChild('close') closeEl:ElementRef<HTMLElement>;
  @ViewChild('input_wapper') inputWapperEl:ElementRef<HTMLElement>;
  @Input('fc') fc:FormControl=new FormControl('');
  @Input('subject') subject :Subject<string>; 
  @Input('isArabicFont') isArabicFont=false;
  labelInBody=true;
  constructor(private dom:Renderer2) { }

  ngOnInit(): void {console.log(this.isArabicFont)
    if(this.subject){
      this.subject.subscribe(v=>{
        
        
        //this.input.nativeElement.value="";
       // this.fc.setValue(v)
        this.input.nativeElement.value=v;
        this.input.nativeElement.focus();
        this.textChanged.next(v);
      });
    }
  }
  ngAfterViewInit(): void {
    from(['focus','blur','keyup'])
    .pipe(mergeMap(ev=>fromEvent(this.input.nativeElement,ev)))
    .subscribe(ev=>{
      if(ev.type=='focus')this.labelInBody=false;
      else if(ev.type=='blur'){
        if(ev.target['value'])this.labelInBody=false;
        else this.labelInBody=true;
      }
    });

    fromEvent(this.input.nativeElement,'keyup')
    .pipe(debounceTime(500))
    .subscribe(ev=>this._onChange(ev.target['value']));

    fromEvent(this.closeEl.nativeElement,'click').subscribe(()=>{
      this.input.nativeElement['value']='';
      this.labelInBody=true;
      this._onChange('');
    });

    fromEvent(this.inputWapperEl.nativeElement,'click').subscribe(ev=>{
     if(ev.target!=this.closeEl.nativeElement)
     this.input.nativeElement.focus();
    });
  }
  private _onChange(value:string){
    this.textChanged.next(value);
  }
}
