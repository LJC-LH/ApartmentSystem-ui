import request from '@/utils/request'

// 查询维修结果提交列表
export function listRepairResult(query) {
  return request({
    url: '/apartment/repairResult/list',
    method: 'get',
    params: query
  })
}

// 查询维修结果提交详细
export function getRepairResult(repairId) {
  return request({
    url: '/apartment/repairResult/' + repairId,
    method: 'get'
  })
}

// 新增维修结果提交
export function addRepairResult(data) {
  return request({
    url: '/apartment/repairResult',
    method: 'post',
    data: data
  })
}

// 修改维修结果提交
export function updateRepairResult(data) {
  return request({
    url: '/apartment/repairResult',
    method: 'put',
    data: data
  })
}

// 删除维修结果提交
export function delRepairResult(repairId) {
  return request({
    url: '/apartment/repairResult/' + repairId,
    method: 'delete'
  })
}
