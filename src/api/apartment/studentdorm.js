import request from '@/utils/request'

// 查询宿舍列表
export function listStudentdorm(query) {
  return request({
    url: '/apartment/studentdorm/list',
    method: 'get',
    params: query
  })
}

// 查询宿舍详细
export function getStudentdorm(dormId) {
  return request({
    url: '/apartment/studentdorm/' + dormId,
    method: 'get'
  })
}

// 新增宿舍
export function addStudentdorm(data) {
  return request({
    url: '/apartment/studentdorm',
    method: 'post',
    data: data
  })
}

// 修改宿舍
export function updateStudentdorm(data) {
  return request({
    url: '/apartment/studentdorm',
    method: 'put',
    data: data
  })
}

// 删除宿舍
export function delStudentdorm(dormId) {
  return request({
    url: '/apartment/studentdorm/' + dormId,
    method: 'delete'
  })
}
