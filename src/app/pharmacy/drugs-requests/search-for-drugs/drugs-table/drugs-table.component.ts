import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ITbColModel } from 'src/app/shared/components/main-table/models/col.model';
import { DrugsRequestsService } from '../../drugs-requests.service';
import { ISearchedStkDrugResponseModel } from '../../models/searchedStkDrugResponse.model';

@Component({
  selector: 'app-drugs-table',
  templateUrl: './drugs-table.component.html',
  styleUrls: ['./drugs-table.component.scss']
})
export class DrugsTableComponent implements OnInit {

  @Input() drugData:ISearchedStkDrugResponseModel;
  @ViewChild('price_display') price_display:TemplateRef<HTMLElement>;
  @ViewChild('discount_display') discount_display:TemplateRef<HTMLElement>;
  @ViewChild('status_display') status_display:TemplateRef<HTMLElement>;
  @ViewChild('quantity') quantityTemp:TemplateRef<HTMLElement>;
  quantityInpControl=new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)])
  cols:ITbColModel[]=[];
  constructor(public _service:DrugsRequestsService,) { }

  ngOnInit(): void {
  }
  private getCols():ITbColModel[]{
    return [
     {name:'المخزن',cols:1,propName:'stockName',classList:'notArabicFont'},
     {name:'السعر',cols:1,propName:'price',template:this.price_display},
     {name:'الخصم',cols:1,propName:'discount',template:this.discount_display},
     {name:'حالة الانضمام',cols:1,propName:'isJoinedTo',template:this.status_display},
     {name:'',cols:1,propName:null,display:true},
    ];
  }
  
  addToPackage(id:string,stockId:string,stockName:string,price:number,discount:number, quantity:number){
  this._service.popupService.openDeleteModal({
   message: 'الكمية المطلوبة من هذا المنتج',
   okBtntext:'ارسال',
   template:this.quantityTemp,
  })
  .result.then(()=>{
   let q=parseInt(this.quantityInpControl.value);
   if(Number.isInteger(q)){
     this._service.addToCurrentPackage(id,stockId,q,this.drugData.name,stockName,price,discount);
   }
   else{
     this._service.toastService.showError('لقد ادخلت رقم غير صالح');
   }
  })
  .catch(()=>{})
  .finally(()=>{
    this.quantityInpControl.reset();
  });
  }
  isDrugAdded(stockId:string,drugId:string){
    let stk= this._service.currentSelectedPackage.value?.original?.fromStocks.find(e=>e.id==stockId);
    if(stk){
      let drug=stk.drugs.find(d=>d.id==drugId);
      if(drug)return true;
    }
    return false;
  }
  ngAfterViewInit(): void {
    of([]).pipe(delay(0)).subscribe(()=>{
      this.cols=this.getCols()
    });
  }
}
