import Monitor from "../module/Monitor";
import { RULE } from "./constant/Enums";
import * as technicalindicators from "technicalindicators"
import { parserResult } from "./utils";

// const ADX = require('../../lib/directionalmovement/ADX').ADX;

export const rulesFn : IRulesFn  = {
  [RULE.DMI] : ({monitor,data_set}) => {
    const {candleList} = monitor
    const {parser,adx_period,index=0} = data_set
    const raw = monitor.getDMI(adx_period)
    if(!raw || raw.length === 0) return false
    const {adx,mdi,pdi} = raw[index]
    
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