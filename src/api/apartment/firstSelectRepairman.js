import request from '@/utils/request'

// 查询一次派单列表
export function listFirstSelectRepairman(query) {
  return request({
    url: '/apartment/firstSelectRepairman/list',
    method: 'get',
    params: query
  })
}

// 查询一次派单详细
export function getFirstSelectRepairman(repairId) {
  return request({
    url: '/apartment/firstSelectRepairman/' + repairId,
    method: 'get'
  })
}

// 新增一次派单
export function addFirstSelectRepairman(data) {
  return request({
    url: '/apartment/firstSelectRepairman',
    method: 'post',
    data: data
  })
}

// 修改一次派单
export function updateFirstSelectRepairman(data) {
  return request({
    url: '/apartment/firstSelectRepairman',
    method: 'put',
    data: data
  })
}

// 删除一次派单
export function delFirstSelectRepairman(repairId) {
  return request({
    url: '/apartment/firstSelectRepairman/' + repairId,
    method: 'delete'
  })
}

// 根据角色ID查询用户信息
export function selectUserByRoleId(roleId) {
  return request({
    url: `/apartment/firstSelectRepairman/selectUserByRoleId/` + roleId,
    method: 'get'
  })
}

