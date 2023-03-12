import { ExchangeService, QuoationService } from "node-upbit";
import Ws from "./module/Ws";
import "./module/Express"
import { COIN_LIST } from "./util/constant/setting";
import Monitor from "./module/Monitor";
import { OrderbookResponse } from "./util/constant/interface";
import schedule from "node-schedule"


let ws : Ws
const codes : {[v:string]:Monitor} = {}
COIN_LIST.forEach((v)=>{
  const monitor = new Monitor(v)
  codes[v] = monitor
})

const Quoation = new QuoationService()

const handleGetOrderbook = (message : OrderbookResponse) => {
  if(!message) return 
  const {code,orderbook_units} = message
  codes[code].setOrderbook(orderbook_units)
}


const wsConnect = () => {
  ws = new Ws(handleGetOrderbook)
}

const job = schedule.scheduleJob('0 */1 * * * *', function(){
  console.log('Time for tea!',new Date().toTimeString());
  
});




// Quoation.getMinutesCandles({ minutes, marketCoin, count, to, })


wsConnect()

