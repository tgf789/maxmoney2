/**
 * 매수 매도 조건 룰 종류
 */
export enum RULE {
  DMI = "DMI",    // PDI, MDI 조건
  CriteriaWithClose = "CriteriaWithClose",      // 기준가(n), 종가(m) 비교 
}


export enum PARSER {
  LT = "lt",      // <
  LTE = "lte",    // <= 
  GT = "gt",      // >
  GTE = "gte",    // >= 
  E = "e"         // === 
}