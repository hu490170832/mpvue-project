<template>
    <div class="addBookBtn">
        <button @click="scanbook" class="button">添加图书</button>
    </div>
</template>

<script>
    import {getStorageUserInfo} from '@/common/cache'
    import {addBook} from '@/api/me'
    import {ERR_OK} from '@/api/config'
    export default {
        data() {
            return {
                userInfo: {}
            }
        },
        mounted() {
            this.userInfo = getStorageUserInfo()
        },
        methods: {
            async _addBook (data) {
                var res = await addBook(data)
                if (res.code === ERR_OK) {
                    wx.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 2000
                    })
                }
            },
            async scanbook () {
                wx.scanCode({
                    success: (res) => {
                        this._addBook({
                            openid: this.userInfo.openId,
                            isbn: res.result
                        })
                    }
                })
            }
        }
    }
</script>

<style lang='stylus' scoped>
    .addBookBtn
        width 100%
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