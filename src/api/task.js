import request from '@/utils/request'

export function getTaskList (parameter = {}) {
  return request({
    url: '/task/list',
    method: 'get',
    params: parameter
  })
}
