import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Constants } from '../../../shared/constnts';
import { IDrugModel } from '../Models/DrugModel';

@Injectable()
export class DrugCreateService {

  constructor(private http:HttpClient) { }
  get_liveState_for_addDrug(model){
      const unitTypeName=Constants.lists.drugsUnits.find(v=>v.value==model.unitType)?.title||'';
      return `يوجد لدى عدد ${model.quantity||''} ${unitTypeName} من  ${model.name||''} - ${model.type||''} - بسعر ${model.price||''} جنية لل/${unitTypeName}`
  }
  addDrug(model:IDrugModel){
   return this.http.post(`${environment.apiUrl}/lzdrugs`,model);
  }
  updateDrug(model:IDrugModel){
    return this.http.put(`${environment.apiUrl}/lzdrugs/${model.id}`,model);
   }
}
