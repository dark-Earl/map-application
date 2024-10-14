<template>
  <div class="index-map-box">
    <div class="index-map-left">
      <div class="title">
        陕西省挂牌企业统计数据
      </div>
      <div class="index-map">
        <div id="main" class="map-sx" style="width: 776px;height: 560px;"></div>
      </div>
    </div>
    <div class="index-map-right">
      <ul>
        <li>
          <i class="index-map-gp"></i>
          <div class="cont">
            <div class="num">
              {{statisticsData.LISTEDCOMPANIESNUM}}
            </div>
            <div class="title">
              挂牌及展示企业总数（家）
            </div>
          </div>
        </li>
        <li>
          <i class="index-map-dj"></i>
          <div class="cont">
            <div class="num">
              {{statisticsData.TRUSTEESHIPENTERPRISENUM}}
            </div>
            <div class="title">
              登记托管企业总数（家）
            </div>
          </div>
        </li>
        <li>
          <i class="index-map-rz"></i>
          <div class="cont">
            <div class="num">
              {{statisticsData.TOTALFINANCING}}
            </div>
            <div class="title">
              融资转让总额（亿元）
            </div>
          </div>
        </li>
        <li>
          <i class="index-map-tzz"></i>
          <div class="cont">
            <div class="num">
              {{statisticsData.INVESTOR}}
            </div>
            <div class="title">
              投资者总数（户）
            </div>
          </div>
        </li>
        <li>
          <i class="index-map-hy"></i>
          <div class="cont">
            <div class="num">
              {{statisticsData.MEMBER}}
            </div>
            <div class="title">
              展业会员（家）
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import shanxi from '@/assets/json/Shanxi'
import {cxStatisticalData,cxStatisticsOfRegional} from '@/api/home/home.js'

export default {
  name: 'mapBox', // 首页地图数据

  data () {
    const basepath = window.BASE_API_URL
    return {
      mapData: [],
      extraData: {},
      basepath: basepath,
      statisticsData: {},
    }
  },
  mounted () {
  },
  created(){
    this.cxStatisticalData()
    this.cxStatisticsOfRegional()
  },
  computed: {
    formatWanNumber: {
      get: function () {
        console.log(this.extraData.ljjjxq)
        return NumberUtil.formatNumber(NumberUtil.FloatDiv(parseFloat(this.extraData.ljjjxq), 10000), '#,###.00')
      }
    },
  },
  methods: {
    formatNumber: function (numData) {
      return NumberUtil.formatNumber(numData, '#,###.00')
    },
    async cxStatisticsOfRegional () {
      let response = await cxStatisticsOfRegional({});
      this.mapData = response.data;
      // this.extraData = response.extra
      this.initchartForjs()
      // console.log(JSON.stringify(this.mapData))
    },
    cxStatisticalData(){
      let param = {}
      cxStatisticalData(param).then(result => {
        if (result.code === 200) {
          this.statisticsData = result.data[0]
        }
      }).catch(e => {
        console.log(e)
      })
    },
    initchartForjs: function () {
      // 基于准备好的dom，初始化echarts实例
      let echarts = require('echarts')
      var myChart = echarts.init(document.getElementById('main'))
      echarts.registerMap('陕西', shanxi)

      var option = {
        grid: {
          top: "0",
          bottom: "10%",
          right: "10%",
          left: "10%"
        },
        tooltip: {
          trigger: 'item',
          // formatter: '{b}<br/>{a}：{c}'
          formatter: function (params) {
            let a = option.series[0].data
            // console.log(params);
            return [
              params.name,
              '展示企业数量:' + params['data'].ZSQY + '家',
              '成长板数量:' + params['data'].BK2SL+ '家',
              '交易板数量:' + params['data'].BK3SL + '家',
              '科技创新专板数量:' + params['data'].BK4SL+ '家',
              '纯登记托管数量:' + params['data'].CTGQY + '家',
            ].join('<br>');
          }
          // position: 'inside'

        },
        color: ['#24e2ff'],
        series: [
          {
            name: '展示企业数量',
            type: 'map',
            mapType: '陕西',
            aspectScale: 0.9,
            zoom: 1,
            selectedMode: 'single',
            // showLegendSymbol: false,
            label: {
              normal: {
                show: true, // 显示省份标签
                textStyle: {color: '#fff'},// 省份标签字体颜色
                formatter: '{b}\n{c}',
              },
              emphasis: {// 对应的鼠标悬浮效果
                show: true,
                textStyle: {color: '#fff'},

              }
            },
            itemStyle: {
              normal: {
                borderWidth: 1, // 区域边框宽度
                borderColor: 'rgba(255, 255, 255, .75)', // 区域边框颜色
                areaColor: 'rgba(83, 163, 220,0.7)'// 区域颜色
              },

              emphasis: {
                borderWidth: 0.5,
                borderColor: '#28abf7',
                areaColor: '#28abf7'
              }
            },
            data: this.mapData
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }

  }
}
</script>
