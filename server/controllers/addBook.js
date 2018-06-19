var https = require('https')

module.exports = async (ctx)=>{
    var body = ctx.request.body
    try{
        await getJSON(`https://api.douban.com/v2/book/${body.isbn}`)
    } catch(err) {
        console.log('错了',err)
    }
}

function getJSON(url) {
    return new Promise((resolve,reject)=>{
        https.get(url,res=>{
            let urlData = ''
            res.on('data', data=>{
                urlData += data
            })
            res.on('end', data=>{
                const bookinfo = JSON.parse(urlData)
                console.log(bookinfo)
                if(bookinfo.title) {
                    resolve(bookinfo)
                }else{
                    reject(bookinfo)
                }
            })
            
        })
    })
}