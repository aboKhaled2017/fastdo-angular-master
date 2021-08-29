import { environment } from "src/environments/environment";
import { CommonHttpUtility } from "../Utilities/http.utility";

export interface IPageRequestModel{
    pageNumber:number 
    pageSize?:number 
    s?:string
    [key:string]:any
    reBuild:(pg:Partial<{pageNumber:number,pageSize:number}>,props?:{[key:string]:any})=>IPageRequestModel
    get:<T>(key:string)=>T
}
export class  PageRequestModel implements IPageRequestModel{
    constructor(config?:Partial<{pageNumber:number,pageSize:number}>) {
        this.pageNumber=this.pageNumber || 1;
        this.pageSize=this.pageSize || 20;
        this.setValues(config);
    }
    private setValues(pg:Partial<{pageNumber:number,pageSize:number}>,props?:{[key:string]:any}){
        if(pg){
           if(pg.pageNumber) this.pageNumber=pg.pageNumber ;
           if(pg.pageSize) this.pageSize=pg.pageSize ;
        }
        Object.entries(props || {}).forEach(e=>{
            this[e[0]]=e[1];
        });
    }
    reBuild(pg:Partial<{pageNumber:number,pageSize:number}>,props?:{[key:string]:any}){
     this.setValues(pg,props);
     return this;
    }
    get<T>(key:string):T{
     return this[key]
    }
    getFullUrl(urlSuffix:string){
        return CommonHttpUtility.constructUrl(`${environment.apiUrl}/${urlSuffix}`,this);
    }
    pageNumber: number;
    pageSize?: number;
    [key: string]: any;
}