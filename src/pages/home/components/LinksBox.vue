<template>
  <div class="link-box">
    <div class="idx-title">合作伙伴<p class="E">Cooperative Partner</p>
    </div>
    <swiper ref="mySwiper" :options="swiperOptions02">
      <swiper-slide><a><img src="../../../assets/images/yhk/BHYH.jpg" /></a></swiper-slide>
      <swiper-slide><a><img src="../../../assets/images/yhk/BJYH.jpg" /></a></swiper-slide>
      <swiper-slide><a><img src="../../../assets/images/yhk/GFYH.jpg" /></a></swiper-slide>
      <swiper-slide><a><img src="../../../assets/images/yhk/JGZS.jpg" /></a></swiper-slide>
      <swiper-slide><a><img src="../../../assets/images/yhk/GFYH.jpg" /></a></swiper-slide>
      <swiper-slide><a><img src="../../../assets/images/yhk/CQNS.jpg" /></a></swiper-slide>
      <swiper-slide><a><img src="../../../assets/images/yhk/PAYH.jpg" /></a></swiper-slide>
      <swiper-slide><a><img src="../../../assets/images/yhk/STW.jpg" /></a></swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

export default {
  name: 'LinksBox', // 合作伙伴
  data () {
    return {
      swiperOptions02: {
        loop: true,
        slidesPerView: 5, // 一行显示4个
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
    }
  },
  mounted () {
    this.getHzhbApi()
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    getHzhbApi () {
      getHzhb().then(response => {
        this.hzhbData = response.data
        this.hzhbDataLength = response.data.length
        // console.log(this.xgljData)
      }).catch(e => {
        console.log(e)
      })
    }
  }

}
</script>
