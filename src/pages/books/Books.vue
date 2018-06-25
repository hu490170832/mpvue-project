<template>
  <div class="books">
    <div class="bookList">
      <div v-for='item in bookList' :key = 'item.id' class="item">
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
            <span class="pv">{{item.count}}</span>
          </div>
          <div class="line">
            <span class="publisher">{{item.publisher}}</span>
            <div class="addBookName"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getBookList
  } from '@/api/books'
  import rate from '@/components/rate'
  import {
    ERR_OK
  } from "@/api/config";
  export default {
    data() {
      return {
        bookList: []
      }
    },
    onShow() {
      this._getBookList()
    },
    methods: {
      async _getBookList() {
        let res = await getBookList()
        if(res.code == ERR_OK) {
          this.bookList = res.data.bookList
        }
      }
    },
    components: {
      rate
    }
  }
</script>

<style lang='stylus' scoped>
  .books
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
</style>