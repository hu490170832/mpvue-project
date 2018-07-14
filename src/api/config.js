export const host = 'http://172.16.18.35:5757'
// export const host = 'http://192.168.0.122:5757'
// export const host = 'https://s35dsezw.qcloud.la'
export const ERR_OK = 0

export function get (url, data = {}) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: host + url,
      data,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        wx.hideLoading()
        if (res.data.code === ERR_OK) {
          resolve(res.data)
        } else {
          wx.showToast({
            title: res.data.msg ? res.data.msg : '服务器错误',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: reject,
      complete: function () {
        // complete
      }
    })
  }).catch(err => {
    wx.hideLoading()
    wx.showToast({
      title: '网络错误',
      icon: 'none',
      duration: 2000
    })
    return err
  })
}

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: host + url,
      data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        wx.hideLoading()
        if (res.data.code === ERR_OK) {
          resolve(res.data)
        } else {
          wx.showToast({
            title: res.data.msg ? res.data.msg : '服务器错误',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: reject,
      complete: function () {
        // complete
      }
    })
  }).catch(err => {
    wx.hideLoading()
    wx.showToast({
      title: '网络错误',
      icon: 'none',
      duration: 2000
    })
    return err
  })
}
