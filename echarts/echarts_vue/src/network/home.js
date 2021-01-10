import { request } from './request'

export function getMapData() {
    return request({
        url: '/map'
    })
}
export function getBudgetData() {
    return request({
        url: '/budget'
    })
}
export function getHotproductData() {
    return request({
        url: '/hotproduct'
    })
}
export function getRankData() {
    return request({
        url: '/rank'
    })
}
export function getSellerData() {
    return request({
        url: '/seller'
    })
}
export function getStockData() {
    return request({
        url: '/stock'
    })
}
export function getTrendData() {
    return request({
        url: '/trend'
    })
}