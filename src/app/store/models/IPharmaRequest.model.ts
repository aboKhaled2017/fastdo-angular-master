import { E_PharmacyRequestStatus } from "src/app/shared/enums/enums";

export interface IPharmaRequest{
    pharma:IPharmaRequestDetails
    pharmaClass: string
    seen: boolean
    status: E_PharmacyRequestStatus
}
export interface IPharmaRequestDetails{
    address:string
    addressInDetails: string| null
    id: string
    landlinePhone: string
    name: string
    phoneNumber:string
}