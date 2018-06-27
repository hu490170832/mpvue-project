import {get} from './config'
export function getBookDetail(params) {
    return get('/weapp/bookDetail',params)
}