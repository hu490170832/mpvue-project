import Vue from 'vue'
import Book from './Books.vue'

const app = new Vue(Book)
app.$mount()
export default {
    created() {
        
    },
    config: {
        enablePullDownRefresh: true
    }
}
