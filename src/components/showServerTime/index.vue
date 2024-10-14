<template>
  <div v-show="isShow" style="display: inline-block;">
    <font class="sfont">, 服务器当前时间: {{serverDateTimeText}}</font>
  </div>
</template>

<script>
import { Utils } from '@/utils/index'
export default {
  name: 'showServerTime',
  // props: ['timer'],
  data: function () {
    return {
      timeoutId: null,
      isShow: false,
      serverDateTime: 0,
      serverDateTimeText: ''
    }
  },
  methods: {
    stop () {
      if (this.timeoutId) {
        clearInterval(this.timeoutId)
      }
    },
    /**
       * 父组件上在组件上定义ref属性，
       * <check-speed ref="checkSpeed" @click.native="sendSms">获取短信验证码</check-speed>
       * 通过ref属性，调用本方法启动倒计时按钮显示，如：
       *  this.$refs.showServerTime.setTime(100)
       * @param timer
       */
    setTime (timestamp) {
      if (this.timeoutId) {
        clearInterval(this.timeoutId)
      }
      let that = this
      this.serverDateTime = timestamp
      this.timeoutId = setInterval(() => {
        if (that.serverDateTime > 0) {
          that.isShow = true
          var d = new Date(that.serverDateTime)
          that.serverDateTimeText = Utils.formatDate(d, 'yyyy-MM-dd hh:mm:ss')
          that.serverDateTime += 1000
        } else {
          that.isShow = false
        }
      }, 1000)
    }
  }

}
</script>
