import service from "../utils/axios"

export function getUserArticles(type) {
    return service.request({
        method: 'get',
        url: `/article/list/${type}`,
    })
}

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

export function deleteArticle(id) {
    return service.request({
        method: 'delete',
        url: `/article/${id}`,
    })
}

export function publish(id) {
    return service.request({
        method: 'post',
        url: `/article/${id}/publish`
    })
}