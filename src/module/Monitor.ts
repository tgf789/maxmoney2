import { ICandleReturnProps } from "node-upbit/lib/@types/quotation"
import { RULE } from "../util/constant/Enums"
import { OrderbookUnit } from "../util/constant/interface"
import { ASK_RULE_LIST, CRITERIA_FROM, CRITERIA_TO } from "../util/constant/setting"
import { rulesFn } from "../util/rule"
import { isThisMinute } from "date-fns"

const REAL_TIME_RULE_LIST_RAW = ASK_RULE_LIST.filter(({timing})=>timing==="R")
const REAL_TIME_RULE_LIST = REAL_TIME_RULE_LIST_RAW.map((v)=>(monitor:Monitor)=>{
  const isNot = v.rule_list.some(({data_set,type})=>!rulesFn[type as RULE]({monitor,data_set}))
  return !isNot
})


export default class Monitor {
  private code = ""
  private orderbookList : OrderbookUnit[] = []
  private currentPrice = 0
  public candleList : ICandleReturnProps[] = []
  
  constructor(code : string){
    this.code = code 
  }

  public setOrderbook = (orderbookList : OrderbookUnit[]) => {
    // console.log({code:this.code,orderbookList})
    this.orderbookList = orderbookList
    this.setCurrentPrice(orderbookList[0].bid_price)
  }

  public setCurrentPrice (price : number) {
    this.currentPrice = price 
    const isNot = REAL_TIME_RULE_LIST.some((fn)=>!fn(this))
    
  }

  public setCandleList = (candleList : ICandleReturnProps[]) => {
    candleList.reverse()
    const {timestamp} = candleList[0]
    if(isThisMinute(timestamp)){
      candleList = candleList.slice(1)
    } 
    this.candleList = candleList
  }

  public getCriteriaPrice = (cNumber:number = 0) =>{
    const criteriaCandleList = this.candleList.slice(CRITERIA_FROM-(1 + cNumber),CRITERIA_TO + cNumber)
    let max = 0, min = 99999999999
    criteriaCandleList.forEach(({high_price,low_price})=>{
      if(low_price < min) min = low_price
      if(high_price > max) max = high_price
    })
    return (max + min) / 2
  }
}