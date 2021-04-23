export interface ISearchedStkDrugResponseModel{
    name: string
    stockCount: number
    stocks: ISearchedStkDrug_StockResponseModel[]
}

export interface ISearchedStkDrug_StockResponseModel{
    discount: number
    id: string
    isJoinedTo: boolean
    price: number
    stockId: string
    stockName:string
}