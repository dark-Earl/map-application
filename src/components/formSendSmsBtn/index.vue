<template>
    <div>
      <a-button v-show="verShow" type="primary"  ghost><slot></slot></a-button>
      <a-button disabled="" v-show="!verShow"  style="vertical-align: middle;"><span>{{timer}}</span>秒后重新获取</a-button>
    </div>
</template>

<script>
export default {
  name: 'sendSmsBtn',
  // props: ['timer'],
  data: function () {
    return {
      timer: 0,
      verShow: true
    }
  },
  methods: {
    /**
     * 父组件上在组件上定义ref属性，
     * <send-sms-btn ref="sendSms" @click.native="sendSms">获取短信验证码</send-sms-btn>
     * 通过ref属性，调用本方法启动倒计时按钮显示，如：
     *  this.$refs.sendSms.startTimer(100)
     * @param timer
     */
    startTimer (timer) {
      this.timer = timer
      this.verShow = false
      var authTimer = setInterval(() => {
        this.timer--
        if (this.timer <= 0) {
          this.verShow = true
          clearInterval(authTimer)
        }
      }, 1000)
    }
  }

}
</script>

<style scoped>

</style>
