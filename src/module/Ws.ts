
import WebSocket from 'ws';
import { COIN_LIST, SOCKET_URL } from '../util/constant/setting';



export default class Ws {
  constructor() {
    const ws = new WebSocket(SOCKET_URL);
    ws.on('error', console.error);
    

    ws.on('open', function open() {
      ws.send(`[{"ticket":"maxm"},{"type":"orderbook","codes":[${COIN_LIST.map(v=>`"${v}.1"`).join(",")}]}]`);
    });

    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });
  }

  
}

