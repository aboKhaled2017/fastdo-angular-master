import { E_drug_requestStatus } from '../../../shared/enums/enums';
export interface IPharmaDrugPackageResponseModel{
    createdAt: string
    fromStocks: IFromStockDrugPackage[]
    name: string
    packageId:string
}

export interface IPharmaDrugPackage{
    discount: number
    id: string
    name: string
    price: number
    quantity:number
}

export interface IFromStockDrugPackage{
    address: string
    addressInDetails: string
    drugs: IPharmaDrugPackage[]
    id: string
    name: string
    seen: true
    status: E_drug_requestStatus
    stockClassId:string
}