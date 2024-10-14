<template>
  <div class="index-company-box">
    <div class="index-company-tabs">
      <ul>
        <li v-for="(v,i) in title" :class="n==i?'current':''" @click="changeGqlb(v,i)">{{v.title}}</li>
      </ul>
    </div>
    <div class="index-company-cont">
      <a :href="'qyml.html#/List?gqlb='+gqlb" class="more">更多 <a-icon type="arrow-right" /></a>
      <a-input-search placeholder="企业名称或企业代码" style="width:20%;" size="large" v-model="keyWord" enter-button @search="getQyxxList" />
      <a-table :columns="columns" :data-source="qydata" :pagination="false">
          <a slot="EnterpriseName" slot-scope="text,tab" @click="turnToPage(tab)">{{text}}</a>
        <td slot="ListingDate" slot-scope="text,tab">{{tab|formatDate}}</td>
        <p></p>
      </a-table>
      <div>
        <a-pagination :current="pageNo" :page-size="pageSize" :total="total"
                       @change="changePage" class="tr"/>
      </div>
    </div>
  </div>
</template>

<script>
import {getQyxxList} from '@/api/home/home'
import baseUtils from "@/utils/baseUtils";

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'EnterpriseName',
      key: 'EnterpriseName',
      scopedSlots: { customRender: 'EnterpriseName' },
      width: 400,
    },
    {
      title: '挂牌代码',
      dataIndex: 'DISPLAYCODE',
      key: 'DISPLAYCODE',
      width: 160,
    },
    {
      title: '注册资本(万元)',
      dataIndex: 'RegisteredCapital',
      key: 'RegisteredCapital',
      ellipsis: true,
    },
    {
      title: '行业',
      dataIndex: 'IndustryMC',
      key: 'IndustryMC',
      ellipsis: true,
      width: 300,
    },
    {
      title: '挂牌时间',
      dataIndex: 'ListingDate',
      key: 'ListingDate',
      ellipsis: true,
      scopedSlots: { customRender: 'ListingDate' }
    },
    // {
    //   title: '推荐商',
    //   dataIndex: 'AgencyMC',
    //   key: 'AgencyMC',
    //   ellipsis: true,
    // },
  ];
export default {
  name: 'CompanyBox', // 首页企业
  data() {
    return{
      qydata: [],
      columns,
      n:0,
      title:[
        {title: '交易板',gqlb: '03',level: '1'},
        {title: '成长板',gqlb: '02',level: '1'},
        {title: '科技创新专板',gqlb: '11',level: '2'},
        // {title: '专精特新专板',gqlb: '12',level: '2'}
        ],
      gqlb: '03',
      keyWord: '',
      pageNo: 1,
      pageSize: 8,
      total: 0
    }
  },
  created(){
    this.getQyxxList()
  },
  methods: {
    getQyxxList(){
      let id = this.gqlb
      let param = {
        body: JSON.stringify({
          gqlb: id,
          keyWord: this.keyWord,
          pageNo: this.pageNo + '',
          pageSize: this.pageSize + ''
        }),
      }
      getQyxxList(param).then(result => {
        if (result.code === 200) {
          this.qydata = result.data
          this.total = parseInt(result.extra.total);
        }
      }).catch(e => {
        console.log(e)
      })
    },
    changePage(current){
      this.pageNo = current
      this.getQyxxList()
    },
    changeGqlb(v,i){
      this.n = i
      // if(v.level==='1'){
      //
      // }
      this.gqlb = v.gqlb
      this.pageNo = 1
      this.getQyxxList()
    },
    turnToPage(tab){
      window.location.href="qyml.html#/detail?id="+tab.ID
    }
  },
  filters: {
    formatDate(date) {
      let day = date.ListingDate
      if(date.EquityCategory==='01'){
        day = date.DisplayDate
      }
      if(typeof day ==='number'){
        day = day + '';
      }
      return baseUtils.dateFormat(day,'-')
    }
  },
}
</script>

<style lang="less" scoped>
  .index-company-box {
    min-height: 320px;
  }
</style>
