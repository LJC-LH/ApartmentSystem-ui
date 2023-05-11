import request from '@/utils/request'
import { parseStrEmpty } from '@/utils/ruoyi'

// 查询特殊宿舍申请列表
export function listApproval(query) {
  return request({
    url: '/apartment/approval/list',
    method: 'get',
    params: query
  })
}

// 查询特殊宿舍申请详细
export function getApproval(approvalId) {
  return request({
    url: '/apartment/approval/' + approvalId,
    method: 'get'
  })
}

// 新增特殊宿舍申请
export function addApproval(data) {
  return request({
    url: '/apartment/approval',
    method: 'post',
    data: data
  })
}

// 修改特殊宿舍申请
export function updateApproval(data) {
  return request({
    url: '/apartment/approval',
    method: 'put',
    data: data
  })
}

// 删除特殊宿舍申请
export function delApproval(approvalId) {
  return request({
    url: '/apartment/approval/' + approvalId,
    method: 'delete'
  })
}

// 获取指定角色类型的用户列表
export function selectUserListByRoleId(query) {
    return request({
      url: '/apartment/approval/getRoleList',
      method: 'post',
      params: query
    })
}

// 查询宿舍详细
export function getStudentdorm(dormId) {
  return request({
    url: '/apartment/approval/getStudentDorm/' + dormId,
    method: 'get'
  })
}

// 查询宿舍列表
export function listStudentdorm(query) {
  return request({
    url: '/apartment/approval/listStudentdorm',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/apartment/approval/getUser/' + parseStrEmpty(userId),
    method: 'get'
  })
}

// 新增宿舍
export function addAndUpdateStudentDorm(data) {
  return request({
    url: '/apartment/approval/addAndUpdateStudentDorm',
    method: 'post',
    data: data
  })
}
