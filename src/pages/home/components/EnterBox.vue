<template>
  <div class="enter-box">
      <ul>
        <li>
          <a @click="JumpJudgment('zssq','9')">
            <i class="index-enter-wyzs"></i>
            <p class="title">我要展示</p>
            <p class="link">去展示 <a-icon type="arrow-right" /></p>
          </a>
        </li>
        <li>
          <a @click="JumpJudgment('tgsq','11')">
            <i class="index-enter-wytg"></i>
            <p class="title">我要托管</p>
            <p class="link">去托管 <a-icon type="arrow-right" /></p>
          </a>
        </li>
        <li>
          <a @click="JumpJudgment('gpsq','10')">
            <i class="index-enter-wygp"></i>
            <p class="title">我要挂牌</p>
            <p class="link">去挂牌 <a-icon type="arrow-right" /></p>
          </a>
        </li>
        <li>
          <a :href="basePath +'ywzq.html#/index?id=12'">
            <i class="index-enter-wyrz"></i>
            <p class="title">我要融资</p>
            <p class="link">去融资 <a-icon type="arrow-right" /></p>
          </a>
        </li>
        <li>
          <a href="handle.html#/rhsq" v-if="role==='Tourist'">
            <i class="index-enter-jrhy"></i>
            <p class="title">加入会员</p>
            <p class="link">去入会 <a-icon type="arrow-right" /></p>
          </a>
          <a href="info.html#/infoList?id=39" v-else>
            <i class="index-enter-jrhy"></i>
            <p class="title">加入会员</p>
            <p class="link">成为会员 <a-icon type="arrow-right" /></p>
          </a>
        </li>
        <li>
          <a href="info.html#/infoList?id=43">
            <i class="index-enter-wskh"></i>
            <p class="title">网上开户</p>
            <p class="link">去开户 <a-icon type="arrow-right" /></p>
          </a>
        </li>
        <li>
          <a :href="basePath+'home.html#/qygz'">
            <i class="index-enter-qygz"></i>
            <p class="title">企业估值</p>
            <p class="link">去估值 <a-icon type="arrow-right" /></p>
          </a>
        </li>
        <li>
          <a @click="showModal">
            <i class="index-enter-qyxq"></i>
            <p class="title">企业需求</p>
            <p class="link">去登记 <a-icon type="arrow-right" /></p>
          </a>
        </li>
        <!-- <li>
          <a :href="basePath + 'sci-tech'">
            <i class="index-enter-kjcxb"></i>
            <p class="title">科技创新专板</p>
            <p class="link">去交易 <a-icon type="arrow-right" /></p>
          </a>
        </li> -->
      </ul>
    <a-modal v-model="visible" title="需求提交" @ok="handleOk" @cancel="handleCancel">
      <a-form-model ref="form" :model="form" :label-col="{span:6}" :wrapper-col="{span:14}" :rules="rules">
        <a-form-model-item label="联系人姓名" prop="LXRXM">
          <a-input v-model="form.LXRXM"/>
        </a-form-model-item>
        <a-form-model-item label="公司名称" prop="QYMC">
          <a-input v-model="form.QYMC"/>
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="LXDH">
          <a-input v-model="form.LXDH"/>
        </a-form-model-item>
        <a-form-model-item label="需求说明" prop="XQSM">
          <a-input v-model="form.XQSM" type="textarea"/>
        </a-form-model-item>
        <a-form-model-item label="上传材料">
          <upload ref="Enclosure" text="上传材料" work-type="fwdjcl" file-type="Enclosure" :fileList="form.enclofileList" @setFileList="setEnclofileList"></upload>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    </div>
</template>
<script>
import upload from '@/components/upload'
import {serviceRegist} from '@/api/home/home'
export default {
  components: {
    upload
  },
  name: 'ienterBox', // 首页入口
  data() {
    const basePath = window.BASE_URL
    const baseApiPath = window.BASE_API_URL
    return {
      userInfo: {},
      basePath: basePath,
      baseApiPath: baseApiPath,
      role: localStorage.getItem('role'),
      visible: false,
      form: {},
      /* 表单校验 */
      rules: {
        LXRXM: [{required: true, message: '联系人姓名不能为空', trigger: 'blur'}],
        QYMC: [{required: true, message: '企业名名称不能为空', trigger: 'blur'}],
        LXDH: [{required: true, message: '联系电话不能为空', trigger: 'blur'}],
        XQSM: [{required: true, message: '需求说明不能为空', trigger: 'blur'}],
      }
    }
  },
  mounted() {
    // 触发 getInfo ,在src/layout/components/NavBar.vue 中注册的事件
    this.$commonEvent.$on('getUserInfo', (data) => {
      this.userInfo = data
      console.log(this.userInfo)
    })
  },
  methods: {
    JumpJudgment(type,id){
      if(this.role==='Tourist'){
        window.location.href = this.basePath +'handle.html#/' +type
      }else{
        window.location.href = this.basePath +'ywzq.html#/index?id=' +id
      }
    },
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    setEnclofileList(fileList) {
      this.form.enclofileList = fileList.slice(-1)
    },
    handleOk(e) {
      this.$refs.form.validate(valid => {
        this.form.XQLB = '3'
        if (valid) {
          let params = {
            queryContent: JSON.stringify(this.form)
          }
          serviceRegist(params).then(res => {
            if (res.code === 200) {
              this.$message.success('企业需求提交成功！')
              this.form.enclofileList = []
              this.form = {}
              this.visible = false;
            }
          }).catch(e => {
          })
        } else {
          return false
        }
      })
    },
  }
}
</script>
