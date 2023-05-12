import request from '@/utils/request'
import { parseStrEmpty } from '@/utils/ruoyi'

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

// 获取指定studentId的dormId
export function getDormId(query) {
  return request({
    url: '/apartment/cancel/getDormId',
    method: 'post',
    params: {
      userId: query.userId,
      dormStatus: query.dormStatus.join(',')
    }
  })
}

// 查询宿舍详细
export function getStudentDorm(dormId) {
  return request({
    url: '/apartment/cancel/getStudentDorm/' + dormId,
    method: 'get'
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/apartment/cancel/getUser/' + parseStrEmpty(userId),
    method: 'get'
  })
}

// 查询用户详细
export function removeAndUpdateStuDorm(query) {
  return request({
    url: '/apartment/cancel/removeAndUpdateStuDorm',
    method: 'post',
    data: query
  })
}

