import Monitor from "../module/Monitor";
import { RULE } from "./constant/Enums";
import * as technicalindicators from "technicalindicators"
import { parserResult } from "./utils";

// const ADX = require('../../lib/directionalmovement/ADX').ADX;

export const rulesFn : IRulesFn  = {
  [RULE.DMI] : ({monitor,data_set}) => {
    const {candleList} = monitor
    const {parser,adx_period,index=0} = data_set
    let close:number[] = [], high:number[] = [],low:number[] = []
    candleList.forEach(({high_price,low_price,trade_price})=>{
      close.push(trade_price)
      high.push(high_price)
      low.push(low_price)
    })
    let input = {
      close,
      high,
      low,
      period : adx_period
    }
    if(close.length === 0) return false
    console.log({close,high,low})
    const raw = technicalindicators.adx(input)
    console.log({raw})
    if(raw.length === 0) return false
    const {adx,mdi,pdi} = raw[index]
    console.log({pdi,mdi})
    return parserResult(pdi,mdi,parser)
  },
  [RULE.CriteriaWithClose] : ({monitor,data_set}) => {
    const {candleList} = monitor
    const {close_number=0,criteria_number=0,parser} = data_set
    if(candleList.length === 0) return false 
    const criteriaPrice = monitor.getCriteriaPrice(criteria_number || 0)
    const closePrice = candleList[close_number-1].trade_price

    return parserResult(closePrice,criteriaPrice,parser)
  }
}

type IRulesFn = {
  [v in RULE]: (a: { monitor: Monitor; data_set: any; }) => boolean;
}; 




// : {[v:RULE]:(a:{monitor:Monitor,ruleData:any})=>boolean} 