import request from '@/utils/request'

export function getRoleList () {
  return request({
    url: '/role/list',
    method: 'get'
  })
}

export function saveRole (data) {
  return request({
    url: '/role/save',
    method: 'post',
    data: data
  })
}

export function getRoleDetail (roleId) {
  return request({
    url: '/role/detail',
    method: 'get',
    params: { role_id: roleId }
  })
}

export function setRoleNode (data) {
  return request({
    url: '/role/node/save',
    method: 'post',
    data: data
  })
}

export function getRoleNode (roleId) {
  return request({
    url: '/role/node',
    method: 'get',
    params: { role_id: roleId }
  })
}
