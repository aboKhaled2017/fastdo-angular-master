import { E_drug_ConsumeType, E_drug_PriceType, E_drug_UnitType } from '../../../shared/enums/enums';
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