<template>
  <div>
    <div class="user-left-top">
      <div class="user-left-img">
        <div class="user-left-img-thum">
          <span>{{ userInfo.roleName }}</span>
        </div>
      </div>
      <div class="user-name">{{ userInfo.custName }}</div>
      <!-- <div class="user-role">{{ userInfo.roleName }}</div> -->
    </div>
    <div class="user-left-wrap">
      <ul>
        <li key="/ywbl" @click="buttonYwbl()">
          <a>
            <a-icon type="file-text" theme="twoTone" />
            <p>业务办理</p>
          </a>
        </li>
        <li key="/lczx" @click="buttonUrl('lczx')">
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


      <!--游客账户-->
      <template>
        <!-- <a-menu-item
          key="/lczx"
          @click="buttonUrl('lczx')"
        >
          <a-icon type="profile" />
          <span>流程中心</span>
        </a-menu-item>

        <a-menu-item
          key="/ywbl"
          @click="buttonYwbl()"
        >
          <a-icon type="profile" />
          <span>业务办理</span>
        </a-menu-item> -->
      </template>
    </a-menu>
  </div>
</template>
<script>

export default {
  mounted() {
    // 触发 getInfo ,在src/layout/components/NavBar.vue 中注册的事件
    this.$commonEvent.$on("getUserInfo", (data) => {
      console.log(data);
      this.userInfo = data;
    })
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
      hasZTID:false
    };
  },
  created(){
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
    buttonYwbl () {
      location.href = this.basePath + "handle.html#/ywbl";
    },
    buttonUrl (url) {
      location.href = this.basePath + "zhzx.html#/"+url;
    }
  },
};
</script>

