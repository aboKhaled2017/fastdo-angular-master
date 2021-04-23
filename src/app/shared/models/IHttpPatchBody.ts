export interface IHttpPatchBodyRow{
    op:string 
    path:string 
    value:any
}
export type IHttpPatchBody=IHttpPatchBodyRow[];