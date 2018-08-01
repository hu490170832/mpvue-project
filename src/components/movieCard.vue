<template>
    <div class="movieCard">
        <div class="img-container">
            <img :src="movieInfo.images.medium" mode='widthFix' class="slide-image" />
        </div>
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
        width 80px
        height 120px
        position relative
        .name
            font-size 12px
            width 100%
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
        .rate
            display flex
            .point
                color #999
        .img-container
            width 80px
            height 110px
            overflow hidden
        .slide-image
            display inline-block
            width 80px
            overflow hidden
            position relative

</style>