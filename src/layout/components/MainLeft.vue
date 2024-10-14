<template>
  <div>
    <div class="user-left-top">
      <div class="user-left-img">
        <div class="user-left-img-thum">
          <span v-if="userInfo.qualifiedInvestors">合格投资者</span>
          <span v-else>{{ userInfo.roleName }}</span>
        </div>
      </div>
      <div class="user-name">{{ userInfo.custName }}</div>
      <!-- <div class="user-role">{{ userInfo.roleName }}</div> -->
    </div>
    <div class="user-left-wrap">
      <ul>
        <li key="/wdzc" @click="buttonUrl('wdzc')">
          <a>
            <a-icon type="home" theme="twoTone" />
            <p>账户首页</p>
          </a>
        </li>
        <li key="/lczx" @click="buttonUrl('gdLczx')">
            <a>
              <a-badge count="0">
                <a-icon type="profile" theme="twoTone" />
              </a-badge>
              <p>流程中心</p>
            </a>
        </li>
      </ul>
    </div>
    <a-menu
      :default-selected-keys="currentKey"
      :selectedKeys="currentKey"
      :open-keys.sync="openKeys"
      mode="inline"

    >

      <!--未激活账户-->
      <template v-if="userInfo.role.indexOf('UnActivate') > -1">
        <!--<a-menu-item-->
        <!--key="/zhjh"-->
        <!--@click="buttonZhjh"-->
        <!--&gt;-->
        <!--<a-icon type="pie-chart" />-->
        <!--<span>账户激活</span>-->
        <!--</a-menu-item>-->
        <a-menu-item  v-if="['UnActivateJg'].indexOf(userInfo.role) > -1"
                      key="/lczx"
                      @click="buttonUrl('gdLczx')"
        >
          <a-icon type="profile" />
          <span>流程中心</span>
        </a-menu-item>
      </template>
      <template v-else>
        <!-- <a-menu-item
          key="/wdzc"
          @click="buttonUrl('wdzc')"
        >
          <a-icon type="money-collect" />
          <span>我的资产</span>
        </a-menu-item> -->

        <a-menu-item
          key="/rzzx"
          @click="buttonUrl('rzzx')"
        >
          <a-icon type="safety-certificate" />
          <span>认证中心</span>
        </a-menu-item>
        <!-- <a-menu-item
          key="/lczx"
          @click="buttonUrl('gdLczx')"
        >
          <a-icon type="bars" />
          <span>流程中心</span>
        </a-menu-item> -->

        <a-sub-menu>
          <span slot="title">
            <a-icon type="red-envelope" />
            <span>我的债券产品</span>
          </span>
          <a-menu-item key="/wdtz"  @click="buttonUrl('wdtz')">
            我的投资
          </a-menu-item>
          <a-menu-item key="/kzzEntrust" @click="buttonUrl('kzzEntrust')">
            当日委托/撤单
          </a-menu-item>
          <a-menu-item key="/wdyhsy" @click="buttonUrl('wdyhsy')">
            我的已获收益
          </a-menu-item>
<!--          <a-menu-item key="/xyjy" @click="buttonUrl('xyjy')">-->
<!--            协议交易-->
<!--          </a-menu-item>-->
        </a-sub-menu>

        <a-sub-menu>
          <span slot="title">
            <a-icon type="line-chart" />
            <span>我的股权产品</span>
          </span>
          <a-menu-item key="/lswt"  @click="buttonUrl('lswt')">
            历史委托
          </a-menu-item>
          <a-menu-item key="/gqjyEntrust" @click="buttonUrl('gqjyEntrust')">
            当日委托/撤单
          </a-menu-item>
          <a-menu-item key="/djmx"
                       @click="buttonUrl('djmx')"
          >
            冻结明细
          </a-menu-item>
          <a-menu-item key="/gqywls"
                       @click="buttonUrl('gqywls')"
          >
            股权业务流水查询
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu>
              <span slot="title">
                <a-icon type="account-book" />
                <span>我的资金管理</span>
              </span>
          <a-menu-item key="/wdyhk" @click="buttonZjgl('wdyhk')">
            我的银行卡
          </a-menu-item>
          <a-menu-item key="/cz" @click="buttonZjgl('cz')">
            充值
          </a-menu-item>
          <a-menu-item key="/tx" @click="buttonZjgl('tx')">
            提现
          </a-menu-item>
          <a-menu-item key="/zzjl" @click="buttonZjgl('zzjl')">
            转账记录
          </a-menu-item>
          <a-menu-item key="/zzbdjl" @click="buttonZjgl('zzbdjl')">
            资金变动记录
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { message } from "ant-design-vue";

export default {
  mounted() {
    // 触发 getInfo ,在src/layout/components/NavBar.vue 中注册的事件
    this.$commonEvent.$on("getUserInfo", (data) => {
      this.userInfo = data;
    })
    // getUnreadCount().then(res => {
    //   this.unreadCount = parseInt(res.data.V_WDTS)
    // })
  },
  data() {
    const basePath = window.BASE_URL;
    return {
      basePath: basePath,
      userInfo: {
        userOrgList: [],
        login: false,
        smrz: false,
        cid: "",
        insType: "",
        role: "",
        bindCard: false
      },
      openKeys: ["sub1"],
      loading: false,
      imageUrl: "",
      previewVisible: false,
      visiblemodal: false,
      visiblemodal1: false,
      confirmLoading: false,
      fileList: [],
      unreadCount: 0,
    };
  },
  computed: {
    currentKey: function () {
      return [this.$route.path];
    },
  },
  methods: {
    getInfo() {
      // 定义 getUserInfo 事件数据传递
      this.$commonEvent.$emit("triggerGetUserInfo", null);
    },

    buttonLczx(type) {
      if(type === 1){
        location.href = this.basePath + "ywbl.html#/lczx";
      }else{
        location.href = this.basePath + "InvestorAcc.html#/lczx";
      }
    },
    buttonUrl(url){
      location.href = this.basePath + "zhzx.html#/"+url;
    },
  }
}
</script>
