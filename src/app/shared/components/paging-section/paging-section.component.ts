import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IGeneralPagination } from '../../models/IPagination.model';

@Component({
  selector: 'app-paging-section',
  templateUrl: './paging-section.component.html',
  styleUrls: ['./paging-section.component.scss']
})
export class PagingSectionComponent implements OnInit {
  @Input('pg') pg:IGeneralPagination;
  @Output('refresh') onRefresh=new EventEmitter();
  @Output('selectPage') onPageCganged=new EventEmitter<Number>();
  @Output('selectPageSize') onPageSizeChganged=new EventEmitter<Number>();
  constructor() {
   }

  ngOnInit(): void {
  }
  resfresh(){
    this.onRefresh.emit();
  }
  pageChanged(page){
    this.onPageCganged.emit(page);
  }
  onPageSizeChange(pageSize){
     this.onPageSizeChganged.emit(pageSize);
  }

}
