import request from '@/utils/request'

export function getQyxxList (data) {
  return request({
    url: '/exhibition/getQyxxList',
    method: 'post',
    data
  })
}

export function getHyxxList (data) {
  return request({
    url: '/exhibition/getHyxxList',
    method: 'post',
    data
  })
}

export function getQyxxDetail (data) {
  return request({
    url: '/exhibition/getQyxxDetail',
    method: 'post',
    data
  })
}

export function getHyxxDetail (data) {
  return request({
    url: '/exhibition/getHyxxDetail',
    method: 'post',
    data
  })
}

export function getMemberType (data) {
  return request({
    url: '/exhibition/getMemberType',
    method: 'post',
    data
  })
}
