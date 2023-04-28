import request from '@/utils/request'

// 查询学生报修列表
export function listStudentRepairApplication(query) {
  return request({
    url: '/apartment/studentRepairApplication/list',
    method: 'get',
    params: query
  })
}

// 查询学生报修详细
export function getStudentRepairApplication(repairId) {
  return request({
    url: '/apartment/studentRepairApplication/' + repairId,
    method: 'get'
  })
}

// 新增学生报修
export function addStudentRepairApplication(data) {
  return request({
    url: '/apartment/studentRepairApplication',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/apartment/studentRepairApplication/getUser',
    method: 'post',
  })
}

// 修改学生报修
export function updateStudentRepairApplication(data) {
  return request({
    url: '/apartment/studentRepairApplication',
    method: 'put',
    data: data
  })
}

// 删除学生报修
export function delStudentRepairApplication(repairId) {
  return request({
    url: '/apartment/studentRepairApplication/' + repairId,
    method: 'delete'
  })
}
