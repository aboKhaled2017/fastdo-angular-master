import { E_drug_ConsumeType, E_drug_PriceType, E_drug_UnitType } from "src/app/shared/enums/enums";

export interface IDrugModel{
    consumeType: E_drug_ConsumeType
    desc: string
    discount: number
    id: string
    name: string
    price: number
    priceType:E_drug_PriceType
    quantity: number
    requestCount: number
    type:string
    unitType: E_drug_UnitType
    valideDate: string
}
export interface IDrugSearchModel{
    desc:string
    discount: 9
    id: string
    isMadeRequest: boolean
    name: string
    pharmLocation: string
    pharmName: string
    pharmacyId:string
    price: 9
    priceType: E_drug_PriceType
    quantity: 44
    requestId:string
    requestUrl: string
    requestsCount: 1
    status: null
    type: string
    unitType: E_drug_UnitType
    valideDate:string // "2021-4"
}