<template>
  <div class="cont-box-info">
    <a-tabs @change="callback" size="large">
      <a-tab-pane v-for="(data,index) in dataList" :key="data.id" :tab="data.label">
        <span v-if="data.zsms == '2'" v-html="data.children[0].zxnr"></span>
        <div class="xxpl-list" v-else>
          <ul>
            <li v-for="(chirldData,index) in data.children">
              <a class="title" v-if="chirldData.zxfj.length > 0" v-text="chirldData.zxfj[0].fjname"></a>
              <a class="title" v-text="chirldData.bt"></a>
              <span class="time" v-text="chirldData.fbsj"></span>
            </li>
          </ul>
        </div>
      </a-tab-pane>
    </a-tabs>
    <div class="clear"></div>
  </div>
</template>

<script>
import { tree } from "@/api/ProductInfoDataHandle";

export default {
  name: 'product',
  props: ['gqlb', 'cpdm'],
  data: function () {
    return {
      dataList: []
    }
  },
  mounted () {
    this.getInfoDataApi()
  },
  methods: {
    async getInfoDataApi () {
      let param = {
        'gqlb': this.gqlb,
        'cpdm': this.cpdm
      }
      let response = await tree(param)
      this.dataList = response.data
    },
    callback (key) {
      console.log(key)
    }
  }
}
</script>
