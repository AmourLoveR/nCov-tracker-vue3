import service from "../utils/axios"

export function getChina() {
    return service.request({
        method: 'get',
        url: '/statistics/china',
    })
}

export function getProvince(sort) {
    return service.request({
        method: 'get',
        url: `/statistics/provience/${sort}`,
    })
}

export function getCity(sort) {
    return service.request({
        method: 'get',
        url: `/statistics/city/${sort}`,
    })
}