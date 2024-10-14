import Vue from 'vue'

// 2.放置项目中经常会用到的插件和CSS样式。
// 例如： 网络请求插件:axios和vue-resource、图片懒加载插件：vue-lazyload
// 3.存储全局变量。例如（用于的基本信息）

import App from './App.vue'
import store from '@/store/index'

import Antd from 'ant-design-vue'
import '../../assets/css/all.less'
import 'ant-design-vue/dist/antd.less'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Swiper2, { Navigation, Pagination } from 'swiper'
import router from './router'


Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper)
Swiper2.use([Navigation, Pagination])

Vue.use(Antd);

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

