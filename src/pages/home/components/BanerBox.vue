<template>
  <div class="banner">
    <swiper ref="mySwiper" :options="swiperOptions" class="swiper-container">
      <swiper-slide v-for="(tab,index) in tggwData">
        <img :src="baseURL + tab.imgUrl" @click="jumpPage(tab.jumpUrl)">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>
<script>
import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);

import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import {getTggw} from '@/api/home/home.js'

// import style (>= Swiper 6.x)
import "swiper/swiper-bundle.css";

export default {
  name: "BanerBox",
  data () {
 return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true,
        // slidesPerView: 3, // 一行显示4个
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
   tggwData: [],
   baseURL: window.BASE_API_URL

    }
  },

  components: {
    Swiper,
    SwiperSlide,
  },
  mounted () {
    this.getTggw()
  },
  methods: {
    async getTggw () {
      let param = {
        zswz: '1'
      }

      await getTggw(param).then(response => {
        this.tggwData = response.data
      }).catch(e => {
        console.log(e)
      })
    },
    jumpPage(url){
      if(!!url){
        window.location.href= url
      }
    }
  }
};
</script>
