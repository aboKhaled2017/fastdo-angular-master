export interface ISearchMenuInputModel{
    data:ISearchMenuInputSelectData[]
}
export interface ISearchMenuInputSelectData{
    key:any
    value:any
    selected?:boolean
    notMatched?:boolean
    [key:string]:any
}