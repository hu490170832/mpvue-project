import { resolve } from "path";

export const host = 'http://192.168.0.122:5757'
export const ERR_OK = 0

export function get(url,data={}) {
    return new Promise((resolve,reject)=>{
        wx.request({
            url:host+url,
            data,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                resolve(res.data)
            },
            fail: reject,
            complete: function() {
                // complete
            }
        })
    }).catch(err=>{
        wx.showToast({
            title: '网络错误',
            icon: 'none',
            duration: 2000
        })
        return err
    })
}

export function post(url,data={}) {
    return new Promise((resolve,reject)=>{
        wx.request({
            url:host+url,
            data,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                resolve(res.data)
            },
            fail: reject,
            complete: function() {
                // complete
            }
        })
    }).catch(err=>{
        wx.showToast({
            title: '网络错误',
            icon: 'none',
            duration: 2000
        })
        return err
    })
}