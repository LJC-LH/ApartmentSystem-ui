import request from '@/utils/request'

// 查询特殊退宿申请列表
export function listCancel(query) {
  return request({
    url: '/apartment/cancel/list',
    method: 'get',
    params: query
  })
}

// 查询特殊退宿申请详细
export function getCancel(cancelId) {
  return request({
    url: '/apartment/cancel/' + cancelId,
    method: 'get'
  })
}

// 新增特殊退宿申请
export function addCancel(data) {
  return request({
    url: '/apartment/cancel',
    method: 'post',
    data: data
  })
}

// 修改特殊退宿申请
export function updateCancel(data) {
  return request({
    url: '/apartment/cancel',
    method: 'put',
    data: data
  })
}

// 删除特殊退宿申请
export function delCancel(cancelId) {
  return request({
    url: '/apartment/cancel/' + cancelId,
    method: 'delete'
  })
}

// 获取指定角色类型的用户列表
export function selectUserListByRoleId(query) {
  return request({
    url: '/apartment/cancel/getRoleList',
    method: 'post',
    params: query
  })
}

