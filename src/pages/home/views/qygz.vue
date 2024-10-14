<template>
  <div>
    <iframe src="https://www.flcccc.com/stock/introduce.html?id=2700" frameborder="0" width="100%" :height="defaultHeight.height" scrolling="auto"></iframe>
  </div>
</template>
<script>
export default {
  data () {
    return {
      defaultHeight: {
        height: ""
      }
    }
  },
  components: {
  },
  created () {
    //页面创建时执行一次getHeight进行赋值，顺道绑定resize事件
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },
  methods: {
    //获取高度减去头尾
    getHeight() {
      this.defaultHeight.height = window.innerHeight - 90 + "px";
    }
  }
}
</script>
