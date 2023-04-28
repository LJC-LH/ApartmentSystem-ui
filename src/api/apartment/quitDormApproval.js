import request from '@/utils/request'

// 查询休学宿舍退宿列表
export function listQuitDormApproval(query) {
  return request({
    url: '/apartment/quitDormApproval/list',
    method: 'get',
    params: query
  })
}

// 查询休学宿舍退宿详细
export function getQuitDormApproval(quitId) {
  return request({
    url: '/apartment/quitDormApproval/' + quitId,
    method: 'get'
  })
}

// 新增休学宿舍退宿
export function addQuitDormApproval(data) {
  return request({
    url: '/apartment/quitDormApproval',
    method: 'post',
    data: data
  })
}

// 修改休学宿舍退宿
export function updateQuitDormApproval(data) {
  return request({
    url: '/apartment/quitDormApproval',
    method: 'put',
    data: data
  })
}

// 删除休学宿舍退宿
export function delQuitDormApproval(quitId) {
  return request({
    url: '/apartment/quitDormApproval/' + quitId,
    method: 'delete'
  })
}

export function getInfo(userName) {
  return request({
    url: '/apartment/quitDormApproval/getInfo/' + userName,
    method: 'get'
  })
}


export function deleteAndUpdateDormInfo(data) {
  return request({
    url: '/apartment/quitDormApproval/deleteAndUpdateDormInfo',
    method: 'post',
    data: data
  })
}

