export interface IStkDrugsRequest_Pharma{
    id:string
    name:string
    address:string
    addressInDetails:string|null
    phoneNumber:string
    landLinePhone:string
}
export enum EStockDrugsPackgStatus{
    Pending,
    Accepted,
    Rejected,
    Completed,
    CanceledFromStk,
    CanceledFromPharma,
    AtNegotioation
}
export interface IStkDrugsRequest_Drug{
  id:string 
  name:string 
  quantity:number
}
export interface IStkDrugsRequest{
    packageId:string
    stkPackageId:string
    pharma:IStkDrugsRequest_Pharma,
    drugs:IStkDrugsRequest_Drug[]
    status:EStockDrugsPackgStatus
    createdAt:string
}
export interface I_PaginationReq_To_GetDrugs{
    pageNumber?:number 
    pageSize?:number 
    orderBy?:string
}
export enum E_LzDrgRequestStatus
{
    Pending,
    Accepted,
    Rejected,
    Completed,
    AtNegotioation,
    AcceptedForAnotherOne
}

export interface I_DrgRequest_I_Made{
    id:string 
    lzDrugId:string
    lzDrugName:string
    status:E_LzDrgRequestStatus
    pharmacyId:string
    phName:string
}