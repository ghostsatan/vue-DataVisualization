<template>
  <div :id="id"></div>
</template>
<script>
export default {
  data () {
    var Option = {
      legend: {
        orient: 'horizontal',
        x: 'left',
        padding: [5, 50, 5, 115],
        itemGap: 20,
        itemWidth: 25,
        itemHeight: 10,
        bottom: 50,
        textStyle: {
          color: 'white',
          pageButtonItemGap: 20
        },
        data: [],
        formatter: function (name) {
          return name + '\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r'
        }
      },
      calculable: false,
      series: [{
        name: '案件类型',
        type: 'pie',

        radius: [100, 120],
        // for funnel
        x: '60%',
        width: '35%',
        funnelAlign: 'left',
        max: 1048,
        center: ['50%', '45%'],
        label: {
          formatter: '{top|{d}%}\n\n{bottom|{b}}',
          padding: [0, -100],
          rich: {
            top: {
              color: '#41D5DF',
              fontSize: 20,
              align: 'center'
            },
            bottom: {
              color: '#FFD526',
              fontSize: 18,
              align: 'center'
            }
          }
        },
        labelLine: {
          length: 25,
          length2: 120
        },
        data: []
      }]
    }
    return {
      'Option': Option,
      'Name': []
    }
  },
  props: ['id', 'data', 'colors'],
  watch: {
    data: function (newValue, oldValue) {
      // 每当str的值改变则发送事件update:word , 并且把值传过去
      this.$emit('update:word', newValue)
      this.DataShow()
    }
  },
  methods: {
    DataShow () {
      var Chart = this.$echarts.init(document.getElementById(this.id))
      if (this.data.length > 0) {
        for (var i = 0; i < this.data.length; i++) {
          this.Name.push(this.data[i].name)
          this.data[i]['labelLine'] = {
            color: 'rgba(255,255,255,0.5)'
          }
          this.data[i]['itemStyle'] = {
            color: this.colors[i]
          }
        }
      }
      this.Option.series[0].data = this.data
      this.Option.legend.data = this.Name
      Chart.setOption(this.Option)
    }
  },
  mounted () {
    this.DataShow()
  }
}

</script>
