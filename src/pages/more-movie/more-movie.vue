<template>
    <div class="more-movie">
        <div class="movieList">
            <movie-card v-for="item in movieList" :movieInfo='item' :key="item.id" />
        </div>
    </div>
</template>

<script>
    import movieCard from '@/components/movieCard'
    export default {
        data() {
            return {
                movieList: []
            }
        },
        mounted () {
            let type = this.$root.$mp.query.type
            this.type = type
            this._getMovieList()
        },
        methods:{
            async _getMovieList(init) {
                const res = await this.$http.get('/weapp/gethotMovie',{
                    type: this.type
                })
                if(res.code === this.$http.ERR_OK) {
                    this.movieList = res.data.subjects
                    console.log(this.movieList)
                }
                console.log(res)
            }
        },
        components: {
            movieCard
        }
    }
</script>

<style scoped>

</style>