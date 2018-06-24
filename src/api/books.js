import {host,get} from './config'
export function getBookList() {
    return get('/weapp/getBookList')
}