import Cookies from 'js-cookie'
import * as utils from '@/utils'
const TokenKey = 'atoken'
const ATicketKey = 'aticket'
//cookie过期时间
const expire = 7200

export function getToken () {
  let token = Cookies.get(TokenKey)
  if (!token) {
    return null
  }
  return token
}

export function setToken (token) {
  return Cookies.set(TokenKey, token , expire)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getATicket () {
  let token = Cookies.get(ATicketKey)
  if (!token) {
    token = utils.getRequestParam('ATicket')
    token = decodeURIComponent(token)
  }
  if (!token) {
    return null
  }
  return token
}
export function setATicket (token) {
  return Cookies.set(ATicketKey, token)
}

export function removeATicket () {
  return Cookies.remove(ATicketKey)
}
