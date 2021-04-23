import { BehaviorSubject } from "rxjs";
import { IGeneralPagination } from '../models/IPagination.model';

export class PaginatorService {
  public paginator=new BehaviorSubject<IGeneralPagination>({
    currentPage:1,
    pageSize:4,
    totalCount:0,
    totalPages:0,
    nextPageLink:null,
    prevPageLink:null
  });
  constructor() { }
}
