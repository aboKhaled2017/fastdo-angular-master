import { E_drug_requestStatus } from "src/app/shared/enums/enums";

export interface IReicevedDrugViewModel{
    id:string 
    lzDrugId:string
    lzDrugName:string
    status:E_drug_requestStatus
    pharmacyId:string
    phName:string
}



 