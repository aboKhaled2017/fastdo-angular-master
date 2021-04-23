import { Component, TemplateRef, ViewChild} from '@angular/core';
import {  ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ITbColModel } from 'src/app/shared/components/main-table/models/col.model';
import { Constants } from 'src/app/shared/constnts';
import { OnDeactivate } from 'src/app/shared/helpers/component.canDeActivate';
import { ActivatePageService } from 'src/app/shared/services/activatedPage.service';
import { DrugsRequestsService } from '../drugs-requests.service';
import { IFromStockDrugPackage } from '../models/PharmaDrugpackageResponse.model';
import { IPharmaPackage } from '../models/PharmaPackagesModel';
import { ModalPopupservice } from '../../../shared/services/modal.popup.service';

@Component({
  selector: 'app-edit-my-drug-request',
  templateUrl: './edit-my-drug-request.component.html',
  styleUrls: ['./edit-my-drug-request.component.scss']
})
export class EditMyDrugRequestComponent implements OnDeactivate {

  cols=new Subject<ITbColModel[]>();
  innerCols:ITbColModel[]=[];
  packageData:IPharmaPackage;
  isChanged=false;
  loading=false;
  datalist:IFromStockDrugPackage[]=[];
  @ViewChild('stock_count_display') stock_count_display:TemplateRef<HTMLElement>;
  constructor(private router:Router,
              activePgService:ActivatePageService,
              public storeService:DrugsRequestsService,
              private popupservice:ModalPopupservice) { 
    activePgService.setActivePage(Constants.activePags.pharmacy_DrugsRequests,router.url);
    this.setCurrentPackage();
    this.storeService.loadingService.isLoading.subscribe(e=>this.loading=e);
  }
  private setCurrentPackage(){
    this.storeService.currentSelectedPackage.subscribe(data=>{
      this.packageData=data?.current;
      if(this.packageData){
        this.mapToDatalist();
        this.isChanged=this.storeService.currentSelectedPackage.value?.isChanged;
      }
    });
  }
  private mapToDatalist(){
    this.datalist=this.packageData.fromStocks.map(s=>({
      ...s,
      drugs:s.drugs.map(d=>({
        ...d,
        price:`${d.price} جنيه` as any,
        discount:`${d.discount}%` as any,
        stockId:s.id
      }))
    }));
  }
  ngAfterViewInit(): void {
    of([]).pipe(delay(0)).subscribe(()=>{
      this.innerCols=this.getInnerCols();
      this.cols.next(this.getCols());
    })
  }
  private getCols():ITbColModel[]{
    return [
      {name:'اسم المخزن',cols:2,propName:'name'},
      {name:'العنوان',cols:1,propName:'address',template:null},
      {name:'اجمالى عدد الرواكد',cols:1,propName:null,template:this.stock_count_display},
      {name:'',cols:1,propName:null,display:true},
    ];
  }
  private getInnerCols():ITbColModel[]{
    return [
    {name:'الراكد',cols:1,propName:'name'},
    {name:'السعر',cols:1,propName:'price'},
    {name:'الخصم',cols:1,propName:'discount'},
    {name:'الكمية',cols:1,propName:'quantity'},
    {name:'',cols:1,propName:null,display:true}
    ];
  }
  onDelete(id:string){
   let stks=this.packageData.fromStocks.filter(s=>s.id!=id);
   this.storeService.updatePackage({...this.packageData,fromStocks:stks});
  }
  deleteDrug(drugId:string,stockId:string){
    let stkInd=this.packageData.fromStocks.findIndex(s=>s.id==stockId);
    let stk=this.packageData.fromStocks[stkInd];
    stk.drugs=stk.drugs.filter(d=>d.id!=drugId);
    let stks=this.packageData.fromStocks;
   stks[stkInd]=stk;
    this.storeService.updatePackage({...this.packageData,fromStocks:stks});
  }
  ngOnDeactivate(currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot, 
    nextState?: RouterStateSnapshot):boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  {
    if(!this.storeService.currentSelectedPackage.value?.isChanged)return true;
    return new Observable(ob=>{
      this.popupservice.openDeleteModal({message:'هل تريد اهمال التغيرات التى فعلتها'})
    .result.then(()=>{
      ob.next(true);
    })
    .catch(()=>{
      ob.next(false);
    })
    })
  }
  saveChanges(){
    this.storeService.savePackageChanges();
  }
}
