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
  data () {
    return {
      locale: zhCN
    }
  },
}
</script>

<style lang="less">

#app {
  margin: 0;
  padding: 0;
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
