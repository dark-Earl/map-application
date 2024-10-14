<template>
  <div>
    <div>
      <map-interests :coordinate="coordinate" :initCity="initCity" v-if="mapShow"></map-interests>
    </div>
  </div>
</template>
<script>

import mapInterests from '@/pages/mapModule/components/mapInterests'

export default {
  components: {
    mapInterests
  },
  mounted() {
    this.sleep()
  },
  data () {
    return {
      detail: {},
      completed: false,
      mapShow: false,
      // coordinate: '[[119.477337,25.886713]]',
      coordinate: this.$route.query.resultPoint,
      initCity: this.$route.query.initCity
    }
  },
  methods: {
    sleep: function () {
      let that = this
      setTimeout(function () {
        that.mapShow = true
      },1500)
    }
  }
}
</script>
