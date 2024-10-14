<template>
  <a-range-picker
    showTime
    :placeholder="['开始时间', '结束时间']"
    :format="dateFormat"
    :value="createValue"
    @change="createChange"
  />
</template>

<script>
import moment from "moment";
import baseUtils from "@/utils/baseUtils";

export default {
  name: 'rangePicker',
  props: ['left', 'right'],
  data () {
    return {
      dateFormat: 'YYYY-MM-DD',
      createValue: []
    }
  },
  mounted () {
    this.getDefaultDate()
  },
  methods: {
    moment,
    getCurrentDataL () {
      console.log('-------');
      let dateL = baseUtils.getDay(this.left);
      return dateL
    },
    getCurrentDataR () {
      let dateR = baseUtils.getDay(this.right)
      return dateR
    },
    getDefaultDate () {
      console.log('初始化日期')
      this.createValue = [this.moment(this.getCurrentDataL(), this.dateFormat), this.moment(this.getCurrentDataR(), this.dateFormat)]
    },
    createChange (dates, dateStrings) {
      this.createValue = dates
      this.$emit('changeDate', dateStrings)
    }
  }
}
</script>
