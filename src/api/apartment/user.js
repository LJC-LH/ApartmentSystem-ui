import request from '@/utils/request'

// 查询用户信息列表
export function listUser(query) {
  return request({
    url: '/apartment/user/list',
    method: 'get',
    params: query
  })
}

export function listFdyUser(query) {
  return request({
    url: '/apartment/user/fdylist',
    method: 'get',
    params: query
  })
}

export function getRoot() {
  return request({
    url: '/apartment/user/root',
    method: 'get',
  })
}

// 查询用户信息详细
export function getUser(userId) {
  return request({
    url: '/apartment/user/' + userId,
    method: 'get',
  })
}

// 新增用户信息
export function addUser(data) {
  return request({
    url: '/apartment/user',
    method: 'post',
    data: data
  })
}

// 修改用户信息
export function updateUser(data) {
  return request({
    url: '/apartment/user',
    method: 'put',
    data: data
  })
}

// 删除用户信息
export function delUser(userId) {
  return request({
    url: '/apartment/user/' + userId,
    method: 'delete'
  })
}

//修改用户的时间权限
// export function updateRoot(userId) {
//   return request({
//     url: '/apartment/user/' + userId,
//     method: 'delete'
//   })
// }
