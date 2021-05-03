export interface IGetTechQuesViewModel{
    id:string
    relatedToId:string | null
    message:string
    seenAt:string | null
    createdAt:string
    responses:IGetTechQues_ResponseViewModel []
}
export interface IGetTechQues_ResponseViewModel{
    id:string
    adminId:string
    message:string
    seenAt:string | null
    createdAt:string
}