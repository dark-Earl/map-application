<template>
  <a-select show-search v-model="search" placeholder="请输入股权代码/公司名称" :filter-option="false"
            style="width: 300px" @search="fetchData" @change="handleChange" allowClear @focus="doSearchDataList('')">
    <a-select-option v-for="(item,index) in searchNameList" :key="index" :value="item.STOCKCODE">
      {{item.DISPLAYCODE}}({{item.ENTERPRISENAME}})
    </a-select-option>
  </a-select>
</template>

<script>
import debounce from 'lodash/debounce'
import { tgqyFuzzy } from '@/api/bankAcc/BusinessQueryHandle'
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
  methods: {
    doSearchDataList (value) {
      this.searchNameList = []
      this.lastFetchId += 1
      const fetchId = this.lastFetchId
      tgqyFuzzy({ searchKey: value }).then(res => {
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
