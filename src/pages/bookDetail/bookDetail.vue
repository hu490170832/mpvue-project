<template>
    <div class="bookDetail">
        <div class="info">
            <div @click="previewImg" class="bookimg">
                <img class="bg" :src="bookInfo.image" alt="">
                <div class="img">
                    <img mode='aspectFit' :src="bookInfo.image" alt="">
                    <div class="book-name text-center">{{bookInfo.title}}</div>
                    <div class="author text-center">{{bookInfo.author}}</div>
                </div>
            </div>
            <div class="desc">
                <div class="line1">
                    <span class="nickName">
                        <img class="userImg" :src="userInfo.image" alt="">
                        <span class="userName">{{userInfo.name}}</span>
                    </span>
                    <span class="rate">
                        <span class="text-red-color point">{{bookInfo.rate}}分</span>
                        <rate :rate='bookInfo.rate'></rate>
                    </span>
                </div>
                <div class="line2">
                    <span class="publisher">{{bookInfo.publisher}}</span>
                    <span class="price">{{bookInfo.price}}</span>
                </div>
                <div class="tags">
                    <span class="tag-item text-red-color" v-for="(item,index) in bookInfo.tags" :key="index">{{item}}</span>
                </div>
                <div class="summary">
                    <p v-for="(item,index) in bookInfo.summary" :key="index">{{item}}</p>
                </div>
            </div>
        </div>
        <comment-list v-if="isAlreadyComment" :commentList='commentList'></comment-list>
        <div class="comment" v-else>
            <textarea class="textarea" maxlength="100" v-model="comment" placeholder="请输入图书短评"></textarea>
            <div class="other">
                <div class="place">
                    <label>地理位置:<switch @change="placeChange" color='#EA5149' class="switch"></switch></label>
                    <span class="city text-red-color">{{city}}</span>
                </div>
                <div class="phone">
                    <label>手机型号:<switch @change='phoneChange' color='#EA5149' class="switch"></switch></label>
                    <span class="phoneType text-red-color">{{phoneType}}</span>
                </div>
            </div>
            <button class="addcommon bg-red-color" @click="addcommentClick">评论</button>
        </div>
        <button open-type='share' class="bg-red-color share-btn">转发给好友</button>
    </div>
</template>

<script>
    import {getBookDetail, getPlace, addComment, getCommentList} from '@/api/bookDetail'
    import {getStorageUserInfo} from '@/common/cache'
    import {ERR_OK} from '@/api/config'
    import rate from '@/components/rate'
    import commentList from '@/components/commentList'
    export default {
      data () {
        return {
          bookId: '',
          bookInfo: {},
          userInfo: {},
          comment: '',
          commentList: [],
          phoneType: '',
          city: '',
          openid: ''
        }
      },
      computed: {
        isAlreadyComment () {
          return this.commentList.filter(v => {
            return v.openid === this.openid
          }).length > 0
        }
      },
      mounted () {
        let bookId = this.$root.$mp.query.id
        this.bookId = bookId
        const userInfo = getStorageUserInfo()
        console.log(userInfo)
        this.openid = userInfo ? userInfo.openId : ''
        this._getBookDetail()
        this._getCommentsList()
      },
      onShareAppMessage: function (res) {
        return {
          title: this.bookInfo.title,
          path: 'pages/bookDetail/main?id=' + this.bookId
        }
      },
      methods: {
        async _getBookDetail () {
          let res = await getBookDetail({
            id: this.bookId
          })
          if (res.code === ERR_OK) {
            this.bookInfo = res.data.bookInfo
            this.userInfo = res.data.userInfo
            wx.setNavigationBarTitle({
              title: res.data.bookInfo.title
            })
          }
        },
        async _getCommentsList () {
          let res = await getCommentList(this.bookId)
          if (res.code === ERR_OK) {
            this.commentList = res.data.commentList
          }
          console.log(res)
        },
        previewImg () {
          wx.previewImage({
            current: this.bookInfo.image, // 当前显示图片的http链接
            urls: [this.bookInfo.image] // 需要预览的图片http链接列表
          })
        },
        placeChange (e) {
          const checked = e.target.value
          if (checked) {
            wx.getLocation({
              success: async res => {
                const location = res.latitude + ',' + res.longitude
                const placeInfo = await getPlace(location)
                this.city = placeInfo.addressComponent.city
              }
            })
          }
        },
        phoneChange (e) {
          const checked = e.target.value
          if (checked) {
            const stystemInfo = wx.getSystemInfoSync()
            this.phoneType = stystemInfo.model
          } else {
            this.phoneType = ''
          }
        },
        async addcommentClick () {
          const data = {
            bookid: this.bookId,
            comment: this.comment,
            location: this.city,
            openid: this.openid,
            phone: this.phoneType
          }
          const res = await addComment(data)
          if (res.code === ERR_OK) {
            wx.showLoading({
              title: res.data.title,
              mask: true
            })
          }
        }
      },
      components: {
        rate,
        commentList
      }
    }
</script>

<style lang='stylus' scoped>
    .bookDetail
        .info
            .bookimg
                height 250px
                overflow hidden
                position relative
                .bg
                    filter: blur(15px);
                    width 100%
                .img
                    position absolute
                    left 50%
                    height 150px
                    top 10px
                    transform translateX(-50%)
                    img
                        width 100%
                        height 100%
                    .book-name,.author
                        color #fff
                    .book-name
                        font-size 16px
                    .author
                        font-size 14px
        .desc
            margin-top 20px
            .line1,.line2
                display flex
                align-items center
                justify-content space-between
                padding 0 10px
                margin-bottom 10px
                .nickName
                    display flex
                    align-items center
                    .userImg
                        width 20px
                        height 20px
                        border-radius 50%
                        margin-right 4px
                .rate
                    display flex
                    align-items center
                    .point
                        margin-right 10px
            .tags
                display flex
                flex-wrap wrap
                padding-left 10px
                .tag-item
                    border 1px solid #EA5149
                    padding 3px 4px
                    margin-right 6px
                    margin-bottom 10px
                    border-radius 10px
                    font-size 12px
                    display block
            .summary
                padding 0 10px
                p
                    text-indent 2em
        .comment
            margin-top 10px
            .textarea
                background #eeedef
                width 100%
                padding-left 10px
                padding-top 10px
                height 80px
                box-sizing border-box
        .other
            color #333
            padding-left 20px
            padding-bottom 20px
            .place
                margin 20px 0
            .phone
                margin-bottom 20px
            .phoneType,.city
                margin-left 20px
            .switch
                height 20px
        .addcommon,.share-btn
            color #fff
            font-size 14px
            margin-bottom 10px


</style>