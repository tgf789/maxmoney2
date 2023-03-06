import configFile from "./config.json"

export const ACCESS_KEY = configFile.access_key
export const SECRET_KEY = configFile.secret_key
export const COIN_LIST = configFile.coin_list

export const SOCKET_URL = "wss://api.upbit.com/websocket/v1"