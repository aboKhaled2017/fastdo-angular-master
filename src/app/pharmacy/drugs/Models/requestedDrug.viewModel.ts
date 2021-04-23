import { E_drug_requestStatus } from "src/app/shared/enums/enums";

export interface IRequestedDrugViewModel{
    id: string
    lzDrugId: string
    lzDrugName: string
    phName: string
    pharmacyId: string
    status:E_drug_requestStatus
}



 