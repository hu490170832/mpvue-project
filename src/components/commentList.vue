<template>
    <div class="commentList">
        <div v-show="commentList.length>0" class="title">评论</div>
        <div class="list">
            <div @click="goBookDetail(item.bookid)" class="item" v-for="item in commentList" :key="item.id">
                <div class="line1">
                    <div class="left">
                        <img :src="item.user_info.avatarUrl" alt="" class="avatar">
                        <span class="nickName">{{item.user_info.nickName}}</span>
                    </div>
                    <div class="right">
                        <span class="city">{{item.location || '未知地点'}}</span>-
                        <span class="phoneType">{{item.phone || '未知型号' }}</span>
                    </div>
                </div>
                <p class="content">{{item.comment}}</p>
            </div>
        </div>
      
    </div>
</template>

<script>
    export default {
      props: ['commentList', 'type'],
      computed: {
      },
      created () {
    
      },
      methods: {
        goBookDetail (bookid) {
          wx.navigateTo({
            url: '/pages/bookDetail/main?id=' + bookid
          })
        }
      }
    }
</script>

<style lang='stylus' scoped>
    .commentList
        margin-top 20px
        .title
            background #eeedef
            padding-left 20px
            height 40px
            line-height 40px
        .list
            .item
                border-bottom 4px solid #f6f6f6
                padding-bottom 10px
                .line1 
                    display flex
                    padding 0 10px
                    align-items center
                    height 40px
                    justify-content space-between
                    .left
                        display flex
                        align-items center
                    .avatar
                        width 20px
                        height 20px
                        margin-right 5px
                        border-radius 50%
                .content
                    padding-left 10px
        .share-btn
            color #fff
            font-size 14px

</style>