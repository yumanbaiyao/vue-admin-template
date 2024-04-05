import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/system/user/login',
    url: '/rbac/api/system/user/login',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function getMenus(data) {
  return request({
    url: '/rbac/api/system/menu/menusByUser/' + data,
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/rbac/api/system/user/logout',
    method: 'post'
  })
}
