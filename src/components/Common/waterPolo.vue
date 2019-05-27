<template>
  <div class='liquidfillBox'>
    {{text}}
    <div :id='id'>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import echartsliquidfill from 'echarts-liquidfill'
Vue.prototype.echartsliquidfill = echartsliquidfill
export default {
  data () {
    var Options = {
      series: [{
        type: 'liquidFill',
        data: [{
          name: '件',
          value: '0.5',
          valueZhen: '0',
          direction: 'left',
          itemStyle: {
            normal: {
              color: ''
            }
          }
        }],
        outline: {
          borderDistance: 0,
          itemStyle: {
            borderWidth: 0,
            shadowBlur: 0,
            shadowColor: '#054A7D'
          }
        },
        backgroundStyle: {
          color: 'rgba(0,0,0,0)'
        },
        label: {
          normal: {
            formatter: function (val) {
              var number = val.data.valueZhen
              var name = val.data.name
              return (number + '\n' + name)
            },
            textStyle: {
              fontSize: 28,
              color: 'yellow'
            }
          }
        }
      }]
    }
    return {
      'options': Options
    }
  },
  name: 'water-polo',
  props: ['color', 'value', 'text', 'id'],
  watch: {
    value: function (newValue, oldValue) {
    // 每当str的值改变则发送事件update:word , 并且把值传过去
      this.$emit('update:word', newValue)
      this.admissibleOptionsStructure(this.color, this.value, this.id)
    }
  },
  methods: {
    // id名,对应data的值,颜色
    admissibleOptionsStructure (color, value, id) {
      var Chart = this.$echarts.init(document.getElementById(id))
      this.options.series[0].data[0].itemStyle.normal.color = this.color
      this.options.series[0].data[0].valueZhen = this.value
      Chart.setOption(this.options)
    }
  },
  mounted () {
    this.admissibleOptionsStructure(this.color, this.value, this.id)
  }
}
</script>
<style scoped>
  @import '../../assets/css/Meshing/waterPolo.css'
</style>
