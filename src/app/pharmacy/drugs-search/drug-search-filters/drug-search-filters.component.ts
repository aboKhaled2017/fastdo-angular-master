import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ISearchMenuInputSelectData } from 'src/app/shared/components/form-controls/serach-input-select/models/ISearchMenu.model';
import { IAreaModel } from 'src/app/shared/models/IAreaModel';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { IPharmacyShortDataModel } from '../../models/IPharmacyShortData.model';
import { DrugSearchService } from '../drug-search.service';
import { DrugsSearchComponent } from '../drugs-search.component';

@Component({
  selector: 'app-drug-search-filters',
  templateUrl: './drug-search-filters.component.html',
  styleUrls: ['./drug-search-filters.component.scss']
})
export class DrugSearchFiltersComponent extends DrugsSearchComponent {
  isPharmacySelected=false;
  onCodeSearchChange=new Subject<string>();
  subscriptions:Subscription[]=[];
  areas:IAreaModel[]=[];
  cities:ISearchMenuInputSelectData[]=[]
  towns:ISearchMenuInputSelectData[]=[]
  pharmaciesData:ISearchMenuInputSelectData[]=[]
  codeSubject=new Subject();
  private _currentSelectedCities:ISearchMenuInputSelectData[]=[];
  private _currentSelectedTowns:ISearchMenuInputSelectData[]=[];
  private _currentSelectedPharmacies:ISearchMenuInputSelectData[]=[];
  constructor(private dataService:DataStorageService,
              private searchService:DrugSearchService,
              public paginatorService:PaginatorService,
              private authService:AuthService) {
                super(searchService,paginatorService); 
          this.subscriptions.push(dataService.getAllAreas().subscribe(data=>{
            this.areas=data;
            this.cities=this.getCities(this.areas);
            this.towns=this.getTowns(this.areas);
          }));
          this.subscriptions.push(dataService.getAllPharmaciesShortData().subscribe(_data=>{
            this.pharmaciesData=this.getPharmacies(_data.filter(e=>e.id!=authService.currentUserValue?.id));
          }));
  }
  getCities(areas:IAreaModel[]):ISearchMenuInputSelectData[]{
    return areas.filter(a=>!a.superAreaId)
    .map(a=>({
      key:a.id,
      value:a.name,
    }));
  }
  getTowns(areas:IAreaModel[]):ISearchMenuInputSelectData[]{
    return areas.filter(a=>!!a.superAreaId)
    .map(a=>({
      key:a.id,
      value:a.name,
      _superAreaId:a.superAreaId
    }));
  }
  getPharmacies(data:IPharmacyShortDataModel[]):ISearchMenuInputSelectData[]{
   return data.map(e=>({
     key:e.id,
     value:e.name
   }));
  }
  ngOnInit(): void {
    this.handleScannerDetection();
    this._handleOnCodeSearchChange();
  }
  private _handleOnCodeSearchChange(){
    this.onCodeSearchChange.pipe(debounceTime(500)).subscribe(val=>{
      this.drugSearchService.getWhere({code:(val || "").trim()})
    });
  }
  selectedCityChanged(data:ISearchMenuInputSelectData[]){
    this._currentSelectedCities=data;
    let _newData=data.length==0
    ?this.getTowns(this.areas)
    :this.getTowns(this.areas)
    .filter(_town=>data.some(_city=>_city.key==_town._superAreaId));

    _newData=_newData.reduce((arr,_town)=>{
      let _selectedTown=arr.find(t=>t.key==_town.key);
     if(!_selectedTown)arr.push(_town);
     return arr;
    },[...this._currentSelectedTowns]);
   this.towns=_newData;
   let ids=data.length<1?"":data.map(t=>t.key).join(',');
   this.drugSearchService.getWhere({'CityIds':ids});
  }
  selectedTownChanged(data:ISearchMenuInputSelectData[]){
    this._currentSelectedTowns=data;
    /* if(this._currentSelectedCities.length>0)
    this.towns=data.filter(_town=>this._currentSelectedCities.some(_city=>_city.key==_town._superAreaId)); */
    let ids=data.length<1?"":data.map(t=>t.key).join(',');
    this.drugSearchService.getWhere({'AreaIds':ids});
  }
  onSearchChange(value:string){
  this.drugSearchService.getWhere({s:(value || "").trim()})
  }
  onCodeNumberChange(value:string){
    this.onCodeSearchChange.next(value);
  }
  selectedPharmacyChanged(data:ISearchMenuInputSelectData[]){
    this._currentSelectedPharmacies=data;
    let ids=data.length<1?"":data.map(t=>t.key).join(',');
    this.drugSearchService.getWhere({'InPharmasIds':ids});
    this.isPharmacySelected=this._currentSelectedPharmacies.length>0;
    if(this._currentSelectedPharmacies.length==1){
      this.searchService.selectedPharmacy.next({pharmacyId:data[0].key,pharmacyName:data[0].value})
    }
    else{
      this.searchService.selectedPharmacy.next(null)
    }
  }
  ngOnDestroy(): void {
   this.subscriptions.forEach(e=>e.unsubscribe());
  }
  handleScannerDetection(){
    let str = '';
    let timer = null;
    fromEvent(document.body,'keypress').subscribe(e=>{
    
     e.stopPropagation();
     e.cancelBubble=true;
    
     if (e['key'] === 'Enter') {
        clearTimeout(timer);
      }
      else{
          str += e['key'];
      }
     
      if (timer) {
          clearTimeout(timer);
      }
      timer = setTimeout(() => {
         if(str.startsWith('622')){
            this.codeSubject.next(str);
         }
          str = '';   
      }, 100);
    });
  }
}
