import { ExchangeService, QuoationService } from "node-upbit";
import Ws from "./module/Ws";
import "./module/Express"
import { COIN_LIST, CRITERIA_TO, MINUTES, SCHEDULE_MINUTES } from "./util/constant/setting";
import Monitor from "./module/Monitor";
import { OrderbookResponse } from "./util/constant/interface";
import schedule from "node-schedule"


let ws : Ws
const codes : {[v:string]:Monitor} = {}
COIN_LIST.forEach((v)=>{
  const monitor = new Monitor(v)
  codes[v] = monitor
})

// const Quoation = new QuoationService()
// Quoation.getMinutesCandles({ minutes : "15", marketCoin : "", count : 25})

const handleGetOrderbook = (message : OrderbookResponse) => {
  if(!message) return 
  const {code,orderbook_units} = message
  codes[code].setOrderbook(orderbook_units)
}

const getCandles = async () => {

  const Quoation = new QuoationService()
  await COIN_LIST.map(async(code)=>{
    const candleList = await Quoation.getMinutesCandles({ minutes : MINUTES, marketCoin : "", count : CRITERIA_TO})
    // codes[code].
  })
}



const wsConnect = () => {
  ws = new Ws(handleGetOrderbook)
}

// const job = schedule.scheduleJob(`0 */${SCHEDULE_MINUTES} * * * *`,getCandles);






// Quoation.getMinutesCandles({ minutes, marketCoin, count, to, })


wsConnect()

