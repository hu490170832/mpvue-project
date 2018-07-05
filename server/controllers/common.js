const https = require('https')

const axios = require('axios')

// module.exports = function getJSON (url) {
//     return new Promise((resolve, reject) => {
//         https.get(url, res => {
//             let urlData = ''
//             res.on('data', data => {
//                 urlData += data
//             })
//             res.on('end', data => {
//                 const bookinfo = JSON.parse(urlData)
//                 if (bookinfo.title) {
//                     resolve(bookinfo)
//                 } else {
//                     reject(bookinfo)
//                 }
//             })
//         })
//     })
// }

module.exports = function getJSON (url,params) {
    return new Promise((resolve,reject)=>{
        return axios.get(url, {
            params
        }).then(res=>{
            resolve(res.data)
        })
    })
    
}