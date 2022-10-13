import request from '@/utils/request'

export function saveNode (data) {
  return request({
    url: '/node/save',
    method: 'post',
    data: data
  })
}

export function getNodeTree () {
  return request({
    url: '/node/tree',
    method: 'get'
  })
}

export function getNodeDetail (nodeId) {
  return request({
    url: '/node/detail',
    method: 'get',
    params: { node_id: nodeId }
  })
}

export function deleteNode (nodeId) {
  return request({
    url: 'node/delete',
    method: 'get',
    params: { node_id: nodeId }
  })
}
