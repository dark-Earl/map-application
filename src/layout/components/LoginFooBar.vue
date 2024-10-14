<template>
     <div class="sign-footer">
      <div class="footer">
            <div class="footer-team">
                <ul>
                    <li>
                        <p class="title">关于我们</p>
                        <a href="">中心介绍</a>
                        <a href="">科技创新专板介绍</a>
                        <a href="">风险提示</a>
                        <a href="">免责条款</a>
                    </li>
                    <li>
                        <p class="title">新闻公告</p>
                        <a href="">新闻动态</a>
                        <a href="">公告通知</a>
                    </li>
                    <li>
                        <p class="title">会员中心</p>
                        <a href="">政策法规</a>
                        <a href="">业务规则</a>
                        <a href="">常见问题</a>
                    </li>
                    <div class="clear"></div>
                </ul>
            </div>
            <div class="fl-copyright">
                <div class="footer-team footer-team-text">
                    <p>客服电话 人工服务时间 9:00～17:30</p>
                    <p class="tell mb20">{{uiMap['customer.phone']}}</p>
                    <p>地址：陕西省西安市高新区锦业路125号</p>
                    <p>半导体产业园西部金融大厦5层</p>
                </div>
                <div class="footer-team">
                    <p class="QR-code"><img src="../../assets/images/logo/QR-code.jpg" /></p>
                    <p class="QR-code-text">微信公众号</p>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="copyright">
            <p>版权所有 © 2022 <a href="">{{uiMap['system.name']}}</a>  {{uiMap['customer.filing.no']}}   </p>
        </div>
    </div>
</template>
<script>
import {readProps} from "@/api/home/home";
export default {
  data(){
    return {
      uiMap: {}
    }
  },
  mounted () {
    this.readProps()
  },
  methods: {
    readProps () {
      let params = {
        keys: ["customer.phone","customer.fax","customer.email","customer.complaints.hotline","customer.complaints.email",
          "customer.postal.code","customer.address","system.name","customer.filing.no"]
      }
      readProps(params).then(res => {
        if (res.code === 200) {
          this.uiMap = res.data
          let a = this.uiMap["customer.phone"]
          let b = this.uiMap['customer.fax']
        }
      }).catch(e => {
        console.log(e);
      })
    },
  }
}
</script>
