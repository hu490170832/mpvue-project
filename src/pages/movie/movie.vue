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
                <a href="/pages/more-movie/main?type=1" class="right">
                    <span class="text text-red-color">更多</span>
                    <span class="icon text-red-color iconfont icon-youjiantou"></span>
                </a>
            </div>
            <scroll-view class="scroll-view" :scroll-x='true'>
                <div class="movieCard-container" v-for="item in hotList" :key="item.id">
                    <movie-card :movieInfo='item' />
                </div>
            </scroll-view>
        </div>
        <div class="hotMovie module">
            <div class="title">
                <span class="left">
                    <span class="bg-line bg-red-color"></span>
                    <span class="desc">近期上映</span>
                </span>
                <span class="right">
                    <span class="text text-red-color">更多</span>
                    <span class="icon text-red-color iconfont icon-youjiantou"></span>
                </span>
            </div>
            <scroll-view class="scroll-view" :scroll-x='true'>
                <div class="movieCard-container" v-for="item in soonList" :key="item.id">
                    <movie-card :movieInfo='item' />
                </div>
            </scroll-view>
        </div>
        <div class="hotMovie module">
            <div class="title">
                <span class="left">
                    <span class="bg-line bg-red-color"></span>
                    <span class="desc">TOP250</span>
                </span>
                <span class="right">
                    <span class="text text-red-color">更多</span>
                    <span class="icon text-red-color iconfont icon-youjiantou"></span>
                </span>
            </div>
            <scroll-view class="scroll-view" :scroll-x='true'>
                <div class="movieCard-container" v-for="item in topList" :key="item.id">
                    <movie-card :movieInfo='item' />
                </div>
            </scroll-view>
        </div>
    </div>
</template>

<script>
    import {getHotMovie} from '@/api/movie'
    import {ERR_OK} from '@/api/config'
    import movieCard from '@/components/movieCard'
    export default {
        data() {
            return {
                scrollX: true,
                hotList: [],
                soonList: [],
                topList: []
            }
        },
        mounted() {
            this._getHotMovie()
        },
        methods: {
            async _getHotMovie() {
                const res = await getHotMovie()
                if(res.code == ERR_OK) {
                    this.hotList = res.data.hotList.subjects
                    this.soonList = res.data.soonList.subjects
                    this.topList = res.data.topList.subjects
                }
            }
        },
        components: {
            movieCard
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
            .movieCard-container
                width 288px
                display inline-block
</style>