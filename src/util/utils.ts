import { PARSER } from "./constant/Enums";

/**
 * 비교 연산 
 * @param n1 첫번째 수
 * @param n2 두번째 수
 * @param parser 비교연산자
 * @returns boolean
 */
export const parserResult = (n1:number,n2:number,parser:PARSER) => {
  if(PARSER.E === parser) return n1 === n2 
  if(PARSER.GT === parser) return n1 > n2 
  if(PARSER.GTE === parser) return n1 >= n2
  if(PARSER.LT === parser) return n1 < n2 
  if(PARSER.LTE === parser) return n1 <= n2 
  return false 
}