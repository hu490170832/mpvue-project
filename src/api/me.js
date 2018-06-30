import qcloud from 'wafer2-client-sdk'
import {host, post} from './config'
import {getStorageUserInfo, setStorageUserInfo} from '@/common/cache'

export function login () {
  return new Promise(function (resolve, reject) {
    var userInfo = getStorageUserInfo()
    if (userInfo) {
      resolve(userInfo)
      return
    }
    qcloud.setLoginUrl(host + '/weapp/login')
    qcloud.login({
      success: function (res) {
        resolve(res)
        setStorageUserInfo(res)
        // console.log(res)
      }
    })
  })
}

export async function addBook (data) {
  return post('/weapp/addBook', data)
}
