<template>
  <div>
    <div>
      <a-button type="primary" @click="interfaceTest1">
        本地接口发送测试1
      </a-button>
    </div>
    <div style="margin-top:20px;">
      <a-button type="primary" @click="interfaceTest2">
        本地接口发送测试2
      </a-button>
    </div>
    <div style="margin-top:20px;">
      <a-button type="primary" @click="interfaceTestOutside1">
        外部接口发送测试1
      </a-button>
    </div>
    <div style="margin-top:20px;">
      <a-button type="primary" @click="interfaceTestOutside2">
        外部接口发送测试2
      </a-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

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
    interfaceTest1() {
      let param = {}
      param['querys'] = JSON.stringify({gqdm:'A00002',gfxz:'0'})
      let url = '/qqsq/confirmRight'
      this.interfaceCall(param,url).then(res=>{
        if(res.code==200){
          this.dataTest = res.data
        }
      }).catch(e=>{
        console.log(e)
      })
    },
    interfaceTest2() {
      let param ={"fsje":"1","jymm":"MDAwMDAw","phoneCaptcha":"999999"}
      let url = '/investBusiness/getUserInfo'
      this.interfaceCall(param,url).then(res=>{
        if(res.code==200){
          this.dataTest = res.data
        }
      }).catch(e=>{
        console.log(e)
      })
    },
    interfaceTestOutside1() {
      let param ={
        body: JSON.stringify({gqdm : '891001',wtlb : '2'})
      }
      let url = 'http://localhost:8801/gqjy/getEntrustData'
      this.interfaceCallOutside(param,url).then(res=>{
        if(res.code==200){
          this.dataTest = res.data
        }
      }).catch(e=>{
        console.log(e)
      })
    },
    interfaceTestOutside2() {
      let param ={"fsje":"1","jymm":"MDAwMDAw","phoneCaptcha":"999999"}
      let url = 'http://10.8.12.108:8801/fund/cj'
      this.interfaceCallOutside(param,url).then(res=>{
        if(res.code==200){
          this.dataTest = res.data
        }
      }).catch(e=>{
        console.log(e)
      })
    },



    // 通过request调用接口
    interfaceCall(data,url){
      return request({
        url: url,
        method: 'post',
        data
      })
    },
    interfaceCallOutside(data,url){
      return request({
        url: url,
        method: 'post',
        data
      })
    }
  },
}
</script>
