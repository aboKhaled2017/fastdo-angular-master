import { IFromStockDrugPackage } from "./PharmaDrugpackageResponse.model";


export interface IPharmaPackage{
    createdAt: string
    fromStocks: IFromStockDrugPackage[]
    name: string
    packageId:string
}

export interface ISelectedPackage{
    original:IPharmaPackage
    isChanged:boolean 
    current:IPharmaPackage
}