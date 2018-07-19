const getJSON = require('./common')
const async = require('async')

module.exports = async (ctx)=>{
    const {type,page} = ctx.request.query
    if(type==1) {
        const hotList = await getJSON('https://api.douban.com/v2/movie/in_theaters',{
            page
        })
        ctx.state.data = hotList
    }else if(type==2) {
        const soonList = await getJSON('https://api.douban.com/v2/movie/coming_soon',{
            page
        })
        ctx.state.data = soonList
    }else if(type==3) {
        const topList = await getJSON('https://api.douban.com/v2/movie/top250',{
            page
        })
        ctx.state.data = topList
    }else {
        const res = await new Promise(resolve=>{
            async.parallel([
                function(callback) {
                    getJSON('https://api.douban.com/v2/movie/in_theaters').then((res)=>{
                        callback(null,res)
                    })
                },
                function(callback) {
                    getJSON('https://api.douban.com/v2/movie/coming_soon').then((res)=>{
                        callback(null,res)
                    })
                },
                function(callback) {
                    getJSON('https://api.douban.com/v2/movie/top250').then((res)=>{
                        callback(null,res)
                    })
                }
            ], function(err, results){
                // results = [hotList: {},soonList: {},topList: {}]
                let res = {
                    hotList: results[0],
                    soonList: results[1],
                    topList: results[2]
                }
                resolve(res)
            });
        })
        ctx.state.data = res
        
        // ctx.state.data = {
        //     hotList,
        //     soonList,
        //     topList
        // }
    }
    
}