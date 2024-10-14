<template>
    <div id="containId">
      <img :src="picShowListNew[0]" @click="handleCancelShowPic(true)" class="bggroundImg">
      <pic-show :picShowVisible="picShowVisible" :picShowList="picShowListNew" @handleCancelShowPic="handleCancelShowPic" :picIndex="picIndex"></pic-show>
    </div>
</template>

<script>
import picShow from '@/pages/imagePresenter/components/picShow/picIndex.vue'

export default {
    name: "imgIndexShow1",
  data(){
      return {
        picShowVisible: false,
        picIndex: 0,
        picShowListNew: [require('@/assets/images/imgShowArea/one/castle.png'),
          require('@/assets/images/imgShowArea/one/cat.png'),
          require('@/assets/images/imgShowArea/one/ne.png'),
          require('@/assets/images/imgShowArea/one/cateye.png'),
          // require('@/assets/images/imgShowArea/one/dusk.png'),
          require('@/assets/images/imgShowArea/one/farm.png'),
          require('@/assets/images/imgShowArea/one/grassland.jpg'),
          require('@/assets/images/imgShowArea/one/lookupSky.png'),
          require('@/assets/images/imgShowArea/one/mountain.png'),
          require('@/assets/images/imgShowArea/one/seaside.png'),
          require('@/assets/images/imgShowArea/one/sheep.png'),
          require('@/assets/images/imgShowArea/one/kaienCastle.jpg'),
          require('@/assets/images/imgShowArea/one/treeside.png'),
          require('@/assets/images/imgShowArea/one/way.png'),
          require('@/assets/images/imgShowArea/one/catwater.png'),
          require('@/assets/images/imgShowArea/one/windmill.jpg')
          // require('@/assets/images/imgShowArea/one/windowsill.png')
        ]
      }
  },
  components: {
      picShow
  },
  mounted(){
      this.initData()
  },
  methods: {
      initData(){
        let that = this
        setTimeout(function () {
          that.picShowVisible = true
        },1500)
      },
    handleCancelShowPic: function (value) {
      this.picShowVisible = value
    },
  }
}
</script>

<style scoped>
  .bggroundImg{
    width:100%;
    height:700px;
  }
</style>
