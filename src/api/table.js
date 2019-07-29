import request from '@/utils/request'

export function postList(data) {
  return request({
    url: '/admin/sign/list',
    method: 'post',
    data
  })
}
