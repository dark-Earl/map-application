<template>
  <div v-show="show" style="display: inline-block;">
    <div class="speeddiv">
      <div class="speedcls " :class="speedCls">
        <font class="sfont">服务器响应时间：</font><font class="sfont speedTime" :style="{'color': speedcolor}">{{responseTime}}</font><font class="sfont"> 毫秒，网速：</font><font class="sfont speedText">{{speedtxt}}</font>
      </div>
    </div>
  </div>
</template>

<script>

import * as CheckSpeed from '@/api/CheckSpeedHandle'
import { Modal } from 'ant-design-vue'
export default {
  name: 'checkSpeed',
  // props: ['timer'],
  data: function () {
    return {
      show: false,
      isRun: true,
      timeoutId: null,
      speedcolor: 'green',
      speedtxt: '--',
      speedCls: 'speed_normal',
      responseTime: 0
    }
  },
  methods: {
    stopCheck () {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
      this.show = false
      this.isRun = false
    },
    /**
       * 父组件上在组件上定义ref属性，
       * <check-speed ref="checkSpeed" @click.native="sendSms">获取短信验证码</check-speed>
       * 通过ref属性，调用本方法启动倒计时按钮显示，如：
       *  this.$refs.checkSpeed.checkSpeed(100)
       * @param timer
       */
    checkSpeed (timeout) {
      if (!this.isRun) {
        return
      }
      this.show = true
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
      this.timeoutId = setTimeout(() => {
        let startTime = new Date().getTime()
        CheckSpeed.checkSpeed().then(response => {
          let endTime = new Date().getTime()
          this.responseTime = parseFloat(endTime - startTime)
          if (this.responseTime < 150) {
            this.speedcolor = 'green'
            this.speedtxt = '正常'
            this.speedCls = 'speed_normal'
          } else if (this.responseTime < 300) {
            this.speedcolor = 'orange'
            this.speedtxt = '较慢'
            this.speedCls = 'speed_slower'
          } else {
            this.speedcolor = 'red'
            this.speedtxt = '很慢'
            this.speedCls = 'speed_veryslow'
          }
          this.checkSpeed(timeout)
        }, response => {
          let endTime = new Date().getTime()
          this.responseTime = parseFloat(endTime - startTime)
          this.speedcolor = 'red'
          this.speedtxt = '异常'
          this.speedCls = 'speed_veryslow'

          Modal.warning({
            closable: true,
            title: '温馨提示',
            okText: '确认',
            content: '网络请求出现异常，请刷新页面重试。',
            onOk: function () {
              location.reload()
            }
          })
        }).catch(e => {
          let endTime = new Date().getTime()
          this.responseTime = parseFloat(endTime - startTime)
          this.speedcolor = 'red'
          this.speedtxt = '异常'
          this.speedCls = 'speed_veryslow'
          Modal.warning({
            closable: true,
            title: '温馨提示',
            okText: '确认',
            content: '网络请求出现异常，请刷新页面重试。',
            onOk: function () {
              location.reload()
            }
          })
          console.log(e)
        })
      }, timeout)
    }
  }

}
</script>

<style scoped>
  .speedcontainer {float: right; font-size: 14px; padding: 0 10px 0 0;color: #555; }
  .speeddiv {font-size: 14px; vertical-align: middle;}
  .sfont {font-size: 14px;}

  .speedcls{
    background-repeat: no-repeat;
    background-position: 3px 1px;
    padding-left: 25px;
    padding-bottom: 5px;
  }
  .speed_normal{background-image: url('assets/img/02.png');}
  .speed_slower{background-image: url('assets/img/04.png');}
  .speed_veryslow{background-image: url('assets/img/05.png');}
</style>
