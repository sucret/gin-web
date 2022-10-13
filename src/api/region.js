import request from '@/utils/request'

export function getRegionByPid (pid) {
  return request({
    url: '/region/get-by-pid/' + pid,
    method: 'get'
  })
}
