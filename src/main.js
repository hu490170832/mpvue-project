import Vue from 'vue'
import App from './App'
import api from './api/index'
Vue.use(api)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/movie/main'],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#EA5149',
      navigationBarTitleText: '我的图书',
      navigationBarTextStyle: 'light'
    },
    'tabBar': {
      selectedColor: '#EA5149',
      list: [
        {
          pagePath: 'pages/books/main',
          text: '图书',
          iconPath: 'static/img/book.png',
          selectedIconPath: 'static/img/book-active.png'
        },
        {
          pagePath: 'pages/movie/main',
          text: '电影',
          iconPath: 'static/img/movie_1.png',
          selectedIconPath: 'static/img/movie_2.png'
        },
        {
          pagePath: 'pages/comments/main',
          text: '评论',
          iconPath: 'static/img/todo.png',
          selectedIconPath: 'static/img/todo-active.png'
        },
        {
          pagePath: 'pages/me/main',
          text: '我',
          iconPath: 'static/img/me.png',
          selectedIconPath: 'static/img/me-active.png'
        }

      ]
    }
  }
}
