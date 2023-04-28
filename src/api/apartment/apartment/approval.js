import request from '@/utils/request'

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

//添加学生宿舍信息
export function addStudentDorm(query){
  return request({
    url: '/apartment/approval/addStudentDorm',
    method: 'post',
    data: query
  })
}


