<template>
  <span v-bind:djs="timer" v-html="djsText">
  </span>
</template>

<script>
import { Utils } from '@/utils/index'
export default {
  name: 'countDown',
  props: ['timer'],
  data: function () {
    return {
      isStart: false,
      setIntervalId: null,
      djsText: Utils.getTimeCountDownResult(this.timer / 1000),
      djs: this.timer
    }
  },
  updated: function () {
    this.startTimer()
  },
  mounted: function () {
    this.startTimer()
  },
  methods: {
    stop () {
      if (this.setIntervalId) {
        clearInterval(this.setIntervalId)
      }
    },
    /**
     *  父组件上在组件上定义ref属性，
     * <count-down :ref="item.BidId" v-bind:timer="item.DJS"></count-down>
     * 通过ref属性，调用本方法启动倒计时按钮显示，如：
     *  this.$refs[BidId][0].updateTime(100)
     */
    updateTime (countDownTime) {
      if (this.isStart) {
        let maxTimeBuff = countDownTime + 500
        let minTimeBuff = countDownTime - 500
        let djs = this.djs
        if (djs <= 0 || (djs > maxTimeBuff || djs < minTimeBuff)) {
          // 如果时间在误差范围类的就不同步时间，避免时间越级跳位
          clearInterval(this.setIntervalId)
          this.setIntervalId = null
          this.djs = countDownTime
          this.startTimer()
        }
      } else {
        this.djs = countDownTime
        this.startTimer()
      }
    },
    /**
     * @param timer
     */
    startTimer () {
      if (this.setIntervalId != null) {
        clearInterval(this.setIntervalId)
        this.isStart = false
      }
      if (this.djs === undefined) {
        return
      }
      if (isNaN(this.djs)) {
        return
      }
      if (this.djs <= 0) {
        return
      }
      this.isStart = true
      this.setIntervalId = setInterval(() => {
        this.djs = this.djs - 1000
        this.$commonEvent.$emit('countDown', this.djs)
        this.djsText = Utils.getTimeCountDownResult(parseInt(this.djs / 1000))
        if (this.djs <= 0) {
          clearInterval(this.setIntervalId)
        }
      }, 1000)
    }
  }

}
</script>

<style scoped>

</style>
