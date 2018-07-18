<template>
    <div class="movieCard">
        <img :src="movieInfo.images.medium" class="slide-image" />
        <p class="name">{{movieInfo.original_title}}</p>
        <div class="rate">
            <rate :rate='movieInfo.rating.average' />
            <span class="point">{{movieInfo.rating.average}}</span>
        </div>
    </div>
</template>

<script>
    import Rate from '@/components/rate'
    export default {
        props: ['movieInfo'],
        components: {
            Rate
        }
    }
</script>

<style lang='stylus' scoped>
    .movieCard
        display inline-block
        width 88px
        height 120px
        position relative
        .name
            font-size 12px
            width 100%
            overflow hidden
            text-overflow ellipsis
        .rate
            display flex
            .point
                color #999
        .slide-image
            display inline-block
            width 88px
            height 120px
            position relative

</style>