import request from '@/utils/request'

export function getTaskList (parameter = {}) {
  return request({
    url: '/task/list',
    method: 'get',
    params: parameter
  })
}

export function saveTask (data) {
  return request({
    url: '/task/save',
    method: 'post',
    data: data
  })
}

export function changeStatus (taskId, status) {
  return request({
    url: '/task/change-status',
    method: 'post',
    data: {
      task_id: taskId,
      status: status
    }
  })
}

export function taskDetail (taskId) {
  return request({
    url: '/task/detail',
    method: 'get',
    params: {
      task_id: taskId
    }
  })
}

export function taskLog (data) {
  return request({
    url: '/task/log',
    method: 'post',
    data: data
  })
}
