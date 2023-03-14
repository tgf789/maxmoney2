/**
 * 지갑
 */

import { START_MONEY } from "../util/constant/setting";

export class Account {
  public leftMoney = 0
  constructor() {
    this.leftMoney = START_MONEY

  }

  /**
   * 매도
   * @param code 코인명
   * @param price 가격 KRW
   * @param amount 물량 
   */
  bid = (code:string,price:number,amount:number) => {

  }

  /**
   * 매수
   */
  ask = () => {

  }
}