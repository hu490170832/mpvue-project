const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {bookid, openid} = ctx.request.query
    let commentList = mysql('comments')
        .select('comments.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
        .orderBy('id', 'desc')

    if (bookid) {
        commentList = await commentList.where('bookid', bookid)
    } else if (openid) {
        commentList = await commentList.where('openid', openid)
    }

    commentList = commentList.map(v => {
        v.user_info = JSON.parse(v.user_info)
        return v
    })
    ctx.state.data = {
        commentList
    }
}
