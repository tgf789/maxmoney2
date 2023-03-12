export interface OrderbookResponse {
  type: 'orderbook';
  code: string;
  timestamp: number;
  total_ask_size: number;   // 매수
  total_bid_size: number;   // 매도 
  orderbook_units: OrderbookUnit[];
}

export interface OrderbookUnit {
  ask_price: number;
  bid_price: number;
  ask_size: number;
  bid_size: number;
}
