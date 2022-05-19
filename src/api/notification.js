import service from "../utils/axios"

export function getNotifyCount() {
  return service.request({
      method: 'get',
      url: '/notify/count',
  })
}

export function getNotification(start, end) {
  return service.request({
    method: 'get',
    url: `notify/${start}/${end}`
  })
}

export function deleteNotification(index) {
  return service.request({
    method: 'delete',
    url: `notify/${index}`
  })
}