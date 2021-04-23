import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { IGeneralPagination } from "src/app/shared/models/IPagination.model";
import { PaginatorService } from "src/app/shared/services/paginator.service";
import { ActivatePageService } from '../../shared/services/activatedPage.service';
import { LoaderService } from '../../shared/services/loader-service.service';
import { DrugRequestModel, IDrugRequestModel } from "./Models/drugRequest.model";

export type DrugFetchFunc<T>=(req: IDrugRequestModel)=>Observable<T[]>;
type DataListMapper<T,V>=(data:T[])=>V[]

@Component({
    selector:'drugs-base-account',
    template:''
})
export class DrugsBaseComponent<TModel>{
     private subscriptions:Subscription[]=[];
     pg:IGeneralPagination;
     datalist:TModel[]=[];
     loading:boolean;
     reqModel:IDrugRequestModel;
     setDataList=(data:TModel[])=>{
        this.datalist=this.datalistMapper
        ?this.datalistMapper(data)
        :data;
    }
    constructor(public activepageService: ActivatePageService,
                public loaderService:LoaderService,
                public paginatorService:PaginatorService,
                public router:Router,
                @Inject('fetchPageFunc') public  fetchPageFunc:DrugFetchFunc<TModel>,
                @Inject('datalistMapper') public datalistMapper?:DataListMapper<TModel,any>) {
                    this.buildRequestModel();
                    activepageService.setActivePage('drugs',router.url);
                    this.subscriptions.push(loaderService.isLoading.subscribe(e=>{
                        this.loading=e
                    }));
                    this.subscriptions.push(this.paginatorService.paginator.subscribe(_pg=>{
                        this.pg=_pg;
                    }));
                    this.onRefresh(); 
                    
    }
    buildRequestModel(){
        this.reqModel=new DrugRequestModel(this.pg);
        /* this.reqModel.addCriteria("status");
        this.reqModel.addCriteria("seen"); */   
    }
    ngOnInit(): void {
    }
    onPageSelected(page){
    this.fetchPageFunc(this.reqModel.reBuild({...this.pg,currentPage:page}))
    .subscribe(this.setDataList);
    }
    onRefresh(){
    this.fetchPageFunc(this.reqModel.reBuild(this.pg))
    .subscribe(this.setDataList);
    }
    onPageSizeSelected(pageSize){
    this.fetchPageFunc(this.reqModel.reBuild({...this.pg,pageSize:pageSize,currentPage:1}))
    .subscribe(this.setDataList);
    }
    ngOnDestroy(): void {
        this.subscriptions.forEach(s=>s.unsubscribe());
    }
}