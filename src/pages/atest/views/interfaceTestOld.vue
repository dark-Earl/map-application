<template>
  <div>
    <a-button type="primary" @click="interfaceTestOld">
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
      let param ={"fsje":"1","jymm":"MDAwMDAw","phoneCaptcha":"999999"}
      cxStatisticalData(param).then(res=>{
        if(res.code==200){
          this.dataTest = res.data
        }
      }).catch(e=>{
        console.log(e)
      })

    },
  }
}
</script>
