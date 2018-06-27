<template>
    <div class="bookDetail">
        bookID: {{bookId}}
    </div>
</template>

<script>
    import {getBookDetail} from '@/api/bookDetail'
    export default {
        data() {
            return {
                bookId: ''
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
                console.log(res)
            }
        }
    }
</script>

<style scoped>

</style>