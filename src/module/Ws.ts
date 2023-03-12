
import WebSocket from 'ws';
import { OrderbookResponse } from '../util/constant/interface';
import { COIN_LIST, SOCKET_URL } from '../util/constant/setting';



export default class Ws {
  constructor(callback:(message:OrderbookResponse)=>void) {
    const ws = new WebSocket(SOCKET_URL);
    ws.on('error', console.error);
    

    ws.on('open', function open() {
      const subscribeData = [
        {ticket:"maxm"},
        {
        type: 'orderbook',
        codes: COIN_LIST.map((v)=>v+".1"),
        isOnlyRealtime: true,
      }];
      console.log({subscribeData})
      ws.send(JSON.stringify(subscribeData));

    });

    ws.on('message', function message(data) {
      if(!data) return
      const dataStr = data.toString()
      try {
        const message: OrderbookResponse = JSON.parse(dataStr);
        
        if (message.type === 'orderbook') {
          callback?.(message)
        }else{
          console.log("===",{dataStr})
        }
      } catch (error) {
        console.log({dataStr,error})
      }
    });
  }
}

