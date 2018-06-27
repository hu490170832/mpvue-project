import {get} from './config'
export function getBookList(params) {
    return get('/weapp/getBookList',params)
}

export function getTopList() {
    return get('/weapp/getTopList')
}