<template>
  <div>
    <div class="footer-bg">
      <div class="footer-link-box">
        <ul>
          <li>
            <a href="info.html#/infoList?id=61">法律声明</a>
          </li>
          <li>
            <a href="info.html#/infoList?id=62">隐私声明</a>
          </li>
          <li>
            <a href="info.html#/infoList?id=63">免责条款</a>
          </li>
        </ul>
      </div>
    	<div class="footer-info-box">
    	  <div class="footer-info-fl">
    	    <p>电话：{{uiMap['customer.phone']}}</p>
          <p>传真：{{uiMap['customer.fax']}}</p>
          <p>Email：{{uiMap['customer.email']}}</p>
          <p>投诉电话：{{uiMap['customer.complaints.hotline']}}</p>
          <p>投诉邮箱：	{{uiMap['customer.complaints.email']}}</p>
          <p>邮编：{{uiMap['customer.postal.code']}}</p>
          <p style="width: 100%;">地址：{{uiMap['customer.address']}}</p>
    	  </div>
        <div class="footer-info-fr">
          <img src="../../assets/images/logo/QR-code.jpg" alt="">
          <p>扫码关注</p>
        </div>
    	</div>
    	<div class="copyright">
    		<a href="https://beian.miit.gov.cn/" target="_blank">© 2022 {{uiMap['system.name']}} </a>
			<img class="mlmr10" src="../../assets/images/footer/police.png" alt="">
			<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011502015876" target="_blank">{{uiMap['customer.filing.no']}}</a>
    		<div class="clear"></div>
    	</div>
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
        }
      }).catch(e => {
        console.log(e);
      })
    },
  }
}
</script>
