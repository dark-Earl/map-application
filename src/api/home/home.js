import request from '@/utils/request'

export function getTggw (data) {
  return request({
    url: '/home/tggw',
    method: 'post',
    data
  })
}

export function cxStatisticsOfRegional (data) {
  return request({
    url: '/home/cxStatisticsOfRegional',
    method: 'post',
    data
  })
}

export function cxStatisticalData (data) {
  return request({
    url: '/home/cxStatisticalData',
    method: 'post',
    data
  })
}

export function getCategoryConfigure (data) {
  return request({
    url: '/home/getCategoryConfigure',
    method: 'post',
    data
  })
}

export function getListData (data) {
  return request({
    url: '/info/list',
    method: 'post',
    data
  })
}

export function getQyxxList (data) {
  return request({
    url: '/home/getQyxxList',
    method: 'post',
    data
  })
}

export function getXY (data) {
  return request({
    url: '/home/getXY',
    method: 'post',
    data
  })
}

export function searchInfo (data) {
  return request({
    url: '/home/searchInfo',
    method: 'post',
    data
  })
}

export function serviceRegist (data) {
  return request({
    url: '/home/serviceRegist',
    method: 'post',
    data
  })
}

export function getPolicyInfo (data) {
  return request({
    url: '/home/getPolicyInfo',
    method: 'post',
    data
  })
}

export function sendCommunication (data) {
  return request({
    url: '/home/sendCommunication',
    method: 'post',
    data
  })
}

export function getCommunication (data) {
  return request({
    url: '/home/getCommunication',
    method: 'post',
    data
  })
}

export function readSysProps (data) {
  return request({
    url: '/uiConfig/readSysProps',
    method: 'post',
    data
  })
}

export function readProps (data) {
  return request({
    url: '/uiConfig/readProps',
    method: 'post',
    data
  })
}
