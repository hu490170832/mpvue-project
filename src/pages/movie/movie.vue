<template>
    <div class="movie">
        <div class="search bg-red-color">
            <div class="btn">
                <span class="icon iconfont icon-fangdajing"></span>
                <span class="dsec">搜索</span>
            </div>
        </div>
        <div class="hotMovie module">
            <div class="title">
                <span class="left">
                    <span class="bg-line bg-red-color"></span>
                    <span class="desc">正在热映</span>
                </span>
                <span class="right">
                    <span class="text text-red-color">更多</span>
                    <span class="icon text-red-color iconfont icon-youjiantou"></span>
                </span>
            </div>
            <scroll-view class="scroll-view" :scroll-x='true'>
                <img v-for="(item,index) in hotList" :style="translateX(index)" :key="item.id" :src="item.images.medium" class="slide-image" />
            </scroll-view>
        </div>
    </div>
</template>

<script>
    import {getHotMovie} from '@/api/movie'
    import {ERR_OK} from '@/api/config'
    export default {
        data() {
            return {
                scrollX: true,
                hotList: []
            }
        },
        mounted() {
            this._getHotMovie()
        },
        methods: {
            async _getHotMovie() {
                const res = await getHotMovie()
                console.log(res)
                if(res.code == ERR_OK) {
                    this.hotList = res.data.hotMovie.subjects
                }
            },
            translateX(index) {
                console.log(index)
                const x = -index*50
                return `left: ${x}`
            }
        }
    }
</script>

<style lang='stylus' scoped>
    .search
        width: 100%;
        height 24px
        padding-bottom 5px
        .btn
            background #fff
            width 96%
            height 22px
            line-height 22px
            border-radius 5px
            margin 0 auto
            display flex
            justify-content center
            color #c0c0c0
            &:active
                background EA5149
                opacity .6
    .bg-line
        height 14px
        width 3px
        display inline-block
        border-radius 2px
        margin-right 10px
    .module
        .title
            display flex
            justify-content space-between
            align-items center
            height 40px
            line-height 1
            .left
                display flex
                align-items center
        .scroll-view
            overflow:hidden;
            white-space:nowrap;
        .slide-image
            display inline-block
            width 88px
            height 120px
            position relative
</style>