<template>
    <div class="comments">
        <comment-list type='user' :commentList='commentList'></comment-list>
        <div class="myBooks">
            <div class="title">我的图书</div>
            <div class="mybook-list">
                <book-list :bookList='bookList'></book-list>
                <div class="tips text-center" v-show="bookList.length==0">暂时还没有图书，快去添加几本吧~</div>
            </div>
        </div>
    </div>
</template>

<script>
    import commentList from '@/components/commentList'
    import {getCommentList} from '@/api/bookDetail'
    import {getBookList} from '@/api/books'
    import {ERR_OK} from '@/api/config'
    import {getStorageUserInfo} from '@/common/cache'
    import bookList from '@/components/bookList'
    export default {
      data () {
        return {
          userInfo: {},
          commentList: [],
          bookList: [],
          page: 0
        }
      },
      mounted () {
        this.init()
      },
      methods: {
        init () {
          this.userInfo = getStorageUserInfo()
          this._getCommentList()
          this._getMybooks()
        },
        async _getCommentList () {
          const res = await getCommentList({
            openid: this.userInfo.openId
          })
          if (res.code === ERR_OK) {
            this.commentList = res.data.commentList
          }
        },
        async _getMybooks () {
          const res = await getBookList({
            openid: this.userInfo.openId,
            page: this.page
          })
          if (res.code === ERR_OK) {
            this.bookList = res.data.bookList
          }
        }
      },
      onPullDownRefresh () {
        this.init()
        wx.stopPullDownRefresh()
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