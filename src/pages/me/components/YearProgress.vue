<template>
    <div class="yearProgress">
        <progress activeColor='#ea5149' :percent=percent></progress>
        <div class="desc"> {{fullYear}}年已经过去了{{passDay}}天,{{percent}}%</div>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          fullYear: '',
          passDay: '',
          percent: 0
        }
      },
      created () {
        this.initProgress()
      },
      methods: {
        initProgress () {
          var startTime = new Date()
          startTime.setMonth(0)
          startTime.setDate(1)
          var nowTime = new Date()
          var fullYear = nowTime.getFullYear()
          var passDay = parseInt((nowTime.getTime() - startTime.getTime()) / 1000 / 3600 / 24) + 1
          var hasDay = fullYear % 400 === 0 || (fullYear % 4 === 0 && fullYear % 100 !== 0) ? 366 : 365
          var percent = Math.floor(passDay / hasDay * 100)
          this.fullYear = fullYear
          this.percent = percent
          this.passDay = passDay
        }
      }
    }
</script>

<style lang='stylus' scoped>
    .yearProgress
        width 80%
        margin-top 20px
        margin-bottom 20px
        .desc
            margin-top 5px
            text-align center
</style>