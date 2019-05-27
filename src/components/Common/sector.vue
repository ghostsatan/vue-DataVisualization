<template>
  <div :id="id"></div>
</template>
<script>
export default {
  data () {
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: [],
        itemWidth: 20,
        itemHeight: 20,
        padding: [5, 90, 5, 200],
        itemGap: 20,
        textStyle: {
          color: 'white',
          pageButtonItemGap: 20
        },
        borderRadius: 360,
        formatter: '{name}\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r'
      },
      series: [{
        name: '',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [].sort(function (a, b) { return a.value - b.value }),
        roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'white'
            },
            fontSize: 16,
            position: 'inner',
            formatter: '{d}%'
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: 'white',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200
        }
      }]
    }
    return {
      'option': option
    }
  },
  props: ['id', 'datas', 'colors'],
  watch: {
    datas: function (newValue, oldValue) {
      // 每当str的值改变则发送事件update:word , 并且把值传过去
      this.$emit('update:word', newValue)
      this.sectorShow()
    }
  },
  methods: {
    sectorShow () {
      var Chart = this.$echarts.init(document.getElementById(this.id))
      var self = this
      if (this.datas !== undefined) {
      // this.option.series[0].name=self.datas[0].commonName;
        for (var i = 0; i < this.datas.length; i++) {
          this.option.legend.data.push({ icon: 'circle', name: this.datas[i].name })
          this.option.series[0].data.push({
            value: self.datas[i].value,
            name: self.datas[i].name,
            itemStyle: {
              color: self.colors[i]
            }
          })
        }
      }
      Chart.setOption(this.option)
    }
  },
  mounted () {
    this.sectorShow()
  }
}

</script>
