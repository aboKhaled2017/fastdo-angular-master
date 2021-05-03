export interface IGeneralPagination{
    totalCount:number
    pageSize:number
    currentPage:number
    totalPages:number
    prevPageLink:string|null
    nextPageLink:string|null,
    urlName:string
}
