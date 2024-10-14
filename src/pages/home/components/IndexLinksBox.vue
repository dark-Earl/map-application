<template>
  <div class="index-link-box">
    <div class="index-cat-title">合作伙伴<span class="sub">Cooperative Partner</span>
<!--      <span class="index-cat-more">更多</span>-->
    </div>
    <swiper ref="mySwiper" :options="swiperOptions" class="index-link-list" v-if="hzhbDataLength>0">
      <swiper-slide v-for="data in hzhbData" :key="data.ID">
        <div class="index-link-list-item">
          <a :href="data.BH" target="_blank" v-check-ext-link>
            <img :src="basepath+'/LbFiles/hzjglogo/'+data.ID+'.jpg'" />
          </a>
          <span v-text="data.DWMC"></span>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <a-empty v-else description="暂无数据"></a-empty>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'
import { getHzhb } from '@/api/HzIndexHandle'

export default {
  name: 'indexLinksBox', // 合作伙伴
  data () {
    const basepath = window.BASE_API_URL
    return {
      basepath: basepath,
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true,
        slidesPerView: 4, // 一行显示4个
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      hzhbData: [],
      hzhbDataLength: 0
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
