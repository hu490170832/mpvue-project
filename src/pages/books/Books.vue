<template>
  <div class="books">
    <div class="swiper">
      <swiper
        :autoplay="false" interval="1000" duration="1000" display-multiple-items='3'>
        <div v-for='item in topList' :key="item.id">
          <swiper-item>
            <image mode = 'aspectFit' :src="item.image" class="slide-image"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <div class="bookList">
      <a :href="'/pages/bookDetail/main?id='+item.id" v-for='item in bookList' :key = 'item.id' class="item">
        <div class="img">
          <img mode = 'aspectFit' :src='item.image' />
        </div>
        <div class="content">
          <div class="line title-line">
            <span class="title">{{item.title}}</span>
            <div class="right">
              <span class="rate">{{item.rate}}</span>
              <rate :rate='item.rate'></rate>
            </div>
          </div>
          <div class="line">
            <span class="author">{{item.author}}</span>
            <span class="pv">浏览量:{{item.count}}</span>
          </div>
          <div class="line">
            <span class="publisher">{{item.publisher}}</span>
            <div class="addBookName">添加人:{{item.user_info.nickName}}</div>
          </div>
        </div>
      </a>
    </div>
    <div class="noMore" v-show="!hasMore">没有更多数据了~</div>
  </div>
</template>

<script>
  import {
    getBookList,getTopList
  } from '@/api/books'
  import rate from '@/components/rate'
  import {
    ERR_OK
  } from "@/api/config";
  export default {
    data() {
      return {
        bookList: [],
        topList: [],
        page:0,
        hasMore: true
      }
    },
    mounted() {
      this._getBookList()
      this._getTopList()
    },
    async onPullDownRefresh() {
      await this._getBookList(true)
    },
    onReachBottom() {
      if(!this.hasMore) {
        return
      }
      this.page++
      this._getBookList()
    },
    methods: {
      async _getTopList() {
        const res = await getTopList()
        if(res.code == ERR_OK) {
          this.topList = res.data.topList
        }
      },
      async _getBookList(init) {
        if(init) {
          this.page = 0
          this.hasMore = true
        }
        wx.showNavigationBarLoading()
        let res = await getBookList({
          page: this.page
        })
        if(init && res.code == ERR_OK) {
          wx.stopPullDownRefresh()
          this.bookList = res.data.bookList
        }
        if(res.code == ERR_OK && !init ) {
          if(res.data.bookList.length>0) {
            this.bookList = this.bookList.concat(res.data.bookList)
          }else {
            this.hasMore = false
          }
        }
        wx.hideNavigationBarLoading()
      }
    },
    components: {
      rate
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