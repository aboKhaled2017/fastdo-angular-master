import { E_StkDrugPackageRequestStatus } from "src/app/shared/enums/enums";

export interface IStoreDrugRequestModel{
    createdAt: string
    drugs: IStoreDrugRequest_DrugModel[]
    packageId:string
    pharma:IStoreDrugRequest_PharmaModel
    status: E_StkDrugPackageRequestStatus
    stkPackageId:string
}

export interface IStoreDrugRequest_PharmaModel{
    address: string
    addressInDetails: string|null
    id: string
    landLinePhone:string
    name:string
    phoneNumber:string
}
export interface IStoreDrugRequest_DrugModel{
    id: string
    name:string
    quantity:number
}
