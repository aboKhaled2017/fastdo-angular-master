import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CommonHttpUtility } from 'src/app/shared/Utilities/http.utility';
import { environment } from 'src/environments/environment';
import { DrugRequestModel, IDrugRequestModel } from '../drugs/Models/drugRequest.model';
import { IDrugSearchModel } from '../models/DrugSearchModel';
import { IPharmacyShortDataModel } from '../models/IPharmacyShortData.model';

@Injectable()
export class DrugSearchService {

  loading=new Subject<boolean>();
  lastPageOfData:IDrugSearchModel[]=[];
  onFetchData=new Subject<IDrugSearchModel[]>();
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
}
