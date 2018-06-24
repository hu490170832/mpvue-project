const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const books = await mysql('books').select('*')
    ctx.state.data = {
        bookList: books
    }
}
