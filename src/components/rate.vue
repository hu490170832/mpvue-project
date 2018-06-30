<template>
    <div class="rate text-red-color">
        <span class="bg-star">☆☆☆☆☆</span>
        <span class="cover" :style='rateStyle'>★★★★★</span>
    </div>
</template>

<script>
    export default {
      props: {
        rate: {
          type: [Number, String],
          default: 0
        }
      },
      computed: {
        rateStyle () {
          let width = (this.rate / 10 * 5).toFixed(1)
          return `width: ${width}em;`
        }

      }
    }
</script>

<style lang='stylus' scoped>
    .rate
        position relative
        .cover
            position absolute
            overflow hidden
            left 0
            top 0
</style> 