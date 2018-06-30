const https = require('https')
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const body = ctx.request.body
    const {openid, isbn} = body
    if (!openid || !isbn) {
        ctx.state = {
            code: -1,
            msg: '参数错误'
        }
        return
    }
    const findRes = await mysql('books').select().where('isbn', isbn)
    if (findRes.length) {
        ctx.state = {
            code: -1,
            msg: '图书已存在'
        }
        return
    }
    const res = await getJSON(`https://api.douban.com/v2/book/isbn/${isbn}`)
    const rate = res.rating.average
    const author = res.author.join(',')
    const tags = res.tags.map(item => {
        return item.title + ' ' + item.count
    }).join(',')
    const {title, image, alt, price, summary, publisher} = res

    await mysql('books').insert({
        isbn, openid, rate, title, image, alt, publisher, summary, price, tags, author
    })
    ctx.state.data = {
        title
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    resolve(bookinfo)
                } else {
                    reject(bookinfo)
                }
            })
        })
    })
}
