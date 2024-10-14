import 'babel-polyfill'
import Vue from 'vue'
import preventReClick from '@/directive/preventReClick'
import checkExtLink from '@/directive/checkExtLink'
import vueValidate from '@/utils/vueValidate'
import imgResize from '@/directive/imgResize'

/**
 * 处理公共页面公共部分内容
 */

// 1. 加载按钮重复点击控制指令
Vue.use(preventReClick)
// 2.判断外链
Vue.use(checkExtLink)
// 3.图片自适应（资讯）
Vue.use(imgResize)

/*
  定义$commonEvent对象
  使用方法：
  组件1数据传递：
  this.$commonEvent.$emit('事件名称', data)
  组件2定义接收
  mounted () {
    this.$commonEvent.$on('事件名称', (val) => {
      this.text = val
    })
  }
 */
Vue.prototype.$commonEvent = new Vue()
Vue.prototype.vueValidate = vueValidate
