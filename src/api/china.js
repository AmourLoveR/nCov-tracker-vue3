import service from "../utils/request"

// 获取seller
export function getChina() {
    return service.request({
        method: 'get',
        url: '/statistics/china',
    })
}

export function getProvience(sort) {
    return service.request({
        method: 'get',
        url: '/statistics/provience/' + sort,
    })
}