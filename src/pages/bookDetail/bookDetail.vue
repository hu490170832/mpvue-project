<template>
    <div class="bookDetail">
        <div class="info">
            <div class="bookimg">
                <img class="bg" :src="bookInfo.image" alt="">
                <img class="img" mode='aspectFit' :src="bookInfo.image" alt="">
            </div>
            <div class="desc">
                <div class="line1">
                    <span class="nickName">{{userInfo.name}}</span>
                    <rate :rate='bookInfo.rate'></rate>
                </div>
                <div class="line2">
                    <span class="publisher">{{bookInfo.publisher}}</span>
                    <span class="price">{{bookInfo.price}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getBookDetail} from '@/api/bookDetail'
    import {ERR_OK} from '@/api/config'
    import rate from '@/components/rate'
    export default {
        data() {
            return {
                bookId: '',
                bookInfo: {},
                userInfo: {}
            }
        },
        mounted() {
            let bookId = this.$root.$mp.query.id
            this.bookId = bookId
            this._getBookDetail()
        },
        methods:{
            async _getBookDetail() {
                let res = await getBookDetail({
                    id: this.bookId
                })
                if(res.code==ERR_OK) {
                    this.bookInfo = res.data.bookInfo
                    this.userInfo = res.data.userInfo
                }
                console.log(res)
            }
        },
        components:{
            rate
        }
    }
</script>

<style lang='stylus' scoped>
    .bookDetail
        .info
            .bookimg
                height 250px
                position relative
                .bg
                    filter: blur(15px);
                    width 100%
                .img
                    position absolute
                    left 50%
                    height 150px
                    top 50%
                    transform translate(-50%,-50%)
        .desc
            .line1,.line2
                display flex
                align-items center

</style>