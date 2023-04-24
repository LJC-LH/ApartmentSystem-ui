import request from '@/utils/request'

// 查询二次派单列表
export function listSecondSelectRepairman(query) {
  return request({
    url: '/apartment/secondSelectRepairman/list',
    method: 'get',
    params: query
  })
}

// 查询二次派单详细
export function getSecondSelectRepairman(repairId) {
  return request({
    url: '/apartment/secondSelectRepairman/' + repairId,
    method: 'get'
  })
}

// 新增二次派单
export function addSecondSelectRepairman(data) {
  return request({
    url: '/apartment/secondSelectRepairman',
    method: 'post',
    data: data
  })
}

// 修改二次派单
export function updateSecondSelectRepairman(data) {
  return request({
    url: '/apartment/secondSelectRepairman',
    method: 'put',
    data: data
  })
}

// 删除二次派单
export function delSecondSelectRepairman(repairId) {
  return request({
    url: '/apartment/secondSelectRepairman/' + repairId,
    method: 'delete'
  })
}
