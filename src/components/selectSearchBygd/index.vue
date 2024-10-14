<template>
  <a-select show-search v-model="search" placeholder="输入股东名称/证件号码/股东编号" :filter-option="false"
            style="width: 350px" @search="fetchData" @change="handleChange">
    <a-select-option v-for="(item,index) in searchNameList" :key="index" :value="item.KHH">
      {{item.FullName}}({{item.IDNumber}} {{item.KHH}})
    </a-select-option>
  </a-select>
</template>

<script>
import debounce from 'lodash/debounce'
import { gdmcFuzzy, tgqyFuzzy } from '@/api/bankAcc/BusinessQueryHandle'
export default {
  name: 'selectSearch',
  props: {
    vModel: null
  },
  data: function () {
    this.lastFetchId = 0 //只取最后一次结果
    this.fetchData = debounce(this.doSearchDataList, 1000)
    return {
      searchNameList: [],
      search: undefined
    }
  },
  mounted (){

  },
  methods: {
    doSearchDataList (value) {
      debugger
      this.searchNameList = []
      this.lastFetchId += 1
      const fetchId = this.lastFetchId
      gdmcFuzzy({ searchKey: value }).then(res => {
        if (res.code === 200) {
          if (fetchId !== this.lastFetchId) {
            return
          }
          this.searchNameList = res.data || []
        }
      }).catch(e => {
        this.searchNameList = []
      })
    },
    handleChange (val) {
      this.$emit('searchParent', val)
    },
    clear () {
      this.search = undefined
      this.searchNameList = []
    }
  }

}
</script>
