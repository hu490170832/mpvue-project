<template>
  <div class="bookList">
    <a :href="'/pages/bookDetail/main?id='+item.id" v-for='item in bookList' :key='item.id' class="item">
      <div class="img">
        <img @click.stop="previewImage(item.image)" mode='aspectFit' :src='item.image' />
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
</template>

<script>
  import rate from '@/components/rate'
  export default {
    props: {
      bookList: {
        type: Array,
        default: []
      }
    },
    components: {
      rate
    }
  }
</script>

<style lang='stylus' scoped>
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
