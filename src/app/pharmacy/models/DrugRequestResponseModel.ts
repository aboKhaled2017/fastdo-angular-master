import { E_drug_requestStatus } from 'src/app/shared/enums/enums';

export interface IDrugReqResponseModel{
    id: string
    lzDrugId:string
    seen:boolean
    status:E_drug_requestStatus
    pharmacyId:string
}