import request from '@/utils/request'

// 查询领导审批列表
export function listManagerOpinion(query) {
  return request({
    url: '/apartment/managerOpinion/list',
    method: 'get',
    params: query
  })
}

// 查询领导审批详细
export function getManagerOpinion(repairId) {
  return request({
    url: '/apartment/managerOpinion/' + repairId,
    method: 'get'
  })
}

// 新增领导审批
export function addManagerOpinion(data) {
  return request({
    url: '/apartment/managerOpinion',
    method: 'post',
    data: data
  })
}

// 修改领导审批
export function updateManagerOpinion(data) {
  return request({
    url: '/apartment/managerOpinion',
    method: 'put',
    data: data
  })
}

// 删除领导审批
export function delManagerOpinion(repairId) {
  return request({
    url: '/apartment/managerOpinion/' + repairId,
    method: 'delete'
  })
}
