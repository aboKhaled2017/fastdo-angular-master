import { Component, OnInit } from '@angular/core';
import { DrugSearchService } from '../drug-search.service';

interface ISearchSortingModel{
  propName:string 
  display:string
  sortType:'asc'|'desc'
  active:boolean
}

@Component({
  selector: 'app-dru-search-sorting',
  templateUrl: './dru-search-sorting.component.html',
  styleUrls: ['./dru-search-sorting.component.scss']
})
export class DruSearchSortingComponent implements OnInit {

  props:ISearchSortingModel[];
  constructor(private drugSreachService:DrugSearchService) {
    this._initProps(); 
  }
  private _initProps(){
    this.props=[
      {propName:'name',sortType:'asc',display:'الاسم',active:false},
      {propName:'quantity',sortType:'asc',display:'الكمية',active:false},
      {propName:'discount',sortType:'asc',display:'الخصم',active:false},
      {propName:'valideDate',sortType:'asc',display:'تاريخ الصلاحية',active:false},
      {propName:'requestsCount',sortType:'asc',display:'عدد الطلبات',active:false},
    ]
  }
  ngOnInit(): void {
  }
  orderBy(prop:ISearchSortingModel,ind:number){
  this.drugSreachService.getWhere({orderBy:`${prop.propName} ${prop.sortType}`});
  let _props=this.props.map(e=>({...e,active:false}));
  _props[ind].active=true;
  _props[ind].sortType=prop.sortType=='asc'?'desc':'asc';
  this.props=_props;
  }
}
