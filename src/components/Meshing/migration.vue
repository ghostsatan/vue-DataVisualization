<template>
  <div class='content'>
    <div class='contentLeft'>
      <div class='contentLeftCircle'>
      </div>
      <div id='earthMap'></div>
    </div>
    <div class='contentRight'>
      <div class='contentrTop'>人口来源省份排行TOP10</div>
      <div class='contentProvince' v-cloak>
          <div class='provinceModel' v-for='(province,index) in provinceTen' :key='index'>
              <label class='provinceName' v-html='province.name'></label>
              <el-progress :text-inside='true' :stroke-width='15' :percentage='province.number/provinceTen[0].number*100' status='success' color='#F7C808'></el-progress>
              <label class='provinceNumber' v-html='province.number'></label>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/css/Meshing/migration.css'
import '@static/js/china.js'
import Progress from 'element-ui'
import Vue from 'vue'
Vue.use(Progress)
export default {
  name: 'Migration',
  data () {
    var geoCoordMap = {
      '山东': [117.4651, 36.3373],
      '北京': [115.0000, 39.5539],
      '天津': [115.7219, 38.8524],
      '重庆': [110.2539, 30.6904],
      '宁夏': [105.5586, 36.6775],
      '西藏': [91.1865, 30.1465],
      '广西': [108.479, 24.1152],
      '新疆': [87.9236, 43.5883],
      '内蒙古': [111.4124, 40.4901],
      '黑龙江': [123.9688, 47.368],
      '云南': [100.9199, 24.4663],
      '吉林': [120.8154, 44.2584],
      '安徽': [117.29, 32.0581],
      '山西': [111.3352, 36.9413],
      '广东': [113.5107, 24.2196],
      '江苏': [119.0519, 33.3989],
      '江西': [116.0046, 28.6633],
      '河北': [114.4995, 38.1006],
      '河南': [113.4668, 33.6234],
      '浙江': [119.5313, 29.8773],
      '海南': [110.3893, 20.2516],
      '湖北': [111.3896, 31.0628],
      '湖南': [112.0823, 28.2568],
      '甘肃': [103.5901, 36.3043],
      '福建': [118.4543, 27.9222],
      '四川': [103.9526, 30.7617],
      '贵州': [106.6992, 26.7682],
      '辽宁': [121.1238, 41.1216],
      '陕西': [109.1162, 34.2004],
      '青海': [97.4038, 34.8207],
      '台湾': [122.5107, 25.8196],
      '上海': [121.2648, 32.2891]
    }
    return {
      'option': {
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            // 普通样式
            normal: {
              areaColor: 'rgba(0,0,0,0)',
              borderWidth: 0
            },
            // hover样式
            emphasis: {
              areaColor: 'rgba(0,0,0,0)'
            }
          },
          left: 'center'
        },
        series: []
      },
      'geoCoordMap': geoCoordMap,
      'BJData': [],
      'series': [],
      'provinceTen': []
    }
  },
  methods: {
    createMap () {
      var Chart = this.$echarts.init(document.getElementById('earthMap'))
      this.BJData = [
        [{ name: '北京' }, { name: '山东', value: 100 }],
        [{ name: '天津' }, { name: '山东', value: 100 }],
        [{ name: '上海' }, { name: '山东', value: 100 }],
        [{ name: '重庆' }, { name: '山东', value: 100 }],
        [{ name: '宁夏' }, { name: '山东', value: 100 }],
        [{ name: '西藏' }, { name: '山东', value: 100 }],
        [{ name: '新疆' }, { name: '山东', value: 100 }],
        [{ name: '内蒙古' }, { name: '山东', value: 100 }],
        [{ name: '黑龙江' }, { name: '山东', value: 100 }],
        [{ name: '云南' }, { name: '山东', value: 100 }],
        [{ name: '吉林' }, { name: '山东', value: 100 }],
        [{ name: '安徽' }, { name: '山东', value: 100 }],
        [{ name: '山西' }, { name: '山东', value: 100 }],
        [{ name: '广东' }, { name: '山东', value: 100 }],
        [{ name: '广西' }, { name: '山东', value: 100 }],
        [{ name: '江苏' }, { name: '山东', value: 100 }],
        [{ name: '江西' }, { name: '山东', value: 100 }],
        [{ name: '河北' }, { name: '山东', value: 100 }],
        [{ name: '河南' }, { name: '山东', value: 100 }],
        [{ name: '浙江' }, { name: '山东', value: 100 }],
        [{ name: '海南' }, { name: '山东', value: 100 }],
        [{ name: '湖北' }, { name: '山东', value: 100 }],
        [{ name: '湖南' }, { name: '山东', value: 100 }],
        [{ name: '甘肃' }, { name: '山东', value: 100 }],
        [{ name: '福建' }, { name: '山东', value: 100 }],
        [{ name: '四川' }, { name: '山东', value: 100 }],
        [{ name: '贵州' }, { name: '山东', value: 100 }],
        [{ name: '辽宁' }, { name: '山东', value: 100 }],
        [{ name: '陕西' }, { name: '山东', value: 100 }],
        [{ name: '青海' }, { name: '山东', value: 100 }],
        [{ name: '台湾' }, { name: '山东', value: 100 }]
      ]
      var self = this;
      [
        ['山东', self.BJData]
      ].forEach(function (item, i) {
        self.series.push({
          name: item[0],
          type: 'lines',
          zlevel: 1,
          large: true,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.8,
            color: '#FFFF00',
            symbol: 'circle',
            shadowColor: '#FFFF00',
            shadowBlur: 0.5,
            symbolSize: [3, 5]
          },
          lineStyle: {
            normal: {
              color: '#6B945A',
              opacity: 0.1,
              width: 1,
              curveness: 0.2
            }
          },
          data: self.$options.methods.convertData(item[1], self.geoCoordMap)
        }, {
          name: item[0],
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: function (val) {
            return val[2] / 16
          },
          itemStyle: {
            normal: {
              color: '#FFFF00'
            }
          },
          data: item[1].map(function (dataItem) {
            return {
              name: dataItem[0].name,
              value: self.geoCoordMap[dataItem[0].name].concat([dataItem[1].value])
            }
          })
        })
      })
      this.option.series = this.series
      Chart.setOption(this.option)
    },
    convertData (data, allData) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i]
        var fromCoord = allData[dataItem[0].name]
        var toCoord = allData[dataItem[1].name]
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord]
          })
        }
      }
      return res
    },
    provinceTenShow () {
      this.provinceTen = [{
        'name': '北京',
        'number': '100000'
      },
      {
        'name': '河北',
        'number': '87542'
      },
      {
        'name': '浙江',
        'number': '78542'
      },
      {
        'name': '河南',
        'number': '68457'
      },
      {
        'name': '四川',
        'number': '62457'
      },
      {
        'name': '江苏',
        'number': '57215'
      },
      {
        'name': '辽宁',
        'number': '48515'
      },
      {
        'name': '广东',
        'number': '34587'
      },
      {
        'name': '湖北',
        'number': '27515'
      },
      {
        'name': '福建',
        'number': '19587'
      }]
      var self = this
      window.setInterval(function () {
        for (var i = 1; i < 10; i++) {
          self.provinceTen[i].number = parseInt(10000 * Math.random() + (10 - i) * 10000)
        }
      }, this.timeInterval)
    }
  },
  mounted () {
    this.createMap()
    this.provinceTenShow()
  }
}

</script>
