<template>
  <!--<a-modal :visible="picShowVisible" :footer="null" @cancel="handleCancelShowPic" :width="1400"-->
  <!--class="modalStyle">-->
    <div v-if="picShowVisible">
      <!-- directive -->
      <!--<div class="images" v-viewer>-->
        <!--<img v-for="src in picShowList" :key="src" :src="src">-->
      <!--</div>-->
      <!-- component -->

      <viewer :images="picShowList" @inited="handleInited" ref="viewer" :options="options" :events="events">
        <!--<img v-for="src in picShowList" :key="src" :src="src" class="picSmall">-->
      </viewer>
      <!-- api -->
      <!--<button type="button" @click="show">Click to show</button>-->
    </div>
  <!--</a-modal>-->
</template>
<script>
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import Vue from 'vue'
Vue.use(VueViewer, { defaultOptions: { 'inline': false, 'button': false, 'navbar': true, 'title': false, 'toolbar': true, 'tooltip': false, 'movable': false, 'zoomable': false, 'rotatable': false, 'scalable': false, 'transition': false, 'fullscreen': true, 'keyboard': false }
})
export default {
  data () {
    let self = this
    return {
      vitor: null,
      options: {
        // hide(e){
        //   self.$emit('handleCancelShowPic', false)
        // },
        viewed (evt) {
          // 渲染完成，所有方法均可调用
          console.log('viewed', evt)
        }
      },
      events: {
        show (e) {
          console.log('lll')
        },
        shown (e) {
          console.log('lll---')
        }
      },
      picShowList2: ['http://192.168.12.166:9090/si/LbFiles/ZS?type=xmjcxxXMSJTP1&id=12939&index=7']
    }
  },
  mounted () {
    // this.test()
  },
  props: ['picShowVisible', 'picShowList', 'picIndex'],
  methods: {
    show () {
      let that = this
      let index = 0
      if (this.picIndex) {
        index = +this.picIndex
      }
      this.$viewerApi({
        images: this.picShowList
      })
      setTimeout(function () {
        that.$refs.viewer.$viewer.view(index)
        console.log('picList:' + that.picShowList)
      }, 1000)
    },
    // handleCancelShowPic (e) {
    //   this.$emit('handleCancelShowPic', false)
    // },
    handleInited (viewer) {
      let that = this
      this.$viewer = viewer
      $('.viewer-canvas').on('click', function (e) {
        if (e.target.localName !== 'img') {
          that.$emit('handleCancelShowPic', false)
        }
      })
    }
  },
  watch: {
    picShowVisible: function (newVal, oldVal) {
      if (newVal) {
        this.show()
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .modalStyle{
    height: 680px;
  }
  .picSmall{
    width:300px;
    height:300px;
    padding:10px;
  }
</style>
