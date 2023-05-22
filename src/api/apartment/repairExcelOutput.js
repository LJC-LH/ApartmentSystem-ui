import request from '@/utils/request'

// 查询维修明细列表
export function listRepairExcelOutput(query) {
  return request({
    url: '/apartment/repairExcelOutput/list',
    method: 'get',
    params: query
  })
}

// 查询维修明细详细
export function getRepairExcelOutput(repairId) {
  return request({
    url: '/apartment/repairExcelOutput/' + repairId,
    method: 'get'
  })
}

// 新增维修明细
export function addRepairExcelOutput(data) {
  return request({
    url: '/apartment/repairExcelOutput',
    method: 'post',
    data: data
  })
}

// 修改维修明细
export function updateRepairExcelOutput(data) {
  return request({
    url: '/apartment/repairExcelOutput',
    method: 'put',
    data: data
  })
}

// 删除维修明细
export function delRepairExcelOutput(repairId) {
  return request({
    url: '/apartment/repairExcelOutput/' + repairId,
    method: 'delete'
  })
}
