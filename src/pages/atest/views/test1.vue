<template>
  <div>
    <a-button type="primary" @click="test2">
      接口发送测试
    </a-button>
  </div>
</template>

<script>
import {cxStatisticalData} from '@/api/home/home'

export default {
  name: "interfaceTestOld",
  components: {
  },
  data() {
    return {
      contents: '',
      dataTest: []
    };
  },
  created() {

  },
  methods: {
    interfaceTest() {
      let param ={}
      cxStatisticalData(param).then(res=>{
        if(res.code==200){
          this.dataTest = res.data
        }
      }).catch(e=>{
        console.log(e)
      })
    },
    async test1() {
      let flag = false
      let param ={}
      await cxStatisticalData(param).then(res=>{
        if(res.code==200){
          flag = true
        }
      }).catch(e=>{
        flag = true
        console.log(e)
      })
      return flag
    },

    async test2() {
      let aa =await this.test1()
      if(aa){
        console.log('1:' + aa)
      }else{
        console.log('2' + aa)
      }
    }
  }
}
</script>
