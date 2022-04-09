import service from "../utils/axios"

export function getAllArticles() {
    return service.request({
        method: 'get',
        url: '/article/list',
    })
}