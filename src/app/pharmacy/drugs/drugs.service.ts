import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDrugRequestModel } from './Models/drugRequest.model';
import { CommonHttpUtility } from '../../shared/Utilities/http.utility';
import { environment } from 'src/environments/environment';
import { IDrugModel } from './Models/DrugModel';
import { E_drug_ConsumeType, E_drug_PriceType } from 'src/app/shared/enums/enums';
import { Constants } from 'src/app/shared/constnts';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HTabeModel } from 'src/app/shared/components/h-tabe/hTabe.model';
import { IRequestedDrugViewModel } from './Models/requestedDrug.viewModel';
import { IReicevedDrugViewModel } from './Models/recievedDrug.viewModel';
import { E_drug_requestStatus } from '../../shared/enums/enums';
import { IHttpPatchBody } from 'src/app/shared/models/IHttpPatchBody';

@Injectable()
export class DrugsService {

  constructor(private http:HttpClient) { }
  private lastPage:IDrugModel[]=[];
  updateTabe=new Subject<{id:number,props:Partial<HTabeModel>}>();
  getPageOfDrugs(req:IDrugRequestModel){
   return this.http
   .get<IDrugModel[]>(CommonHttpUtility.constructUrl(`${environment.apiUrl}/lzdrugs`,req))
   .pipe(tap(data=>{
     this.lastPage=data;
   }));
  }
  getDrugById(id:string):Observable<IDrugModel>{
    let drug=this.lastPage.find(e=>e.id==id);
    if(drug)return of(drug);
    return this.http.get<IDrugModel>(`${environment.apiUrl}/lzdrugs/${id}`);
  }
  deleteDrug(id:string){
    return this.http.delete<void>(`${environment.apiUrl}/lzdrugs/${id}`);
  }
  getPriceType(type:E_drug_PriceType){
    return type==E_drug_PriceType.newP ?'سعر جديد':'سعر قديم';
  }
  get_drugStateFormate(model:IDrugModel){
    const unitTypeName=Constants.lists.drugsUnits.find(v=>v.value==model.unitType)?.title||'';
    return `يوجد لدى عدد ${model.quantity||''} ${unitTypeName} من  ${model.name||''} - ${model.type||''} - بسعر ${model.price||''} جنية لل/${unitTypeName}`
  }
  getDrugConsumeStateWithDiscount(model:IDrugModel){
    return model.consumeType==E_drug_ConsumeType.burning
    ? `بيع/حرق مباشرة بخصم ${model.discount}%`
    :`استبدال`;
  }

  getPageOfMadeRequests(req:IDrugRequestModel){
    return this.http
    .get<IRequestedDrugViewModel[]>(CommonHttpUtility.constructUrl(`${environment.apiUrl}/phrdrgrequests/made`,req))
  }
  getPageOfRecievedRequests(req:IDrugRequestModel){
    return this.http
    .get<IReicevedDrugViewModel[]>(CommonHttpUtility.constructUrl(`${environment.apiUrl}/phrdrgrequests/received`,req))
  }
  changeRequestStatus(id:string,status:E_drug_requestStatus){
    let body:IHttpPatchBody=[
      {op:'replace',path:'/Seen',value:true},
      {op:'replace',path:'Status',value:status}
    ];
    return this.http.patch<void>(`${environment.apiUrl}/phrdrgrequests/received/${id}`,body);
  }
  deleteRequest(id:string){
    return this.http.delete<void>(`${environment.apiUrl}/phrdrgrequests/made/${id}`);
  }

  getReceivedExchangedDrugs(req:IDrugRequestModel){
     return this.http
    .get<any>(`${environment.apiUrl}/LzDrugExchangeRequest/Received?pageNumber=1&pageSize=10`)
  }
  getRequestedExchangedDrugs(req:IDrugRequestModel){
     return this.http
    .get<any>(`${environment.apiUrl}/LzDrugExchangeRequest?pageNumber=1&pageSize=10`)
  }
  getExchReceivedDetails(id:string){
     return this.http
    .get<any>(`${environment.apiUrl}/LzDrugExchangeRequest/${id}`)
  }
  updateExchDrugReq(reqId,dId,status){
     return this.http
    .put(`${environment.apiUrl}/LzDrugExchangeRequest/(UpdateDrugStatusInRequestIReceived)/${reqId}`,{requestId:reqId,drugId:dId,drugeStatus:status})
  }
  rejectDrugReqFromReceiver(rid,ids){
    console.log(ids)
    return this.http
    .put(`${environment.apiUrl}/LzDrugExchangeRequest/${rid}`,{id:rid,lzDrugsIds:ids})
  }
}

