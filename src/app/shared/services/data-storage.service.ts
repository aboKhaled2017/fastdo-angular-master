import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAreaModel } from '../models/IAreaModel';

@Injectable()
export class DataStorageService {
  private _getAllAreas=this.http.get<IAreaModel[]>(`${environment.apiUrl}/areas/all`)
    .pipe(share());
  private _allStockNames=this.http.get<{id:string,name:string}[]>(`${environment.apiUrl}/pharmas/stknames`)  
          .pipe(share());
  constructor(private http: HttpClient) { }
  getAllAreas(){
    return this._getAllAreas;
  }
  getAllStocksNames(){
    return this._allStockNames;
  }
}
