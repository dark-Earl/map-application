<template functional>
  <a-menu-item v-if="props.item.children.size === 0" :key="props.item.id"> <a >{{props.item.name}}</a></a-menu-item>
  <a-sub-menu v-else :title="props.item.name">
    <sub-menu-list v-for="(item1,index) in props.item.children.list"  v-bind:item="item1"></sub-menu-list>
  </a-sub-menu>
</template>

<script>
import SubMenuList from "@/components/SubMenuList";
import Cookies from "js-cookie";
export default {
  name: 'SubMenuList',
  props: ['item'],
  components: {
    SubMenuList
  },
  data: function () {
    const basePath = window.BASE_URL
    return {
      basePath: basePath
    }
  },
  created() {
  },
  methods: {
    tabsChange: function (ev) {
      debugger
      Cookies.set('navStat', ev.key)

      let item = this.item
      //如果有链接先跳转链接
      if (item.xglj !== null) {
        location.href = this.basePath + item.xglj
      } else {
        location.href = this.basePath + 'info.html#/infoList?id=' + item.id
      }
    }
  }

}
</script>
