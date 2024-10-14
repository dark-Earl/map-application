import Vue from 'vue'

// 2.放置项目中经常会用到的插件和CSS样式。
// 例如： 网络请求插件:axios和vue-resource、图片懒加载插件：vue-lazyload
// 3.存储全局变量。例如（用于的基本信息）

import App from './App.vue'
// import router from '@/router/index'
import router from './router'
import store from '@/store'
import VueAMap from 'vue-amap'
import Antd from 'ant-design-vue'
import '../../assets/css/all.less'
import 'ant-design-vue/dist/antd.less'
import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css'
import 'social-share.js/dist/js/social-share.min'
import '@/pages/global'
import { notification } from 'ant-design-vue'
// 全局变量
Vue.config.productionTip = false

// import Video from "video.js";
// import "video.js/dist/video-js.min.css"
// Vue.prototype.$video = Video

Vue.use(Antd)
Vue.use(Share)

notification.config({
  duration: 2
});
//在Vue的原型链中增加notification属性
Vue.prototype.$notification = notification;

Vue.config.productionTip = false
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '61d0129f0b4e3725ea4b370f8e080162',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch', // POI搜索插件
    'AMap.Scale', // 右下角缩略图插件 比例尺
    'AMap.OverView',
    'AMap.ToolBar', // 地图工具条
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',// 圆形编辑器插件
    'AMap.Geolocation'// 定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

Vue.config.productionTip = false
// 开发环境
window._AMapSecurityConfig = {
  securityJsCode: 'd71536f9f0c6506f1690a03222c95eeb'
}
// 生产环境 后台配置的安全密钥地址 详见官方配置文件
// window._AMapSecurityConfig = {
//   serviceHost: `xxx/_AMapService`
// }

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
