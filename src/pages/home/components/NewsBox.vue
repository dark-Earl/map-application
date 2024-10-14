<template>
  <div class="index-news-box">
    <div class="index-news-fl">
      <div class="index-news-fl-title">
        新闻资讯
      </div>
      <i class="index-news-icon"></i>
      <div class="index-news-tabs">
        <ul>
          <li v-for="(v,i) in title" :class="n==i?'current':''" @mouseover="n=i"
              @click="turnToInfo(v.id)">{{v.title}}</li>
        </ul>
      </div>
    </div>
    <div class="index-news-fr" v-show="n==0">
      <div class="index-news-fr-title" >
        新闻动态
      </div>
      <div class="index-news-cont">
        <ul>
          <li v-for="(tab,nlist) in newlist0" :class="ncur==nlist?'index-news-cur':''"
              @mouseover="ncur=nlist" @click="turnToPage(tab,'83')">
            <div class="index-news-img">
              <a href="javascript:void(0);">
                <img :src="baseURL +tab.imgUrl" alt="" v-if="!!tab.imgUrl">
              </a>
            </div>
            <div class="cont">
              <a class="title">
                {{tab.TITLE}}
              </a>
              <div class="info" v-html="tab.CONTENT">
              </div>
              <div class="time">
                <a-icon type="clock-circle" />
                <span>{{tab.PUBTIME}}</span>
              </div>
            </div>
          </li>
        </ul>
        <!--<a href="info.html#/infoList?id=83" class="more">-->
          <!--<span>查看更多</span>-->
          <!--<a-icon type="arrow-right" />-->
        <!--</a>-->
      </div>
    </div>
    <div class="index-news-fr" v-show="n==1">
      <div class="index-news-fr-title">
        中心公告
      </div>
      <div class="index-news-cont">
        <ul>
          <li v-for="(tab,nlist) in newlist1" :class="ncur==nlist?'index-news-cur':''"
              @mouseover="ncur=nlist" @click="turnToPage(tab,'84')">
            <div class="cont">
              <a class="title">
                {{tab.TITLE}}
              </a>
              <div class="info" v-html="tab.CONTENT">
              </div>
              <div class="time">
                <a-icon type="clock-circle" />
                <span>{{tab.PUBTIME}}</span>
              </div>
            </div>
          </li>
        </ul>
        <!--<a href="info.html#/infoList?id=84" class="more">-->
          <!--<span>查看更多</span>-->
          <!--<a-icon type="arrow-right" />-->
        <!--</a>-->
      </div>
    </div>
    <div class="index-news-fr" v-show="n==2">
      <div class="index-news-fr-title">
        业务公告
      </div>
      <div class="index-news-cont">
        <ul>
          <li v-for="(tab,nlist) in newlist2" :class="ncur==nlist?'index-news-cur':''"
              @mouseover="ncur=nlist" @click="turnToPage(tab,'96')">
            <div class="cont">
              <a class="title">
                {{tab.TITLE}}
              </a>
              <div class="info" v-html="tab.CONTENT">
              </div>
              <div class="time">
                <a-icon type="clock-circle" />
                <span>{{tab.PUBTIME}}</span>
              </div>
            </div>
          </li>
        </ul>
        <!--<a href="info.html/#/infoList?id=85" class="more">-->
          <!--<span>查看更多</span>-->
          <!--<a-icon type="arrow-right" />-->
        <!--</a>-->
      </div>
    </div>
    <div class="index-news-fr" v-show="n==3">
      <div class="index-news-fr-title">
        诚信信息
      </div>
      <div class="index-news-cont">
        <ul>
          <li v-for="(tab,nlist) in newlist3" :class="ncur==nlist?'index-news-cur':''"
              @mouseover="ncur=nlist" @click="turnToPage(tab,'93')">
            <div class="cont">
              <a class="title">
                {{tab.TITLE}}
              </a>
              <div class="info" v-html="tab.CONTENT">
              </div>
              <div class="time">
                <a-icon type="clock-circle" />
                <span>{{tab.PUBTIME}}</span>
              </div>
            </div>
          </li>
        </ul>
        <!--<a href="info.html/#/infoList?id=85" class="more">-->
          <!--<span>查看更多</span>-->
          <!--<a-icon type="arrow-right" />-->
        <!--</a>-->
      </div>
    </div>
    <!--<div class="index-news-fr" v-show="n==4">-->
      <!--<div class="index-news-fr-title">-->
        <!--发债公告-->
      <!--</div>-->
      <!--<div class="index-news-cont">-->
        <!--<ul>-->
          <!--<li v-for="(tab,nlist) in newlist4" :class="ncur==nlist?'index-news-cur':''"-->
              <!--@mouseover="ncur=nlist" @click="turnToPage(tab,'94')">-->
            <!--<div class="cont">-->
              <!--<a class="title">-->
                <!--{{tab.TITLE}}-->
              <!--</a>-->
              <!--<div class="info">-->
                <!--{{tab.CONTENT}}-->
              <!--</div>-->
              <!--<div class="time">-->
                <!--<a-icon type="clock-circle" />-->
                <!--<span>{{tab.PUBTIME}}</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
        <!--</ul>-->
        <!--&lt;!&ndash;<a href="info.html/#/infoList?id=85" class="more">&ndash;&gt;-->
          <!--&lt;!&ndash;<span>查看更多</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<a-icon type="arrow-right" />&ndash;&gt;-->
        <!--&lt;!&ndash;</a>&ndash;&gt;-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="index-news-fr" v-show="n==5">-->
      <!--<div class="index-news-fr-title">-->
        <!--诚信信息-->
      <!--</div>-->
      <!--<div class="index-news-cont">-->
        <!--<ul>-->
          <!--<li v-for="(tab,nlist) in newlist5" :class="ncur==nlist?'index-news-cur':''"-->
              <!--@mouseover="ncur=nlist" @click="turnToPage(tab,'95')">-->
            <!--<div class="cont">-->
              <!--<a class="title">-->
                <!--{{tab.TITLE}}-->
              <!--</a>-->
              <!--<div class="info">-->
                <!--{{tab.CONTENT}}-->
              <!--</div>-->
              <!--<div class="time">-->
                <!--<a-icon type="clock-circle" />-->
                <!--<span>{{tab.PUBTIME}}</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
        <!--</ul>-->
        <!--&lt;!&ndash;<a href="info.html/#/infoList?id=85" class="more">&ndash;&gt;-->
          <!--&lt;!&ndash;<span>查看更多</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<a-icon type="arrow-right" />&ndash;&gt;-->
        <!--&lt;!&ndash;</a>&ndash;&gt;-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>

import {getListData} from '@/api/home/home'
export default {
  name: 'mapBox', // 首页新闻资讯

  data() {
    return{
      n:0,
      title: [
        {title: "新闻动态",id: '83'},
        {title: "中心公告",id: '84'},
        {title: "业务公告",id: '96'},
        {title: "诚信信息",id: '95'},
      ],
      ncur:0,
      newlist0:[],
      newlist1:[],
      newlist2:[],
      newlist3:[],
      newlist4:[],
      newlist5:[],
      baseURL: window.BASE_API_URL,
      baseURLWB: window.BASE_URL
    }
  },
  created(){
    this.getListData()
  },
  methods: {
    getListData(id){
      let param = {
        id: id,
        pageNo: '1',
        pageSize: '5'
      }
      getListData(param).then(result => {
        if (result.code === 200) {
          this.newlist = result.data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    turnToInfo(id){
      window.location.href= this.baseURLWB +'info.html#/infoList?id=' +id
    },
    async getListData () {
      let param = {pageNo: '1',pageSize: '5'}
      let response0 = await getListData(Object.assign(param,{id: '83'}));
      this.newlist0 = response0.data;
      let response1 = await getListData(Object.assign(param,{id: '84'}));
      console.log(response1)
      this.newlist1 = response1.data;
      let response2 = await getListData(Object.assign(param,{id: '96'}));
      this.newlist2 = response2.data;
      let response3 = await getListData(Object.assign(param,{id: '95'}));
      this.newlist3 = response3.data;
      // let response4 = await getListData(Object.assign(param,{id: '94'}));
      // this.newlist4 = response4.data;
      // let response5 = await getListData(Object.assign(param,{id: '95'}));
      // this.newlist5 = response5.data;
    },
    turnToPage(tab, left){
      window.location.href="info.html#/infoDetail?id="+tab.ID+'&left='+left
    }
  }
}
</script>
