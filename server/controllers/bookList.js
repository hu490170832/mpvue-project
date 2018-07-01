const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const { page, openid } = ctx.request.query
    const size = 10
    let books = mysql('books').select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .limit(size)
        .offset(Number(page) * size)
        .orderBy('books.id', 'desc')
    if (openid) {
        books = await books.where('openid', openid)
    } else {
        books = await books
    }
    ctx.state.data = {
        bookList: books.map(v => {
            const userInfo = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: userInfo.nickName
                }
            })
        })
    }
}
