<template>
  <div class="books">
    <div class="bookList">
      <div v-for='item in bookList' :key = 'item.id' class="item">
        <div class="img">
          <img mode = 'aspectFit' :src='item.image' />
        </div>
        <div class="content">
          <div class="line">
            <span class="title">{{item.title}}</span>
            <span class="rate">{{item.rate}}</span>
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
  import {
    ERR_OK
  } from "@/api/config";
  export default {
    data() {
      return {
        bookList: []
      }
    },
    created() {
      this._getBookList()
    },
    methods: {
      async _getBookList() {
        let res = await getBookList()
        console.log(res)
        if (res.code == ERR_OK) {
          this.bookList = res.data.bookList
        }
      }
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
</style>