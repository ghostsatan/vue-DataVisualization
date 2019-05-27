<template>
  <div class="content">
    <div class="liquidfillTeams">
      <waterpolo v-for="(waterpolo,index) in waterpolos" :key="index" :color="waterpolo.color" :value.sync="waterpolo.value" :text="waterpolo.text" :id="waterpolo.id"></waterpolo>
    </div>
    <div class="caseType">
      <div class="caseTypeLeft">
        <div class="caseTypeTitle"></div>
        <div class="caseTypeText">案件类型</div>
        <el-radio-group v-model="cardName">
          <el-radio-button label="事件"></el-radio-button>
          <el-radio-button label="部件"></el-radio-button>
        </el-radio-group>
        <ringForm class="eventCard" :data.sync="eventData" :id="'eventCard'" v-show="cardName=='事件'" :colors="eventColor"></ringForm>
        <ringForm class="partCard" :data.sync="partData" :id="'partCard'" :colors="partColor"></ringForm>
      </div>
      <div class="caseTypeRight">
        <div class="caseTypeLine">
          <div class="caseTypeTitle"></div>
          <div class="caseTypeText">案件类型</div>
          <div class="caseTypedetail" id="caseTypedetail"></div>
        </div>
        <div class="caseTypePillar">
          <div class="caseTypeTitle"></div>
          <div class="caseTypeText">案件类型</div>
          <div class="caseTypedetail" id="caseTypepillardetail"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/css/Meshing/caseAnalysis.css'
import waterpolo from '@/components/Common/waterPolo.vue'
import ringForm from '@/components/Common/ringForm.vue'
import {RadioGroup, RadioButton} from 'element-ui'
export default {
  name: 'CaseAnalysis',
  data () {
    var lineOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: 'transparent'
          }
        }
      },
      legend: {
        orient: 'horizontal',
        textStyle: {
          color: 'white',
          pageButtonItemGap: 20
        },
        data: ['活跃人数', '上报人数'],
        bottom: 0
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        nameTextStyle: {
          color: 'rgba(255,255,255,0)'
        },
        data: []
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          show: false
        },
        max: 100
      },
      series: [{
        data: [],
        type: 'line',
        name: '活跃人数',
        lineStyle: {
          color: '#B23A9E'
        },
        areaStyle: {
          color: '#4B1960'
        },
        itemStyle: {
          opacity: 0
        }
      }, {
        data: [],
        type: 'line',
        name: '上报人数',
        areaStyle: {
          color: '#0F1E55'
        },
        lineStyle: {
          color: '#266DBF'
        },
        itemStyle: {
          opacity: 0
        }
      }]
    }
    var pillarOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: 'transparent'
          }
        }
      },
      legend: {
        data: [],
        textStyle: {
          color: 'white',
          pageButtonItemGap: 20
        },
        bottom: 0
      },
      xAxis: [{
        type: 'category',
        data: [],
        axisPointer: {
          type: 'shadow'
        },
        nameTextStyle: {
          color: 'rgba(255,255,255,0)'
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      }],
      yAxis: [{
        type: 'value',
        name: '任务量(件)',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          show: false
        }
      },
      {
        type: 'value',
        name: '任务完成率(%)',
        min: 0,
        max: 100,
        interval: 20,
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        boundaryGap: false,
        splitLine: {
          show: false
        }
      }
      ],
      series: [{
        name: '任务发布量',
        type: 'bar',
        data: [],
        itemStyle: {
          color: '#4ADDEF'
        }
      },
      {
        name: '任务提取量',
        type: 'bar',
        data: [],
        itemStyle: {
          color: '#44D28A'
        }
      },
      {
        name: '任务完成率',
        type: 'line',
        yAxisIndex: 1,
        data: [],
        itemStyle: {
          opacity: 0,
          color: '#D09839'
        }
      }
      ]
    }
    return {
      'cardName': '事件',
      'interval': '',
      'eventData': [],
      'partData': [],
      'lineOption': lineOption,
      'pillarOptions': pillarOptions,
      'waterpolos': '',
      'eventColor': [],
      'partColor': [],
      'waterpolosInterval': ''
    }
  },
  prop: ['newmessage'],
  components: {
    waterpolo,
    ringForm,
    'el-radio-group': RadioGroup,
    'el-radio-button': RadioButton
  },
  methods: {
    lineShow () {
      var Chart = this.$echarts.init(document.getElementById('caseTypedetail'))
      this.lineOption.xAxis.data = ['第41周', '第42周', '第43周', '第44周', '第45周', '第46周', '第47周', '第48周']
      // 活跃人数
      this.lineOption.series[0].data = [30, 40, 20, 60, 70, 42, 59, 35]
      // 上报人数
      this.lineOption.series[1].data = [45, 38, 56, 38, 58, 48, 36, 54]
      Chart.setOption(this.lineOption)
      var self = this
      window.setInterval(function () {
        // 活跃人数
        self.lineOption.series[0].data = [30, 40, 20, 60, 70, 42, 59, 35]
        // 上报人数
        self.lineOption.series[1].data = [45, 38, 56, 38, 58, 48, 36, 54]
        Chart.setOption(self.lineOption)
      }, this.timeInterval)
    },
    pillarShow () {
      var Chart = this.$echarts.init(document.getElementById('caseTypepillardetail'))
      this.pillarOptions.legend.data = ['任务发布量', '任务提取量', '任务完成率']
      this.pillarOptions.xAxis[0].data = ['第41周', '第42周', '第43周', '第44周', '第45周', '第46周', '第47周']
      this.pillarOptions.series[0].data = [500, 600, 542, 354, 458, 756, 548]
      this.pillarOptions.series[1].data = [300, 500, 870, 245, 654, 458, 358]
      this.pillarOptions.series[2].data = [20, 50, 15, 95, 54, 65, 45]
      var self = this
      window.setInterval(function () {
        self.pillarOptions.xAxis[0].data = ['第41周', '第42周', '第43周', '第44周', '第45周', '第46周', '第47周']
        self.pillarOptions.series[0].data = [500, 600, 542, 354, 458, 756, 548]
        self.pillarOptions.series[1].data = [300, 500, 870, 245, 654, 458, 358]
        self.pillarOptions.series[2].data = [20, 50, 15, 95, 54, 65, 45]
        Chart.setOption(self.pillarOptions)
      }, this.timeInterval)
      Chart.setOption(this.pillarOptions)
    },
    eventCard () {
      this.eventData = [{
        value: 10,
        name: '市政公共服务'
      },
      {
        value: 28,
        name: '园林绿化设施'
      },
      {
        value: 12,
        name: '其他设施'
      },
      {
        value: 23,
        name: '市容环境设施'
      },
      {
        value: 28,
        name: '道路交通设施'
      },
      {
        value: 10,
        name: '扩展部件类'
      }
      ]
      this.eventColor = ['#C183EE', '#004276', '#6C82D8', '#4AF5FF', '#DBB03D', '#05FDB3']
      var self = this
      window.setInterval(function () {
        for (let i = 0; i < 6; i++) {
          self.eventData[i].value = 10 + parseInt(Math.random() * 10)
        }
      }, this.timeInterval)
    },
    partCard () {
      this.partData = [{
        value: 28,
        name: '市政公共服务'
      },
      {
        value: 12,
        name: '园林绿化设施'
      },
      {
        value: 23,
        name: '其他设施'
      },
      {
        value: 12,
        name: '市容环境设施'
      },
      {
        value: 28,
        name: '道路交通设施'
      },
      {
        value: 10,
        name: '扩展部件类'
      }
      ]
      this.partColor = ['#C183EE', '#004276', '#6C82D8', '#4AF5FF', '#DBB03D', '#05FDB3']
      let self = this
      window.setInterval(function () {
        for (let i = 0; i < 6; i++) {
          self.partData[i].value = 10 + parseInt(Math.random() * 10)
        }
      }, this.timeInterval)
    },
    waterPolos () {
      let self = this
      this.waterpolos = [{
        'color': '#35CC63',
        'text': '待受理',
        'value': 264,
        'id': 'liquidfill-chart'
      },
      {
        'color': '#0A81D3',
        'text': '待核实',
        'value': 192,
        'id': 'check-chart'
      },
      {
        'color': '#6A0ADE',
        'text': '核实待处理',
        'value': 305,
        'id': 'verifyTreated-chart'
      },
      {
        'color': '#D61C4E',
        'text': '带立案',
        'value': 215,
        'id': 'pending-chart'
      },
      {
        'color': '#CC7323',
        'text': '带派遣',
        'value': 275,
        'id': 'dispatched-chart'
      }
      ]
      this.waterpolosInterval = window.setInterval(function () {
        if (self.waterpolos.length > 0) {
          for (let i = 0; i < self.waterpolos.length; i++) {
            self.waterpolos[i].value = parseInt(Math.random() * 300)
          }
        }
      }, self.timeInterval)
    }
  },
  mounted () {
    // 线性案件类型
    this.lineShow()
    // 柱形案件类型
    this.pillarShow()
    // 事件类型
    this.eventCard()
    // 部件类型
    this.partCard()
    // 水球图
    this.waterPolos()
  }
}

</script>
