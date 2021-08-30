import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {  Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CommonHttpUtility } from 'src/app/shared/Utilities/http.utility';
import { environment } from 'src/environments/environment';
import { DrugRequestModel, IDrugRequestModel } from '../drugs/Models/drugRequest.model';
import { IDrugSearchModel } from '../models/DrugSearchModel';

@Injectable()
export class DrugSearchService {

  loading=new Subject<boolean>();
  lastPageOfData:IDrugSearchModel[]=[];
  onFetchData=new Subject<IDrugSearchModel[]>();
  selectedPharmacy=new BehaviorSubject<{pharmacyId,pharmacyName}>(null);
  selectedDrugsToExchange=new BehaviorSubject<string[]>([]);
  private reqModel=new DrugRequestModel({pageSize:20});
  getWhere(props:Partial<DrugRequestModel>){
    this.getPage(this.reqModel.reBuild(null,props));
  }
  constructor(private http:HttpClient) {
  }
  private getPage(req:IDrugRequestModel){
    this.loading.next(true);
    this.http
    .get<IDrugSearchModel[]>(CommonHttpUtility.constructUrl(`${environment.apiUrl}/lzdrug/search`,req))
    .pipe(take(3),tap(data=>{this.lastPageOfData=data}))
    .subscribe(data=>{
         this.onFetchData.next(data);
         this.loading.next(false);
    },err=>{this.loading.next(false);});
  }
  makeRequest(id:string,type:'purchase'|'cancel'){
    return type=='purchase'
        ? this.http.post(`${environment.apiUrl}/phrdrgrequests/${id}`,null)
        : this.http.delete(`${environment.apiUrl}/phrdrgrequests/made/${id}`);
  }
  switchDrugFromSelectedDrugsList(id:string){
    var ids=this.selectedDrugsToExchange.value;
    if(ids.some(e=>e==id))ids=ids.filter(e=>e!=id);
    else ids.push(id);
    this.selectedDrugsToExchange.next(ids);
  }
  ExecuteExchange(){
    let pharmaId=this.selectedPharmacy.value;
    if(!pharmaId || !pharmaId.pharmacyId){
      alert("قم باختيار صيدلية واحدة للاستبدال");
      return;
    }
    var ids=this.selectedDrugsToExchange.value;
    if(ids.length<1){
      alert("لا يوجد رواكد قمت باختيارها للاستبدال");
      return;
    }
    return this.http.post(`${environment.apiUrl}/LzDrugExchangeRequest`,{lzDrugsIds:ids});
  }
}
