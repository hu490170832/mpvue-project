import {get,post,ERR_OK} from './config'
export function getBookDetail(params) {
    return get('/weapp/bookDetail',params)
}

export function getPlace(location) {
    return new Promise((resolve,reject)=>{
        const ak = '4CQL6y6XkmpKBlQp2tFHezTlFLNDkicg'
        console.log(location)
        let params = {
            location,
            output:'json',
            pois:1,
            ak
        }
        // http://api.map.baidu.com/geocoder/v2?location=35.658651,139.745415&output=json&pois=1&ak=4CQL6y6XkmpKBlQp2tFHezTlFLNDkicg//GET请求
        wx.request({
            url: 'http://api.map.baidu.com/geocoder/v2/',
            data: params,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                if(res.data.status == ERR_OK) {
                    resolve(res.data.result)
                }else {
                    wx.showToast({
                        title: '百度地图接口错误',
                        icon: 'none',
                        duration: 2000
                    })
                }
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

export function addComment(data) {
    return post('/weapp/addcomment',data)
}

export function getCommentList(bookid) {
    return get('/weapp/commentList',{bookid})
}