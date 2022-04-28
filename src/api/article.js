import service from "../utils/axios"

export function saveArticle(data) {
    return service.request({
        method: 'post',
        url: '/article',
        data
    })
}

export function getArticle(id) {
    return service.request({
        method: 'get',
        url: `/article/${id}`,
    })
}

export function getAllArticles() {
    return service.request({
        method: 'get',
        url: '/article/list',
    })
}