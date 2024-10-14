<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      locale: zhCN
    }
  },
  mounted () {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      window.addEventListener('hashchange', () => {
        let currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)// 主动更改路由界面
        }
      }, false)
    }
  }
}
</script>

<style lang="less">

  #app {
    height: 100%;
    width: 100%;
    padding: 0px;
    margin: 0px;
  }
  .fullContent{
    position:absolute;
    top:0px;
    bottom:0;
    left:0;
    right:0;
    overflow: auto;
  }

</style>
