import request from '@/utils/request'

export function getStationList (parameter) {
  return request({
    url: '/station/list',
    method: 'get',
    params: parameter
  })
}

export function saveStation (data) {
  return request({
    url: '/station/save',
    method: 'post',
    data: data
  })
}

export function getStationDetail (stationId) {
  return request({
    url: '/station/detail/' + stationId,
    method: 'get'
  })
}
