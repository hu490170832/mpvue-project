import Vue from 'vue'
import {get,post} from './config'

const api = {
    get,
    post,
    ERR_OK: 0
}
api.install = (Vue)=>{
    Vue.prototype.$http = api
}

export default api