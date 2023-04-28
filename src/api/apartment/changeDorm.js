import request from '@/utils/request'

// 查询宿舍调整列表
export function listChangeDorm(query) {
  return request({
    url: '/apartment/changeDorm/list',
    method: 'get',
    params: query
  })
}

// 查询宿舍调整详细
export function getChangeDorm(changeId) {
  return request({
    url: '/apartment/changeDorm/' + changeId,
    method: 'get'
  })
}

// 新增宿舍调整
export function addChangeDorm(data) {
  return request({
    url: '/apartment/changeDorm',
    method: 'post',
    data: data
  })
}

// 修改宿舍调整
export function updateChangeDorm(data) {
  return request({
    url: '/apartment/changeDorm',
    method: 'put',
    data: data
  })
}

// 删除宿舍调整
export function delChangeDorm(changeId) {
  return request({
    url: '/apartment/changeDorm/' + changeId,
    method: 'delete'
  })
}