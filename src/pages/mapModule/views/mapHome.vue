<template>
  <div id="homePage">
    <a-divider>地图引导页</a-divider>

    <div id="nav">
      <input type="hidden" id="swidth" name="swidth">
      <ul class="nav-menu clearfix unstyled">
        <li>
          <a @click="turnToPage('mapModule.html#/mapAnnotate')" class="three-d">
                <span class="three-d-box">
                    <div class="front originDisplay" :style="`background-image: url(${imgUrl1})`">
                        <p class="explainPoint">标记坐标</p>
                    </div>
                        <div class="back" :style="`background-image: url(${imgUrl1})`">
                        <p class="explainPoint">前往标记</p>
                    </div>
                </span>
          </a>
        </li>
        <li>
          <a @click="sweetTip" class="three-d">
                <span class="three-d-box">
                    <div class="front originDisplay" :style="`background-image: url(${imgUrl2})`">
                        <p class="explainPoint">名胜古迹</p>
                    </div>
                    <div class="back" :style="`background-image: url(${imgUrl2})`">
                        <!--<p>观看效果</p>-->
                    </div>
                </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: "mapHome",
  data(){
    return {
      imgUrl1: require('@/assets/images/index/maker.png'),
      imgUrl2: require('@/assets/images/index/places.png')
    }
  },
  methods: {
    turnToPage(url){
      window.open(window.BASE_URL+url,'_blank')
    },
    sweetTip(){
      this.$message.info("请先标记地点!")
    }
  }
}
</script>

<style scoped>
  body{
    background-color: #e9dada;
    width: 100%;
  }
  .nav-menu {
    display: block;
    width: 100%;
    margin: auto;
  }

  .nav-menu > li {
    width:290px;
    height:270px;
    margin:10px 50px 10px;
    display: inline;
    float: left;
    transform:scale(1.5);
  }

  .nav-menu li a {
    width:100%;
    height:280px;
    color: #fff;
    display: block;
    text-decoration: none;
    font-family: 'sansationregular';
    -webkit-font-smoothing: antialiased;
    text-transform: capitalize;
    overflow: visible;
    line-height: 20px;
    font-size: 20px;
    /*padding: 15px 30px 15px 31px;*/
  }

  /* animation domination */
  .three-d {
    perspective: 200px; /*3D透视效果*/
    transition: all .07s linear;
    position: relative;
  }

  .three-d:not(.active):hover {
    cursor: pointer; /*获得指针焦点*/
  }

  .three-d:not(.active):hover .three-d-box,
  .three-d:not(.active):focus .three-d-box {
    transform: translateZ(-270px) rotateX(90deg);
  }

  .three-d-box {
    transition: all .3s ease-out;
    transform: translatez(-270px);
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
  }

  .front {
    transform: rotatex(0deg) translatez(140px);
    display: inline-block;
  }

  .back {
    transform: rotatex(-90deg) translatez(140px);
    color: #FFE7C4;
  }

  .front, .back {
    display: block;
    border-radius:10%;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #74adaa;
    color: white;
    pointer-events: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .nav-menu li .active .front,
  .nav-menu li .active .back,
  .nav-menu li a:hover .front,
  .nav-menu li a:hover .back {
    background-color: #51938f;
    background-image: linear-gradient(45deg, #478480 25%, transparent 25%, transparent 75%, #478480 75%, #478480), linear-gradient(45deg, #478480 25%, transparent 25%, transparent 75%, #478480 75%, #478480);
  }

  .nav-menu ul {
    position: absolute;
    text-align: left;
    line-height: 40px;
    font-size: 14px;
    width: 200px;
    transition: all 0.3s ease-in;
    transform-origin: 0 0;
    transform: rotateX(-90deg);
    backface-visibility: hidden;
  }
  /*描述文字*/
  .front p{
    position:absolute;
    top:80%;
    left:65%;
  }
  .back p{
    position:absolute;
    top:40%;
    left:43%;
  }
  /*图像设置*/
  .originDisplay{
    background-repeat: no-repeat;
    background-size:100% 100%;
  }

</style>
<style>
  /*说明文本*/
  .explainPoint{
    height:auto;
    text-align: center;
    border: 2px solid gold;
    border-radius: 10px;
    background: goldenrod;
    position: relative;
  }
  .explainPoint::before,
  .explainPoint::after {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid gold;
    animation: clippath 3s infinite linear;
    border-radius: 10px;
  }

  .explainPoint::after {
    animation: clippath 3s infinite -1.5s linear;
  }

  @keyframes clippath {
    0%,
    100% {
      clip-path: inset(0 0 98% 0);
    }

    25% {
      clip-path: inset(0 98% 0 0);
    }
    50% {
      clip-path: inset(98% 0 0 0);
    }
    75% {
      clip-path: inset(0 0 0 98%);
    }
  }
</style>
