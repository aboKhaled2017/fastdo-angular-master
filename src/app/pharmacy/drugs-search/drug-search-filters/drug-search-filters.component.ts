import { Component } from '@angular/core';
import { ISearchMenuInputSelectData } from 'src/app/shared/components/form-controls/serach-input-select/models/ISearchMenu.model';
import { IAreaModel } from 'src/app/shared/models/IAreaModel';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { LoaderService } from 'src/app/shared/services/loader-service.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { DrugSearchService } from '../drug-search.service';
import { DrugsSearchComponent } from '../drugs-search.component';

@Component({
  selector: 'app-drug-search-filters',
  templateUrl: './drug-search-filters.component.html',
  styleUrls: ['./drug-search-filters.component.scss']
})
export class DrugSearchFiltersComponent extends DrugsSearchComponent {

  
  areas:IAreaModel[]=[];
  cities:ISearchMenuInputSelectData[]=[]
  towns:ISearchMenuInputSelectData[]=[]
  private _currentSelectedCities:ISearchMenuInputSelectData[]=[];
  private _currentSelectedTowns:ISearchMenuInputSelectData[]=[];
  constructor(private dataService:DataStorageService,
              private searchService:DrugSearchService,
              public paginatorService:PaginatorService) {
                super(searchService,paginatorService); 
          dataService.getAllAreas().subscribe(data=>{
          this.areas=data;
          this.cities=this.getCities(this.areas);
          this.towns=this.getTowns(this.areas);
          });
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
  ngOnInit(): void {
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

}
