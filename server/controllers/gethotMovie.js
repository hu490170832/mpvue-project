const getJSON = require('./common')

module.exports = async (ctx)=>{
    const hotList = await getJSON('https://api.douban.com/v2/movie/in_theaters')
    const soonList = await getJSON('https://api.douban.com/v2/movie/coming_soon')
    const topList = await getJSON('https://api.douban.com/v2/movie/top250')
    ctx.state.data = {
        hotList,
        soonList,
        topList
    }
}