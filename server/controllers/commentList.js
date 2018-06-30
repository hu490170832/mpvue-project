const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const {bookid} = ctx.request.query
    let commentList = await mysql('comments')
                            .select('comments.*','cSessionInfo.user_info')
                            .where('bookid',bookid)
                            .join('cSessionInfo','comments.openid','cSessionInfo.open_id')
                            .orderBy('id','desc')
    commentList = commentList.map(v=>{
        // console.log(v)
        v.user_info= JSON.parse(v.user_info) 
        return v
    })
    ctx.state.data = {
        commentList
    }
}