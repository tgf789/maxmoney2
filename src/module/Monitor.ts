import { OrderbookUnit } from "../util/constant/interface"


export default class Monitor {
  private code = ""
  private orderbookList : OrderbookUnit[] = []
  private currentPrice = 0
  constructor(code : string){
    this.code = code 
  }

  public setOrderbook = (orderbookList : OrderbookUnit[]) => {
    // console.log({code:this.code,orderbookList})
    this.orderbookList = orderbookList
    this.setCurrentPrice(orderbookList[0].bid_price)
  }

  public setCurrentPrice = (price : number) => {
    this.currentPrice = price 
  }
}