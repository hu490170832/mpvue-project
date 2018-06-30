const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const body = ctx.request.body
    const {openid,location,comment,phone,bookid} = body
    await mysql('comments').insert({bookid, comment, openid, location, phone})
    ctx.state.data = {
        title: '评论成功'
    }
}