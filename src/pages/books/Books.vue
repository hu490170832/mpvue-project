<template>
  <div class="books">
    <div class="swiper">
      <swiper
        :autoplay="true" interval='2000' duration='300' display-multiple-items='3'>
        <div v-for='item in topList' :key="item.id">
          <swiper-item>
            <img @click="goDetail(item.id)" mode = 'aspectFit' :src="item.image" class="slide-image"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <book-list :bookList='bookList'></book-list>
    <div class="nobook text-center" v-show="bookList.length === 0">
      <p>暂时还没有图书快去添加几本把</p>
      <addbook-btn></addbook-btn>
    </div>
    <div class="noMore" v-show="!hasMore">没有更多数据了~</div>
  </div>
</template>

<script>
  import {
    getBookList, getTopList
  } from '@/api/books'
  import bookList from '@/components/bookList'
  import addbookBtn from '@/components/addBookBtn' 
  import {
    ERR_OK
  } from '@/api/config'
export default {
    data () {
      return {
        bookList: [],
        topList: [],
        page: 0,
        hasMore: true
      }
    },
    mounted () {
      this._getBookList(true)
      this._getTopList()
    },
    async onPullDownRefresh () {
      await this._getBookList(true)
      this._getTopList()
    },
    onReachBottom () {
      if (!this.hasMore) {
        return
      }
      this.page++
      this._getBookList()
    },
    methods: {
      async _getTopList () {
        const res = await getTopList()
        if (res.code === ERR_OK) {
          this.topList = res.data.topList
        }
      },
      async _getBookList (init) {
        if (init) {
          this.page = 0
          this.hasMore = true
        }
        wx.showNavigationBarLoading()
        let res = await getBookList({
          page: this.page
        })
        if (init && res.code === ERR_OK) {
          wx.stopPullDownRefresh()
          this.bookList = res.data.bookList
        }
        if (res.code === ERR_OK && !init) {
          if (res.data.bookList.length > 0) {
            this.bookList = this.bookList.concat(res.data.bookList)
          } else {
            this.hasMore = false
          }
        }
        wx.hideNavigationBarLoading()
      },
      goDetail (id) {
        wx.navigateTo({
          url: '/pages/bookDetail/main?id=' + id
        })
      },
      previewImage (imgUrl) {
        wx.previewImage({
          current: imgUrl, // 当前显示图片的http链接
          urls: [imgUrl] // 需要预览的图片http链接列表
        })
      }
    },
    components: {
      bookList,
      addbookBtn
    }
  }
</script>


<style lang='stylus' scoped>
  .books
    .swiper
      margin-bottom 20px
      .slide-image
        width 100%
        height 100%
    .bookList
      .item
        display flex
        margin-bottom 20px
        .img
          width 90px
          height 90px
          img
            max-width 100%
            max-height: 100%;
        .content
          flex 1  
          padding-right 20px
          .line
            display flex
            justify-content space-between
            &.title-line
              color #EA5149
            .right
              display flex
    .noMore
      text-align center
</style>