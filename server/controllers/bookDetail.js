const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const id = ctx.request.query.id
    const bookDetail = await mysql('books')
        .where('id', id)
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .first()
    const userInfo = JSON.parse(bookDetail.user_info)
    delete bookDetail.user_info

    ctx.state.data = {
        bookInfo: Object.assign({}, bookDetail, {
            tags: bookDetail.tags.split(','),
            summary: bookDetail.summary.split('\n')
        }),
        userInfo: {
            name: userInfo.nickName,
            image: userInfo.avatarUrl
        }
    }
    await mysql('books')
        .where('id', id)
        .increment('count', 1)
}
