<template>
    <div class="me">
        <img class="headerImg" :src="imgUrl" alt="">
        <div class="name">{{userInfo.nickName}}</div>
        <year-progress></year-progress>
        <button @click="scanbook" class="button">添加图书</button>
    </div>
</template>

<script>
    import {
        login,addBook
    } from '@/api/me'
    import {ERR_OK} from '@/api/config'
    import YearProgress from './components/YearProgress'
    export default {
        data() {
            return {
                userInfo: {}
            }
        },
        computed: {
            imgUrl() {
                return this.userInfo.avatarUrl ? this.userInfo.avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png'
            }
        },
        created() {
            this._login()
        },
        methods: {
            async _login() {
                var res = await login()
                this.userInfo = res
            },
            async _addBook(data) {
                var res = await addBook(data)
                if(res.code === ERR_OK) {
                    wx.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 2000
                    })
                }
            },
            async scanbook() {
                wx.scanCode({
                    success: (res) => {
                        this._addBook({
                            openid:this.userInfo.openId,
                            isbn:res.result
                        })
                    }
                })
            }
        },
        components: {
            YearProgress
        }
    }
</script>

<style lang='stylus'>
    .me
        display flex
        flex-direction column
        align-items center;
        padding-top 40px
        .headerImg
            width: 75px;
            height:75px;
            margin: 10px;
            border-radius: 50%;
        .button
            width 80%
            height 40px
            line-height 40px;
            border-radius 5px
            color #fff
            text-align center
            background #EA5149
            font-size 14px
            margin-top 10rpx
</style>