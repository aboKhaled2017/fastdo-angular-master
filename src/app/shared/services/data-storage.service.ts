import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { IPharmacyShortDataModel } from 'src/app/pharmacy/models/IPharmacyShortData.model';
import { environment } from 'src/environments/environment';
import { IAreaModel } from '../models/IAreaModel';
import { Role } from '../models/Role';
import { IStockClass } from '../models/StockClass.Model';
import { AuthService } from './auth.service';

@Injectable()
export class DataStorageService {
  
  private _getAllAreas=this.http.get<IAreaModel[]>(`${environment.apiUrl}/areas/all`)
    .pipe(share());
  private _allStockNames=this.http.get<{id:string,name:string}[]>(`${environment.apiUrl}/pharmas/stknames`)  
          .pipe(share());
  private _allPharmaciesWithShortData=this.http.get<IPharmacyShortDataModel[]>(`${environment.apiUrl}/pharmas`)  
          .pipe(share());
  private _allStockClasses=this.http.get<IStockClass[]>(`${environment.apiUrl}/stk/classes`)  
          .pipe(share());
  constructor(private http: HttpClient,private authService:AuthService) { }
  getAllAreas(){
    return this._getAllAreas;
  }
  getAllStocksNames(){
    return this._allStockNames;
  }
  getAllPharmaciesShortData(){
    return this._allPharmaciesWithShortData;
  }
  getAllStockClasses(){
    if(this.authService.currentUserValue.role!=Role.store) throw new Error("you cannot call this method");
    return this._allStockClasses;
  }
}
