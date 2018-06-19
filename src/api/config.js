import { resolve } from "path";

export const host = 'http://192.168.0.122:5757'

export function get(url,data) {
    return new Promise((reolve,reject)=>{
        wx.request({
            url:host+url,
            data,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: resolve,
            fail: reject,
            complete: function() {
                // complete
            }
        })
    })
}

export function post(url,data) {
    return new Promise((resolve,reject)=>{
        wx.request({
            url:host+url,
            data,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: resolve,
            fail: reject,
            complete: function() {
                // complete
            }
        })
    })
}