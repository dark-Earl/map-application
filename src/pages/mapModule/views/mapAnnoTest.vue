<template>
  <a-modal
    v-model="visible"
    title="地图标记"
    on-ok="handleOk"
    width="600px"
    height="750px"
    class="map-mark-modal"
    @cancel="handleCancel"
  >
    <template slot="footer">
      <a-button @click="cancelMarks"> 取消标记 </a-button>
      <a-button type="primary" @click="markOk"> 标记完成 </a-button>
    </template>
    <div id="container">
    </div>
    <div class="locationCity">
      <a-select style="width:85px;"
        @change="changeCity"
        v-model="initCityInfo"
      >
        <template v-for="item6 in cityOptions">
          <a-select-option :value="`${item6.NAME}_${item6.VALUE}_${item6.CENTERPOINT}`" :key="item6.NAME">
            {{ item6.NAME }}
          </a-select-option>
        </template>
      </a-select>
    </div>
    <div class="map-mark">
      <div class="search">
        <a-input-search
          placeholder="请输入关键字查找"
          enter-button id="tipinput"
        />
      </div>
      <div class="tol">
        <ul>
          <li class="mb0">
            <a class="btn-dd" @click="drawModel('point')">
              <i class="icon-dd2"></i>
              <p>打点</p>
            </a>
          </li>
          <!--<li>-->
            <!--<a class="btn-dd" @click="locatePoint">-->
              <!--<i class="icon-dd1"></i>-->
              <!--<p>定位</p>-->
            <!--</a>-->
          <!--</li>-->
        </ul>
      </div>
    </div>
  </a-modal>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import debounce from 'lodash/debounce'
window._AMapSecurityConfig = {
  securityJsCode: '8d77fab839badf82a6182859ba6722aa'
}
export default {
  name: "mapAnnotationTest",
  props: ['visible'],
  data () {
    let aaa = debounce(this.setLocationInfo, 200)
    return {
      state: [],
      markers: [],
      polylines: [],
      newMap: null,
      geocoder: null,
      curInfo: {
        level: 'county',
        adcode: ''
      },
      initLoad: true,
      drawWay: 'point',
      mouseTool: null,
      annotationForm: {
        SSSF: '500000',
        SSCS: '500100',
        SSQX: '',
        SSXZ: '',
        SSQY: '',
        XXDZ: '',
        TDMJ: '0',
        TDZC: '0',
        mapType: '2',
        fmapPoint: ''
      },
      initCity: '0591',
      initCityName: '福州市',
      initCityInfo: '福州市_0591_[119.238719,26.090374]',
      CENTERPOINT: [119.238719,26.090374],
      cityOptions: [
        {NAME: '福州市',VALUE: '0591',CENTERPOINT: '[119.238719,26.090374]'},
        {NAME: '广东市',VALUE: '020', CENTERPOINT: '[113.33841,23.142558]'},
        {NAME: '西安市',VALUE: '029', CENTERPOINT: '[108.945068,34.213686]'},
        {NAME: '长乐市',VALUE: '0591', CENTERPOINT: '[119.514672,25.959847]'}],
      resultPoint: null,
      lln: null,
      bbb: aaa
    }
  },
  mounted () {
    this.initAMap()
    this.$nextTick(()=>{
      setTimeout(function () {
        if(!document.getElementsByClassName('amap-toolbar')[0]){
          location.reload()
        }
      },3300)
    })
  },
  methods: {

    initAMap () {
      let that = this
      AMapLoader.load({
        key: '248d1da7430b9cf21c1872f48c771ac6',  //设置您的key
        version: "2.0",
        plugins: ['AMap.ToolBar', 'AMap.Driving'],
        AMapUI: {
          version: "1.1",
          plugins: [],
        },
        Loca: {
          version: "2.0"
        },
      }).then((AMap) => {
        //初始化地图容器
        this.newMap = new AMap.Map("container", {
          resizeEnable: true, //是否监控地图容器尺寸变化
          zoom: 11, //初始地图级别,越大越精细
          showIndoorMap: false,
          zooms: [8, 17],
          center: this.CENTERPOINT, //初始化地图中心点位置
        });
        let _newMap = this.newMap
        let _geocoder = null
        //输入提示
        var autoOptions = {
          input: "tipinput"
        };

        AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.ControlBar','AMap.Geocoder', 'AMap.PlaceSearch','AMap.AutoComplete','AMap.MouseTool'],function(){
          //创建放大缩小控件
          _newMap.addControl(new AMap.ToolBar({
            position:{
              left:'50px',
              top:'120px'
            }
          }));

          //比例尺控件
          _newMap.addControl(new AMap.Scale());

          _geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all",
            city: that.initCityName                //初始城市
          });
          var auto = new AMap.AutoComplete(autoOptions);
          var placeSearch = new AMap.PlaceSearch({
            map: _newMap,
            city: that.initCity, //   初始兴趣点城市
            citylimit: true,  //是否强制限制在设置的城市内搜索
          });  //构造地点查询类
          auto.on("select", select);//注册监听，当选中某条记录时会触发
          function select(e) {
            placeSearch.setCity(e.poi.adcode);
            placeSearch.search(e.poi.name);  //关键字查询查询
          }
        })
        this.geocoder = _geocoder
        // 事件
        //点击获取经纬度;
        // this.newMap.on("click", (e) => {
        //   // 获取经纬度
        //   console.log(e)
        // });
      }).catch(e => {
        console.log(e);
      })
    },
    changeCity(option){
      let that = this
      let arr = option.split('_')
      this.initCity = arr[1]
      this.initCityName = arr[0]
      let a = JSON.parse(arr[2])
      this.CENTERPOINT = JSON.parse(arr[2])
      setTimeout(function () {
        that.initAMap()
      },300)
    },
    test(e){
      console.log(e)
    },
    changeMap (viewMode) {
      let zoom = this.newMap.getZoom()
      let center = this.newMap.getCenter()
      if(viewMode === '3D'){
        this.newMap = new AMap.Map('container', {
          resizeEnable: true, //是否监控地图容器尺寸变化
          zoom: zoom, //初始地图级别
          showIndoorMap: false,
          zooms: [8, 17],
          pitch: 50,
          viewMode: viewMode, //开启3D视图,默认为关闭
          center: center,
          layers:[
            new AMap.TileLayer.RoadNet({
              //rejectMapMask:true
            }),
            new AMap.TileLayer.Satellite()
          ]
        })
      } else {
        this.newMap = new AMap.Map('container', {
          resizeEnable: true, //是否监控地图容器尺寸变化
          zoom: zoom, //初始地图级别
          showIndoorMap: false,
          zooms: [8, 17],
          viewMode: viewMode, //开启3D视图,默认为关闭
          center: center
        });
      }
    },
    drawModel(type){
      let that = this
      this.drawWay = type
      if(type==='point'){
        this.annotationForm.mapType = '2'
        this.newMap.on("click", (e) => {
          if(type==='point'){
            that.removeMarker();
            if(that.mouseTool){
              that.mouseTool.close()
            }
            // 清除点
            let lnglat = [e.lnglat.lng,e.lnglat.lat]
            this.resultPoint = JSON.stringify(lnglat)
            // 标记点
            this.setMarker(lnglat);
            let a = lnglat.join(',')
            that.annotationForm.fmapPoint = lnglat.join(',')
            that.lln = lnglat
            that.bbb()
            // debounce(that.setLocationInfo, 2000)
          }
        });
        that.$message.success("进入标记模式")
      }

    },
    removeMarker() {
      if (this.markers) {
        this.newMap.remove(this.markers);
      }
    },
    //  添加标记
    setMarker(lnglat) {
      let marker = new AMap.Marker({
        position: lnglat,
        content: `<i class="icon-loc01"></i>`
      });
      marker.setMap(this.newMap);
      this.markers.push(marker);
    },
    setLocationInfo(){
      let lnglat = this.lln
      let that = this
      var geocoder = new AMap.Geocoder({
        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        city: that.initCity     //初始城市
      })
      geocoder.getAddress(lnglat, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          let addressInfo = result.regeocode.addressComponent
          // result为对应的地理位置详细信息
          that.openNotificationWithIcon('success','标记所在位置',`${addressInfo.province}${addressInfo.city}${addressInfo.district}${addressInfo.township}${addressInfo.street}${addressInfo.streetNumber}`)
        }
      })
    },
    handleCancel(){
      this.$emit('closeMap',true)
    },
    locatePoint(){
      let _this = this
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认为false，即使用IP定位
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      //定位成功后自动调整地图视野到定位点区域，默认：false
      });
      geolocation.getCurrentPosition(function(status,result){
        if(status=='complete'){
          _this.$message.success(result.message);//处理成功信息
        }else{
          _this.$message.error(result.message)
        }
      });
    },
    openNotificationWithIcon(type, title, content) {
      this.$notification[type]({
        message: title,
        description: content,
        duration: 2.5
      });
    },
    markOk(){
      if(this.resultPoint){
        this.$router.push({ name: 'mapPlaces', params: { 'resultPoint': this.resultPoint,'initCity': this.initCity }, query: { 'resultPoint': this.resultPoint,'initCity': this.initCity } })
      }else{
        this.$message.error('请先标记地点!')
      }
    },
    cancelMarks(){
      if(this.resultPoint){
        this.newMap.clearMap()
      }else{
        this.$message.error('请先标记地点!')
      }
    }
  }
}
</script>

<style lang="less">
  #container {
    width: 100%;
    height: 85%;
    position: absolute;
  }
  .map-mark-modal .ant-modal-content{
    height: 635px;
  }
  .map-mark{
    z-index: 15;
  }
  .map-mark-modal .ant-modal-footer{
    position: absolute;
    bottom: 4%;
    left: 25%;
  }
  .icon-loc01{
    position: absolute;
    transform: translateX(-50%) translateY(-100%);
  }
  .ant-modal-body{
    padding: 0;
  }
  .ant-modal{
    top:1%;
  }
  .map-mark {
    z-index: 15;
    position: relative;
    .search {
      position: absolute;
      top: -32px;
      right: 10px;
      width: 210px;
    }
    .tol {
      position: absolute;
      right: 10px;
      top: 100px;
      ul li {
        background: #fff;
        text-align: center;
        margin-bottom: 10px;
        border-radius: 6px;
        -webkit-box-shadow: 0px 0px 3px #eee;
        box-shadow: 0px 0px 3px #eee;
      }
    }
  }
  .icon-dd2{
    display: inline-block;
    width: 40px;
    height: 40px;
    background-size: 40px 40px;
  }
  .icon-loc01{
    display: inline-block;
    vertical-align: middle;
  }
</style>
