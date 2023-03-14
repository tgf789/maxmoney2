import configFile from "./config.json"

export const ACCESS_KEY = configFile.access_key
export const SECRET_KEY = configFile.secret_key
export const COIN_LIST = configFile.coin_list

export const SOCKET_URL = "wss://api.upbit.com/websocket/v1"
export const ASK_RULE_LIST = configFile.ask_rule_list

// 스케줄 돌아가는 분단위
export const SCHEDULE_MINUTES = configFile.schedule_minutes

// 캔들 기준 분 
export const MINUTES = (configFile.minutes+"") as "1" | "3" | "5" | "10" | "15" | "30" | "60" | "240"

export const CRITERIA_TO = configFile.criteria_to
export const CRITERIA_FROM = configFile.criteria_from
export const START_MONEY = configFile.start_money
