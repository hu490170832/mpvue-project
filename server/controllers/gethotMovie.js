const getJSON = require('./common')

module.exports = async (ctx)=>{
    const hotList = await getJSON('https://api.douban.com/v2/movie/in_theaters')
    ctx.state.data = {
        hotMovie: hotList
    }
}