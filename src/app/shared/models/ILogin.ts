export interface ILogin{
    email:string 
    password:string 
    userType:UserType
}
export enum UserType{
    Pharmacier=0,
    Stocker=1,
    Adminer=2
}