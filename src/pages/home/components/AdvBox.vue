<template>
  <div>
    <div class="adv-fl-box adv-position"  v-show="showButton&&show&&!!tggwDataLeft.imgUrl">
      <div class="adv-close">
        <a-icon type="close" @click="advshow"/>
      </div>
      <img :src="baseURL + tggwDataLeft.imgUrl" alt="" v-if="!!tggwDataLeft.imgUrl" @click="jumpPage(tggwDataLeft.jumpUrl)">
      <img src="../../../assets/images/backIndex/login_backgroud3.png" v-else alt="">
    </div>
    <div class="adv-fr-box adv-position"  v-show="showrButton&&showr&&!!tggwDataRight.imgUrl" @click="advshowr">
      <div class="adv-close">
        <a-icon type="close" @click="advshowr"/>
      </div>
      <img :src="baseURL + tggwDataRight.imgUrl" v-if="!!tggwDataRight.imgUrl" alt="" @click="jumpPage(tggwDataRight.jumpUrl)">
      <img src="../../../assets/images/backIndex/login_backgroud3.png" v-else alt="">
    </div>
  </div>
</template>

<script>
import {getTggw} from '@/api/home/home'

export default {
  name: "advBox", //侧边广告位

  data(){
    return{
      show: false,
      showr: false,
      showButton: true,
      showrButton: true,
      baseURL: window.BASE_API_URL,
      tggwDataLeft: {},
      tggwDataRight: {},
    }
  },
  mounted () {
    debugger
    this.getTggwLeft('2')
    this.getTggwRight('3')
    window.addEventListener('scroll', this.onScrollFunc, true)
  },
  methods:{
    advshow(){
      this.showButton = false
    },
    jumpPage(url){
      if(!!url){
        window.location.href= url
      }
    },
    advshowr(){
      this.showrButton = false
    },
    async getTggwLeft (zswz) {
      let param = {
        zswz: zswz
      }
      await getTggw(param).then(response => {
        if(response.code==200&&response.data.length>0){
          this.tggwDataLeft = response.data[0]
        }
      }).catch(e => {
        console.log(e)
      })
    },
    onScrollFunc(){
      let scrollTop = window.scrollY
      this.show = scrollTop > 380
      this.showr = scrollTop > 380
    },
    async getTggwRight (zswz) {
      let param = {
        zswz: zswz
      }
      await getTggw(param).then(response => {
        if(response.code==200&&response.data.length>0){
          this.tggwDataRight = response.data[0]
        }
      }).catch(e => {
        console.log(e)
      })
    },
  }
};
</script>

<style lang="less" >
  /* .adv-fl-box{
    left: -26px;
    transform: scale(0.618);
    top: 100px;
    margin-bottom: 16px;
  }
  .adv-fr-box {
    right: -28px;
    transform: scale(0.618);
    top: 100px;
    margin-bottom: 16px;
  }
  .adv-close{
    transform: scale(1.7);
  } */
</style>
