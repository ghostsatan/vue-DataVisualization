<template>
  <div :id="id" :name="name"></div>
</template>
<script>
export default {
  data () {
    var Options = {
      tooltip: {
        trigger: 'axis'
      },
      height: '100%',
      width: '100%',
      xAxis3D: {
        type: 'category',
        name: '',
        data: [],
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        nameGap: 30
      },
      yAxis3D: {
        type: 'category',
        name: ''
      },
      zAxis3D: {
        type: 'value',
        name: '',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        nameGap: 30
      },
      grid3D: {
        boxWidth: 250,
        boxDepth: 40,
        light: {
          main: {
            intensity: 1.2,
            shadow: true
          },
          ambient: {
            intensity: 0.3
          }
        },
        viewControl: {
          alpha: 0,
          beta: 0
        },
        label: {
          distance: 8
        }
      },
      series: [{
        type: 'bar3D',
        name: '',
        data: [],
        itemStyle: {
          color: '#45CE8A'
        },
        shading: 'lambert',
        label: {
          textStyle: {
            fontSize: 14,
            borderWidth: 1
          }
        },
        emphasis: {
          label: {
            textStyle: {
              fontSize: 20,
              color: '#fff',
              backgroundColor: 'transparent'
            }
          },
          itemStyle: {
            color: '#49DEF2'
          }
        }
      }, {
        type: 'line3D',
        lineStyle: {
          color: '#8A6F41'
        },
        data: []
      }]
    }
    return {
      'Options': Options
    }
  },
  props: ['id', 'name', 'times', 'dates'],
  watch: {
    times: function (newValue, oldValue) {
      // 每当str的值改变则发送事件update:word , 并且把值传过去
      this.$emit('update:word', newValue)
      this.ChartStructure()
    },
    dates: function (newValue, oldValue) {
      // 每当str的值改变则发送事件update:word , 并且把值传过去
      this.$emit('update:word', newValue)
      this.ChartStructure()
    }
  },
  methods: {
    ChartStructure () {
      var self = this
      this.Options.zAxis3D.name = self.name
      let Chart = this.$echarts.init(document.getElementById(self.id))
      // 加载完成后柱形图
      var peopleTimes = this.times
      var peopleDates = this.dates
      var Dates = []
      for (var i = 0; i < peopleDates.length; i++) {
        Dates.push([i, 0, peopleDates[i]])
      }
      this.Options.xAxis3D.data = peopleTimes
      this.Options.series[0].data = Dates
      this.Options.series[1].data = Dates
      Chart.setOption(this.Options)
    }
  },
  mounted () {
    this.ChartStructure()
  }
}

</script>
