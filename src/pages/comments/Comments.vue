<template>
    <div class="comments">
        <comment-list type='user' :commentList='commentList'></comment-list>
        <div class="myBooks">
            <div class="title">我的图书</div>
            <div class="mybook-list">
                <book-list :bookList='bookList'></book-list>
                <div class="noMore text-center" v-show="!hasMore">没有更多啦~</div>
                <div class="tips text-center" v-show="bookList.length==0">暂时还没有图书，快去添加几本吧~</div>
            </div>
        </div>
    </div>
</template>

<script>
    import commentList from '@/components/commentList'
    import {
        getCommentList
    } from '@/api/bookDetail'
    import {
        getBookList
    } from '@/api/books'
    import {
        ERR_OK
    } from '@/api/config'
    import {
        getStorageUserInfo
    } from '@/common/cache'
    import bookList from '@/components/bookList'
    export default {
        data() {
            return {
                userInfo: {},
                commentList: [],
                bookList: [],
                page: 0,
                hasMore: true
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.userInfo = getStorageUserInfo()
                this._getCommentList()
                this._getMybooks(true)
            },
            async _getCommentList() {
                const res = await getCommentList({
                    openid: this.userInfo.openId
                })
                if (res.code === ERR_OK) {
                    this.commentList = res.data.commentList
                }
            },
            async _getMybooks(init) {
                if(init) {
                    this.page = 0,
                    this.hasMore = true
                }
                const res = await getBookList({
                    openid: this.userInfo.openId,
                    page: this.page
                })
                if (res.code === ERR_OK) {
                    if(init) {
                        this.bookList = res.data.bookList
                    }else {
                        if (res.data.bookList.length > 0) {
                            this.bookList = this.bookList.concat(res.data.bookList)
                        } else {
                            this.hasMore = false
                        }
                    }
                }
            },
        },
        onPullDownRefresh() {
            this.init()
            wx.stopPullDownRefresh(true)
        },
        onReachBottom() {
            if (!this.hasMore) {
                return
            }
            this.page++
            this._getMybooks()
        },
        components: {
            commentList,
            bookList
        }
    }
</script>

<style lang='stylus' scoped>
    .title
        background #eeedef
        padding-left 20px
        height 40px
        line-height 40px
    .mybook-list
        margin-top 20px
</style>