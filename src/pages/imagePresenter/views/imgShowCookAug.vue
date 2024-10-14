<template>
    <div id="containId">
      <img src="@/assets/images/backIndex/kaien.jpg" @click="handleCancelShowPic(true)" class="bggroundImg">
      <pic-show :picShowVisible="picShowVisible" :picShowList="picShowListNew" @handleCancelShowPic="handleCancelShowPic" :picIndex="picIndex"></pic-show>
    </div>
</template>

<script>
import picShow from '@/pages/imagePresenter/components/picShow/picIndex.vue'

export default {
  name: 'imgIndexShow1',
  data () {
    return {
      picShowVisible: false,
      picIndex: 0,
      picShowListNew: []
    }
  },
  components: {
    picShow
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let that = this
      const files = require.context('@/assets/images/imgShowArea/cookingAug', true, /\.jpg$/).keys()
      files.forEach((e) => {
        let pic = require('@/assets/images/imgShowArea/cookingAug' + e.slice(1))
        that.picShowListNew.push(pic)
      })
      setTimeout(function () {
        that.picShowVisible = true
      }, 1500)
    },
    handleCancelShowPic: function (value) {
      this.picShowVisible = value
    }
  }
}
</script>

<style scoped>
  .bggroundImg{
    width:100%;
    height:700px;
  }
</style>
