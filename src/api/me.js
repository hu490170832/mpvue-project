import qcloud from 'wafer2-client-sdk'
import {config} from './config'
import {getStorageUserInfo,setStorageUserInfo} from '@/common/cache'
export function login() {
    
    return new Promise(function(resolve,reject){
        var userInfo = getStorageUserInfo()
        console.log(userInfo)
        if(userInfo) {
            resolve(userInfo)
            return
        }
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
            success: function(res) {
                resolve(res)
                setStorageUserInfo(res)
                // console.log(res)
            }
        })
    })
    
}
