const USERINFO_KEY = '_userInfo_'
export function getStorageUserInfo () {
  return wx.getStorageSync(USERINFO_KEY)
}
export function setStorageUserInfo (data) {
  wx.setStorageSync(USERINFO_KEY, data)
}
