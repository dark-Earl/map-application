import request from '@/utils/request'

export function getFilterParam (data) {
  return request({
    url: '/FilterParam/getFilterParam',
    method: 'post',
    data
  })
}

export function getQyGqlb (data) {
  return request({
    url: '/FilterParam/getQyGqlb',
    method: 'post',
    data
  })
}

export function getCitySec (data) {
  return request({
    url: '/FilterParam/getCitySec',
    method: 'post',
    data
  })
}

export function getPlateCategory (data) {
  return request({
    url: '/FilterParam/getPlateCategory',
    method: 'post',
    data
  })
}
