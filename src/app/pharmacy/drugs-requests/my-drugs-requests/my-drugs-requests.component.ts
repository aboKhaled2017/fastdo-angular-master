import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ITbColModel } from 'src/app/shared/components/main-table/models/col.model';
import { E_drug_requestStatus } from 'src/app/shared/enums/enums';
import { BaseDrugsRequestsComponent } from '../base.component';
import { DrugsRequestsService } from '../drugs-requests.service';
import { IPharmaPackage } from '../models/PharmaPackagesModel';
import { ModalPopupservice } from '../../../shared/services/modal.popup.service';

@Component({
  selector: 'app-my-drugs-requests',
  templateUrl: './my-drugs-requests.component.html',
  styleUrls: ['./my-drugs-requests.component.scss']
})
export class MyDrugsRequestsComponent  extends BaseDrugsRequestsComponent{

  type='myDrugReqs'
  
  cols=new Subject<ITbColModel[]>();
  innerCols:ITbColModel[]=[];
  innerOfInnerCols:ITbColModel[]=[];
  datalist:IPharmaPackage[]=[];
  datatable:Partial<IPharmaPackage>[]=[];
  @ViewChild('stock_count_display') stock_count_display:TemplateRef<HTMLElement>;
  @ViewChild('drugs_count_display') drugs_count_display:TemplateRef<HTMLElement>;
  @ViewChild('g_status_display') g_status_display:TemplateRef<HTMLElement>;
  @ViewChild('drug_status_display') drug_status_display:TemplateRef<HTMLElement>;
  @ViewChild('drug_seen_display') drug_seen_display:TemplateRef<HTMLElement>;
  @ViewChild('drug_count_display') drug_count_display:TemplateRef<HTMLElement>;
  @ViewChild('drug_price_display') drug_price_display:TemplateRef<HTMLElement>;
  constructor(public _service:DrugsRequestsService,
    public router:Router,
    private popupservice:ModalPopupservice,
    private route:ActivatedRoute) {
    super(_service,router,"myDrugReqs");
    
    this.onRefresh();
    this.subscription.push(this._service.onFetchPackages.subscribe(pckgs=>{
      this.datatable=pckgs;
      this.datalist=pckgs.map(e=>({
        ...e,
        stkCount:e.fromStocks.length,
        drugsCount:e.fromStocks.reduce((count,item)=>count+item.drugs.length,0),
        status:this.getPackageStatus(e),
        fromStocks:e.fromStocks.map(s=>({
          ...s,
          drugs:s.drugs.map(d=>({
            ...d,
            discount:`${d.discount}%` as any
          })),
          statusObj:this.getStatusText(s.status)
        }))
      }));
    }));
   this.subscription.push(this._service.pgService.paginator.subscribe(_pg=>{
      if(_pg.urlName==this._service.drugsPackagePatternName)
      this.pg=_pg;
    }));
  }
  ngAfterViewInit(): void {
    of([]).pipe(delay(0)).subscribe(()=>{
      this.innerOfInnerCols=this.getInnerOfInnerCols();
      this.innerCols=this.getInnerCols();
      this.cols.next(this.getCols());
    });
  }
  private getPackageStatus(pckg:IPharmaPackage){
    let seen=pckg.fromStocks.some(e=>e.seen);
    if(!seen) return "لم يتم روئية طلبك";
    let allAccepted= pckg.fromStocks.every(e=>e.status==E_drug_requestStatus.Accepted);
    return allAccepted
    ?'لقد تم الموافقة على الطلبية بالكامل'
    :'بعض المخازن لم توافق على الطلب بعد';
  }
  private getCols():ITbColModel[]{
  return [
    {name:'اسم الطلبية',cols:2,propName:'name',classList:'notArabicFont'},
    {name:'تاريخ الطلبية',cols:1,propName:'createdAt',template:null},
    {name:'من عدد مخازن',cols:1,propName:null,template:this.stock_count_display},
    {name:'اجمالى الرواكد',cols:1,propName:null,template:this.drugs_count_display},
    {name:'الحالة العامة',cols:1,propName:null,template:this.g_status_display},
    {name:'',cols:1,propName:null,display:true},
  ];
  }
  private getInnerCols():ITbColModel[]{
    return [
    {name:'اسم المخزن',cols:2,propName:'name'},
    {name:'العنوان',cols:1,propName:'address',template:null},
    {name:'حالة الطلب',cols:1,propName:'statusObj',template:this.drug_status_display},
    {name:'روئية الطلب',cols:1,propName:'seen',template:this.drug_seen_display},
    {name:'اجمالى عدد الرواكد',cols:1,propName:'drugs',template:this.drug_count_display},
    ];
  }
  private getInnerOfInnerCols():ITbColModel[]{
    return [
    {name:'الراكد',cols:1,propName:'name'},
    {name:'السعر',cols:1,propName:'price',template:this.drug_price_display},
    {name:'الخصم',cols:1,propName:'discount'},
    {name:'الكمية',cols:1,propName:'quantity'}
    ];
  }
  ngOnInit(): void {
  }
  onSearchDrugChange(text:string){
    text=text?text.trim() :'';
    this._service.getWhere({s:text},this.type);
  }
  onDelete(id:string){
    this.popupservice.openDeleteModal({
      message:'هل انت متأكد من حذف هذه الطلبية'
    }).result.then(()=>{
      this._service.deletePackage(id);
    }).catch(()=>{});
  }
  onEdit(id){
    this._service.setCurrentSelectedPackage(id)
    .subscribe(()=>{
      this.router.navigate(['../edit'],{relativeTo:this.route});
    },()=>{

    });
   
  }
  private getStatusText(status:E_drug_requestStatus){
    let obj={text:"",cls:"",message:undefined};
    switch(status){
      case E_drug_requestStatus.Accepted :{
        obj.text="تم قبول طلبك";
        obj.cls="badge-success";
        break;
      }
      case E_drug_requestStatus.AcceptedForAnotherOne :{
        obj.text="للاسف تم حجز الطلب لصيدلية اخرى";
        obj.cls="badge-danger";
        break;
      }
      case E_drug_requestStatus.AtNegotioation :{
        obj.text="مازال فى حالة تفاوض";
        obj.cls="badge-warning";
        break;
      }
      case E_drug_requestStatus.Completed :{
        obj.text="اكتمل طلبك";
        obj.cls="badge-info";
        break;
      }
      case E_drug_requestStatus.Rejected :{
        obj.text="تم رفض طلبك";
        obj.cls="badge-danger";
        break;
      }
      default:{
        obj.text="لم يتم الرد على طلبك حتى الان";
        obj.cls="badge-secondary";
        break;
      }
    }
   return obj;
  }
}
