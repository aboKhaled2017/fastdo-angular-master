export enum E_drug_ConsumeType{
    burning,
    exchanging
}
export enum E_drug_PriceType{
    oldP,newP
}
export enum E_drug_UnitType{
    shareet,
    elba,
    capsole,
    cartoon,
    unit
}

export enum E_drug_requestStatus{
    Pending,
    Accepted,
    Rejected,
    Completed,
    AtNegotioation,
    AcceptedForAnotherOne
}
export enum E_StkDrugPackageRequestStatus
{
    Pending,
    Accepted,
    Rejected,
    Completed,
    CanceledFromStk,
    CanceledFromPharma,
    AtNegotioation
}
export enum E_PharmacyRequestStatus
{
    Pending ,
    Accepted ,
    Rejected ,
    Disabled 
}
export enum E_StockRequestStatus
{
    Pending ,
    Accepted ,
    Rejected ,
    Disabled 
}