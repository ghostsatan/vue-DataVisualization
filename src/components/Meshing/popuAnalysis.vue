<template>
  <div>
    <el-carousel type="card" height="823px" :autoplay="false" arrow="always" indicator-position="none">
      <el-carousel-item>
        <div class="analysisTitle"></div>
        <div class="analysisText">关注人群</div>
        <sector :id="'peopleFollow'" :datas.sync="focusDates" class="peoples" :colors="focusColor"></sector>
      </el-carousel-item>
      <el-carousel-item>
        <div class="analysisTitle"></div>
        <div class="analysisText">帮扶人群</div>
        <sector :id="'peopleHelp'" :datas.sync="assetsDates" class="peoples" :colors="assetsColor"></sector>
      </el-carousel-item>
      <el-carousel-item>
        <div class="analysisTitle"></div>
        <div class="analysisText">典型人群</div>
        <sector :id="'peopleTypical'" :datas.sync="typicalDates" class="peoples" :colors="typicalColor"></sector>
      </el-carousel-item>
    </el-carousel>
    <div class="plateFooter"></div>
  </div>
</template>
<script>
import '@/assets/css/Meshing/popuAnalysis.css'
import {Carousel, CarouselItem} from 'element-ui'
import sector from '@/components/Common/sector.vue'
export default {
  name: 'PopuAnalysis',
  data () {
    return {
      'focusDates': [],
      'assetsDates': [],
      'typicalDates': [],
      'focusColor': [],
      'assetsColor': [],
      'typicalColor': []
    }
  },
  components: {
    sector,
    'el-carousel': Carousel,
    'el-carousel-item': CarouselItem
  },
  methods: {
    peopleFollow () {
      this.focusDates = [
        {'name': '劳动保障', 'value': 335, 'commonName': '关注人群'},
        {'name': '老年人', 'value': 310, 'commonName': '关注人群'},
        {'name': '未成年人', 'value': 274, 'commonName': '关注人群'},
        {'name': '14岁以上女性', 'value': 235, 'commonName': '关注人群'}
      ]
      this.focusColor = ['#FFB408', '#9902FD', '#02B4D2', '#01BD8D']
      window.setInterval(function () {
        for (let i = 0; i < 4; i++) {
          this.focusDates[i].value = 200 + parseInt(Math.random() * 100)
        }
      }, this.timeInterval)
    },
    peopleHelp () {
      this.assetsDates = [
        {'name': '劳动保障', 'color': '#FFB408', 'value': 250, 'commonName': '帮扶人群'},
        {'name': '老年人', 'color': '#9902FD', 'value': 284, 'commonName': '帮扶人群'},
        {'name': '未成年人', 'color': '#02B4D2', 'value': 243, 'commonName': '帮扶人群'},
        {'name': '14岁以上女性', 'color': '#01BD8D', 'value': 305, 'commonName': '帮扶人群'}
      ]
      this.assetsColor = ['#FFB408', '#9902FD', '#02B4D2', '#01BD8D']
      window.setInterval(function () {
        for (let i = 0; i < 4; i++) {
          this.assetsDates[i].value = 200 + parseInt(Math.random() * 100)
        }
      }, this.timeInterval)
    },
    peopleTypical () {
      this.typicalDates = [
        {'name': '劳动保障', 'color': '#FFB408', 'value': 280, 'commonName': '典型人群'},
        {'name': '老年人', 'color': '#9902FD', 'value': 205, 'commonName': '典型人群'},
        {'name': '未成年人', 'color': '#02B4D2', 'value': 305, 'commonName': '典型人群'},
        {'name': '14岁以上女性', 'color': '#01BD8D', 'value': 264, 'commonName': '典型人群'}
      ]
      this.typicalColor = ['#FFB408', '#9902FD', '#02B4D2', '#01BD8D']
      window.setInterval(function () {
        for (let i = 0; i < 4; i++) {
          this.typicalDates[i].value = 200 + parseInt(Math.random() * 100)
        }
      }, this.timeInterval)
    }
  },
  mounted () {
    this.peopleFollow()
    this.peopleHelp()
    this.peopleTypical()
  }
}

</script>
