import request from '@/utils/request2'

export function getList(data) {
  return request({
    url: '/rbac/api/system/dept/list',
    method: 'post',
    data
  })
}

export function modify(data) {
  return request({
    url: '/rbac/api/system/dept/edit',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/rbac/api/system/dept/add/'+ data.parentId,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/rbac/api/system/dept/remove/'+ id,
    method: 'post',
  })
}

export function treeData() {
  return request({
    url: '/rbac/api/system/dept/treeData',
    method: 'post',
  })
}