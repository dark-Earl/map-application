<template>
  <div>
    <div class="index-pre-title">
      特色板块
    </div>
    <div class="index-pre-box">
      <ul>
        <li v-for="(tab,i) in categoryData" :class="n==i?'current':''" @click="n=i">
          <a :href="!!tab.LINK ? basePath + tab.LINK : ''">
            <div class="img">
              <img :src="baseAPIURL + tab.imgUrl" alt="" v-if="!!tab.imgUrl">
            </div>
            <div class="cont">
              <div class="title">
                {{tab.CategoryName}}
              </div>
              <div class="info">
                {{tab.INTRODUCE}}
              </div>
            </div>
            <div class="clear"></div>
          </a>
        </li>
        <!--<li>-->
          <!--<a>-->
            <!--<div class="img">-->
              <!--<img src="../../../assets/images/jqqd.png">-->
            <!--</div>-->
            <!--<div class="cont">-->
              <!--<p style="line-height: 250px;text-align: center;font-size: 30px;color: #333;font-weight: bold;">敬请期待</p>-->
            <!--</div>-->
          <!--</a>-->
        <!--</li>-->
      </ul>
    </div>
  </div>
</template>

<script>
  import {getCategoryConfigure} from '@/api/home/home'
  export default {
    name: 'PreBox', // 首页专区

    data() {
      const basePath = window.BASE_URL
      return{
        n:0,
        title:["1","2","3","4"],
        categoryData: [],
        baseAPIURL: window.BASE_API_URL,
        basePath: basePath
      }
    },
    created(){
      this.getCategoryConfigure()
    },
    methods: {
      getCategoryConfigure(id){
        let param = {}
        getCategoryConfigure(param).then(result => {
          if (result.code === 200) {
            this.categoryData = result.data
          }
        }).catch(e => {
          console.log(e)
        })
      },
    }
  }
</script>

<style>
</style>
