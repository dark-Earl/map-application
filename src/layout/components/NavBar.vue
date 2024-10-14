<template>
  <div class="header-bg">
      <div class="header-top">
        <a-input-search v-model="keyword" placeholder="请输入关键字搜索" enter-button @search="search"
                        style="width: 200px;vertical-align: middle;" class="test"/>
        <div class="h-user" v-show="!userInfo.login">
          <a-dropdown>
            <a class="ant-dropdown-link" v-show="!userInfo.login" @click="login" > 登录 </a>
          </a-dropdown>
          <span class="plpr10">|</span>
          <a  v-show="!userInfo.login"  :href="basePath + 'register.html'" >注册</a>
        </div>
        <div class="h-user" v-show="userInfo.login">
          <a @click="gotoZhzx">
            <span class="role" v-if="userInfo.qualifiedInvestors">合格投资者</span>
            <span class="role" v-else>{{userInfo.roleName}}</span>
            <span class="name">{{ userInfo.username }}</span>
          </a>
          <a  @click="logout"> &nbsp;退出</a>
        </div>
      </div>

      <div class="header">
        <div class="logo">
          <a :href="'/home.html'">
            <template >
              <img src="../../assets/images/logo/logo.png" />
            </template>
          </a>
        </div>

        <a-menu v-model="current" mode="horizontal">
              <a-menu-item key="home" @click="tabsChange">
                <a :href="'/home.html'">首页</a>
              </a-menu-item>
              <a-sub-menu key="ywzq:0" @titleClick="subTabsChange">
                <span slot="title" class="submenu-title-wrapper">
                  业务专区 <a-icon class="fs12" type="down" />
                </span>
                <!--<sub-menu-list v-for="(item,index) in info3" :item="item" @click="tabsChange"></sub-menu-list>-->
                <template v-for="(item,index) in info3">
                  <a-menu-item :key="'ywzq:'+index" @click="tabsChange">
                    <a :href="basePath +'ywzq.html#/index?id='+item.ID">{{item.Name}}</a>
                  </a-menu-item>
<!--                  <a-sub-menu v-else :title="item.name">-->
<!--                    <template v-for="(item1,index) in item.children.list">-->
<!--                      <a-menu-item v-if="item1.children.size === 0">{{item1.name}}</a-menu-item>-->
<!--                      <a-sub-menu v-else :title="item1.name">-->
<!--                        <template v-for="(item2,index) in item1.children.list">-->
<!--                          <a-menu-item >{{item2.name}}</a-menu-item>-->
<!--                        </template>-->
<!--                      </a-sub-menu>-->
<!--                    </template>-->
<!--                  </a-sub-menu>-->
                </template>
              </a-sub-menu>
              <a-menu-item key="qyml" @click="tabsChange">
                <a :href="basePath + 'qyml.html#/List'">企业名录</a>
              </a-menu-item>
              <a-sub-menu key="hyzq:1" @titleClick="subTabsChange">
                <span slot="title" class="submenu-title-wrapper">
                  会员专区 <a-icon class="fs12" type="down" />
                </span>
                <a-menu-item v-for="(item,index) in info4" :key="'hyzq:'+item.id" @click="tabsChange">
                  <a v-if="!!item.xglj" @click="openPage(item.xglj)">{{item.name}}</a>
                  <a :href="basePath + 'info.html#/infoList?id=' + item.id" v-else>{{item.name}}</a>
                </a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="tzzzq:1" @titleClick="subTabsChange">
                <span slot="title" class="submenu-title-wrapper">
                  投资者专区 <a-icon class="fs12" type="down" />
                </span>
                <a-menu-item  v-for="(item,index) in info5" :key="'tzzzq:'+item.id" @click="tabsChange">
                  <a :href="basePath +item.xglj" v-if="!!item.xglj">{{item.name}}</a>
                  <a :href="basePath + 'info.html#/infoList?id=' + item.id" v-else>{{item.name}}</a>
                </a-menu-item>
              </a-sub-menu>
              <a-menu-item key="xxpl" @click="tabsChange">
                <a :href="basePath + 'info.html#/xxplList'">信息披露</a>
              </a-menu-item>
              <!--<a-sub-menu key="xxpl:1" @titleClick="tabsChange">-->
                <!--<span slot="title" class="submenu-title-wrapper">-->
                  <!--信息披露 <a-icon class="fs12" type="down" />-->
                <!--</span>-->
                <!--<a-menu-item  v-for="(item,index) in info6" :key="'xxpl:'+item.id" @click="tabsChange">-->
                  <!--<a :href="basePath +item.xglj" v-if="!!item.xglj">{{item.name}}</a>-->
                  <!--<a :href="basePath + 'info.html#/infoList?id=' + item.id" v-else>{{item.name}}</a>-->
                <!--</a-menu-item>-->
              <!--</a-sub-menu>-->
              <a-sub-menu key="zcpt:1" @titleClick="subTabsChange">
                <span slot="title" class="submenu-title-wrapper">
                  政策平台 <a-icon class="fs12" type="down" />
                </span>
                <a-menu-item  v-for="(item,index) in info7" :key="'zcpt:'+item.ZCJB" @click="tabsChange">
                  <a :href="basePath +'info.html#/policyInfoList?ZCJB='+ item.ZCJB">{{item.name}}</a>
                </a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="jypt:1" @titleClick="subTabsChange">
                <span slot="title" class="submenu-title-wrapper">
                  交易平台 <a-icon class="fs12" type="down" />
                </span>
                <a-menu-item key="jypt:1" @click="tabsChange">
                  <a @click="loginPage('gqjy.html#/list')">股权交易</a>
                </a-menu-item>
                <a-menu-item key="jypt:2" @click="tabsChange">
                  <a @click="loginPage('kzz.html#/tzzqList')">可转债交易</a>
                </a-menu-item>
                <a-menu-item key="jypt:3" @click="tabsChange">
                  <a :href="basePath + 'sci-tech'">科技创新专板</a>
                </a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="gywm:1" @titleClick="subTabsChange">
                <span slot="title" class="submenu-title-wrapper">
                  关于我们 <a-icon class="fs12" type="down" />
                </span>
                <a-menu-item v-for="(item,index) in info8" :key="'gywm:'+item.ID" @click="tabsChange">
                  <a :href="basePath + 'info.html#/communicationList?id=' + item.ID" v-if="item.ID===59">{{item.Name}}</a>
                  <a :href="basePath + 'info.html#/infoList?id=' + item.ID" v-else>{{item.Name}}</a>
                </a-menu-item>
              </a-sub-menu>
            </a-menu>
      </div>
      <!-- 登录-弹窗 -->
      <a-modal :visible="visible" :confirm-loading="confirmLoading" @cancel="handleCancel" @ok="handleOk" :footer="null">
        <div>
          <log-box></log-box>
        </div>
      </a-modal>
    </div>

</template>

<script>
// import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { Modal } from 'ant-design-vue'
import SubMenuList from "@/components/SubMenuList";
export default {
  components: {SubMenuList},
  mounted () {
    this.headMenuList()
    this.headMenuListSingle()
    if (Cookies.get("navStat")) {
      this.$set(this.current, 0, Cookies.get("navStat"));
    }
  },
  data () {
    const basePath = window.BASE_URL
    const baseApiPath = window.BASE_API_URL
    let isLogin = localStorage.getItem('isLogin')
    return {
      basePath: basePath,
      baseApiPath: baseApiPath,
      qyLoginForm: this.$form.createForm(this, { name: 'qyLoginForm' }),
      keyword: this.$route.query.keyword !== undefined ? this.$route.query.keyword : '',
      confirmLoading: false,
      isShowAutoCompleteTip: true,
      userInfo: {
        custName: '',
        username:'',
        login: false,
        smrz: false,
        cid: '',
        insType: '',
        needLogin:''
      },
      selectOrg: {
        name: '',
        cid: ''
      },
      dataSource: [],
      visible: false,
      current: ['home'],
      text: 'Unselect',
      info3: [],
      info4: [],
      info5: [],
      info6: [],
      info7: [
        {name: '政策法规',ZCJB: '1'},
        {name: '奖补政策',ZCJB: '2'},
      ],
      info8: [],
      isLogin: isLogin ==='true'
    }
  },
  methods: {
    login () {
      let reqUri = location.pathname + location.hash
      let loginUrl = this.basePath + 'login.html'
      if (reqUri !== '') {
        loginUrl = loginUrl + '#/?reqUri=' + encodeURIComponent(reqUri)
      }
      location.href = loginUrl
    },
    logout () {
      this.$store.dispatch('user/logout').then((response) => {
        removeToken()
        location.href = this.basePath + 'login.html'
      }).catch(() => {

      })
    },
    gotoZhzx () {
      location.href = this.basePath + 'zhzx.html#/index'
    },
    search () {
      if (this.keyword === '') {
        Modal.info({
          closable: true,
          title: '温馨提示',
          okText: '确认',
          content: '请输入搜索关键字',
          onOk: function () {

          }
        })
        return
      }
      this.isShowAutoCompleteTip = false
      location.href = this.basePath + 'search.html#/?keyword=' + encodeURIComponent(this.keyword)
    },

    searchResult (value) {
      let that = this
      let fm = new FormData()
      fm.append('q', value)
      fm.append('pageNo', 1)
      fm.append('pageSize', 10)
      fm.append('type', 'all')

      EsSearchHandle.search(fm).then(response => {
        // 处理标题重复
        let data = response.data
        let obj = {}
        let newData = data.reduce((cur, next) => {
          obj[next.ProjectName] ? '' : obj[next.ProjectName] = true && cur.push(next)
          return cur
        }, []) // 设置cur默认类型为数组，并且初始值为空的数组

        that.dataSource = newData
      }, response => {

      }).catch(e => {
        console.log(e)
      })
    },
    tabsChange: function (ev) {
      this.current[0] = ev.key
      Cookies.set("navStat", ev.key);
    },
    subTabsChange: function (ev, domEvent) {

      let url;
      let key;
      switch (ev.key) {
        case 'ywzq:0':
          key = 'ywzq:0'
          url = 'ywzq.html#/index?id=' + this.info3[0].ID
          break
        case 'hyzq:1':
          key = 'hyzq:' + this.info4[0].id
          url = 'info.html#/infoList?id=' + this.info4[0].id
          break
        case 'tzzzq:1':
          key = 'tzzzq:' + this.info5[0].id
          url = 'info.html#/infoList?id=' + this.info5[0].id
          break
        case 'zcpt:1':
          key = 'zcpt:' + this.info7[0].ZCJB
          url = 'info.html#/policyInfoList?ZCJB=' + this.info7[0].ZCJB
          break
        case 'jypt:1':
          key = 'jypt:1'
          url = 'gqjy.html#/list'
          break
        case 'gywm:1':
          key = 'gywm:' + this.info8[0].ID
          url = 'info.html#/infoList?id=' + this.info8[0].ID
          break
      }

      this.current[0] = key
      Cookies.set("navStat", key)

      if(key === 'jypt:1' && !this.isLogin){
        window.location.href = window.BASE_URL + 'login.html'
      }else{
        location.href = this.basePath + url
      }


    },
    handleCancel(){

    },
    handleOk(){

    },
    turnToPage (url) {
        location.href = this.basePath + url
    },
    loginPage (url) {
      if(this.isLogin){
        location.href = this.basePath + url
      }else{
        window.location.href = window.BASE_URL + 'login.html'
      }
    },
    openPage(url){
      window.open(this.basePath + url, '_blank')
    },
  }
}
</script>
<style lang="scss">
  .ant-btn-primary {
    color: #fff;
    background-color: #D50000;
    border-color: #D50000;
  }
</style>
