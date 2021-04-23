import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {
  @Input('loading') isLoading:boolean;
  @Input('valid') isValid:boolean;
  @Input('text') text:string="ارسال";
  @Input('type') type:string;
  @Output('clicked') clicked=new EventEmitter();
  @Input('classes') cls:string;
  @Input('extra') extraClass:string="";
  @Input('icon') iconClass:string;
  constructor() {}

  ngOnInit(): void {
    this.cls=(this.cls)
    ?`${this.cls} ${this.extraClass}`
    :`${this.type=='link'?'btn btn-link':'btn btn-primary'} ${this.extraClass}`;
    this.iconClass=(this.iconClass)
    ?`fa ${this.iconClass} mr-2`
    :'fa fa-send mr-2';
  }
  onClick(){
    if(this.type!='submit'){
      this.clicked.emit();
  }
  }
}
