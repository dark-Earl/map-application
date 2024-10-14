<template>
  <div v-if="mapDisplay">
    <el-amap vid="amap" id="amap" ref="elAmap" :plugin="plugin" class="amap-demo" :center="center" :zoom="zoom">
      <el-amap-polygon v-if="multiPoint"  :path="polygons" strokeColor="red" fillColor="red" fillOpacity="0.2"></el-amap-polygon>
      <el-amap-marker v-else v-for="(marker,index) in markers" :key="index" :position="marker"></el-amap-marker>
        <div id="info-window" v-if="window.visible" class="mapCenterBottom">
          <a-tabs default-active-key="famousScenery" @change="changeTypeDisplay">
            <a-tab-pane key="famousScenery" tab="风景名胜" style="height: 335px; overflow-y:scroll;">
              <div class="list-loc" v-for="(item3,index3) in famousScenery" :key="item3.id" @click="movePoint(item3.location,item3.name,index3+1)">
               <span class="fl"><i class="icon-loc01"><span>{{index3+1}}</span></i> &nbsp;{{item3.name}}</span>
                <span class="fr mr45"><i class="icon-loc02"></i>{{item3.distance}}米</span>
                <div class="clear"></div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="parkPlaza" tab="公园广场" force-render style="height: 335px; overflow-y:scroll;">
              <div class="list-loc" v-for="(item3,index3) in parkPlaza" :key="item3.id" @click="movePoint(item3.location,item3.name,index3+1)">
                <span class="fl"><i class="icon-loc01"><span>{{index3+1}}</span></i> &nbsp;{{item3.name}}</span>
                <span class="fr mr45"><i class="icon-loc02"></i>{{item3.distance}}米</span>
                <div class="clear"></div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
    </el-amap>
    <div>
      <a-button @click="resetPoint">返回重新选点</a-button>
    </div>
  </div>
</template>

<script>

export default {
  props: ['coordinate','initCity'],
  data() {
    let self = this;
    let point = JSON.parse(this.coordinate)
    let a = [point]
    let b = point
    return {
      multiPoint: a.length>1,
      zoom: 15,
      markers: a,
      polygons: a,
      map: null,
      center: b,
      window: {
        visible: false
      },
      markersOthers: [],
      famousScenery: [],
      parkPlaza: [],
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [
        {
          pName: "MapType",
          defaultType: 1, //0代表默认，1代表卫星
          showTraffic: false, // 路网
          showRoad: true, // 路况
        },
        {
          pName: "Scale",
          position: 'LB'
        },
        {
          pName: "ToolBar",
          position: 'LT'
        }
      ],
      events: {
        click (e) {
          self.clickPoint(e)
        }
      },
      mapEle: null,
      makersTitle: [],
      mapDisplay: false,
      count: 0,
      xSite: 50,
      ySite: 50
    }
  },
  mounted() {
    let that = this
    this.renderTime()
    this.closeMouseOver()
    this.$nextTick(()=>{
      setTimeout(function () {
        if(!!document.getElementsByClassName('amap-maptypecontrol')[0]){
          document.getElementsByClassName('amap-maptypecontrol')[0].style.opacity='0'
          that.displayWindow(that.center)
          that.mapEle = that.$refs.elAmap.$$getInstance()
          that.moveMap()
        }else{
          location.reload()
        }
      },2000)
    })
  },
  methods: {
    clickPoint (e) {
      let position = [e.lnglat.lng, e.lnglat.lat]
      this.displayWindow(position)
    },
    displayWindow: function (position) {
      this.getMapInfo(position, '风景名胜', 'famousScenery')
      this.getMapInfo(position, '公园广场', 'parkPlaza')
      this.window.visible = true
      if(!this.window.position){
        this.window.position = position
      }
      if(this.window.visible){
        this.setTypeMarker(this['famousScenery'])
      }else{
        this.removeMarker()
      }
    },
    resetPoint(){
      this.$router.push({ name: 'mapAnnotate', params: {}, query: {} })
    },
    changeTypeDisplay (key){
      if (this.makersTitle) {
        this.$refs.elAmap.$$getInstance().remove(this.makersTitle);
      }
      this.setTypeMarker(this[key])
    },
    renderTime(){
      let that = this
      setTimeout(function () {
        that.mapDisplay = true
      },500)
    },
    getMapInfo: function (position,type,name) {
      let tha = this
      if(!tha[name] || tha[name].length===0){
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type: type, // 兴趣点类别
          pageSize: 50, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: this.initCity, // 兴趣点城市
          citylimit: true,  //是否强制限制在设置的城市内搜索
        });
        var cpoint = position; //中心点坐标
        placeSearch.searchNearBy('', cpoint, 60000, function(status, result) {
          if(result.info==='OK'){
            tha[name]=result.poiList.pois
            if(name==='famousScenery'){
              tha.setTypeMarker(tha['famousScenery'])
            }
          }
        });
      }

    },
    setTypeMarker(list){
      this.removeMarker()
      let i=1
      for(let item3 of list){
        let x = item3.location.lng
        let y = item3.location.lat
        this.setMarker([x,y],i)
        i++
      }
    },
    //  添加标记
    setMarker(lnglat,index) {
      let marker = new AMap.Marker({
        position: lnglat,
        content: `<i class="icon-loc01"><span>${index}</span></i>`
      });
      marker.setMap(this.$refs.elAmap.$$getInstance());
      this.markers.push(marker);
    },
    movePoint(location,title,index){
      if (this.makersTitle) {
        this.$refs.elAmap.$$getInstance().remove(this.makersTitle);
      }
      let lnglat = [location.lng,location.lat]
      let style0 = 'transform:scale(2)'
      let style = 'width: 200px;\n' +
        '    height:auto;\n' +
        '    background-color: white;margin-left:-100px;text-align:center;'
      let marker = new AMap.Marker({
        position: lnglat,
        content: `<i class="icon-loc01" style="${style0}">${index}</i><div class='map-dot' style="${style}">${title}</div>`
      });
      this.mapEle.setCenter(lnglat)
      this.moveMap()
      marker.setMap(this.$refs.elAmap.$$getInstance());
      this.makersTitle.push(marker)
    },
    // 删除之前的标记点
    removeMarker() {
      if (this.markers && this.$refs.elAmap) {
        this.$refs.elAmap.$$getInstance().remove(this.markers);
      }
    },
    moveMap(){
      // 将中心点左上角偏移
      this.mapEle.panBy(-120, -200);
    },
    closeMouseOver(){
      let _this = this
      $("#amap").on('mouseout',function(){
        _this.$refs.elAmap.$$getInstance().setStatus({scrollWheel:false})
      })
      $("#amap").on('mouseenter',function(){
        _this.$refs.elAmap.$$getInstance().setStatus({scrollWheel:false})
      })
    }
  }
}
</script>

<style scoped>
  .getlocation{
    margin-left:4rem;
    font-size:15px;
    font-weight: 500;
    margin-top:0.3rem;
  }
  .amap-demo {
    height: 740px;
    width:600px !important;
    margin-top: 0.3rem;
  }
  #info-window{
    background-color: white;
    width: 385px;
  }
  .amap-maptypecontrol .amap-maptype-list{
    opacity: 0;
  }
  .mapCenterBottom{
    z-index: 100;
    position: relative;
    top: -60%;
    left: 2%;
  }
  .map-dot{
    width: 200px;
    height:auto;
    text-align: center;
    border: 2px solid gold;
    border-radius: 10px;
    background: gold;
  }

</style>
<style>
  #app{
    overflow-x: hidden;
  }
  .map-dot{
    width: 200px;
    height:auto;
    text-align: center;
    border: 2px solid gold;
    border-radius: 10px;
    background: gold;
    position: relative;
  }
  .map-dot::before,
  .map-dot::after {
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
  .mr45{
    margin-right: 45px;
  }

  .map-dot::after {
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
