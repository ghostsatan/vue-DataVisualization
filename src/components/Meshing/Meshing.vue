<template>
  <div id='content'>
    <!-- <largeHeader></largeHeader> -->
    <div class='changeModule' @click='changeModule()'></div>
    <!-- <el-dialog title='切换专题组' :visible.sync='dialogModuleVisible' width='1125px' class='moduleBox'>
      <div class='checkBoxModule' v-cloak>
        <el-checkbox :disabled='headList.disabled' v-model='headList.checked' :key='headList.name' v-for='headList in headLists' @change='handleCheckedCitiesChange(headList)'>{{headList.name}}</el-checkbox>
      </div>
    </el-dialog> -->
    <header>城市运行监控</header>
    <!-- <div class='container' v-cloak>
      <div class='module' :data-type='newList.key' v-for='(newList, index) 
      
      in newLists' draggable='true' @dragstart='handleDragStart($event, newList)' @dragover.prevent='handleDragOver($event, newList)' :key='"module"+index' @dragenter='handleDragEnter($event, newList)' @dragend='handleDragEnd($event, newList)'>
        <div class='titleModule' v-html='newList.name'></div>
        <div class='moduleContent'>
        <keep-alive>
          <component  v-bind:newmessage='newList.name'   v-if='newList.src' v-bind:is='newList.src'></component>
          </keep-alive>
        </div>
      </div>
    </div> -->
    <div>
      <div class="container">
        <div class="module item" @click="clickChart('1')" style="transform: translate(-22.4%,-33.5%) scale(0.33)">
          <Migration></Migration>
        </div>
        <div class="module item" @click="clickChart('2')" style="transform: translate(-22.4%,0.5%) scale(0.33)">
          <WholeProvince></WholeProvince>
        </div>
        <div class="module item" @click="clickChart('3')" style="transform: translate(-22.4%,34.5%) scale(0.33)">
          <PopuAnalysis></PopuAnalysis>
        </div>
        <div class="module item active" @click="clickChart('4')" style="transform: translate(43.7%, 0) scale(1)">
         <CaseAnalysis></CaseAnalysis>
        </div>
        <div class="module item" @click="clickChart('5')" style="transform: translate(113.7%, -20%) scale(0.33)">
         <IndustrialPark></IndustrialPark>
        </div>
    </div>
    </div>
  </div>
</template>
<script>
import '@/assets/css/Meshing/Meshing.scss'
import { Dialog, Checkbox } from 'element-ui'
const Migration = resolve => require(['@/components/Meshing/migration'], resolve)
const LargeHeader = resolve => require(['@/components/Meshing/LargeHeader'], resolve)
const WholeProvince = resolve => require(['@/components/Meshing/wholeProvince'], resolve)
const PopuAnalysis = resolve => require(['@/components/Meshing/popuAnalysis'], resolve)
const CaseAnalysis = resolve => require(['@/components/Meshing/caseAnalysis'], resolve)
const IndustrialPark = resolve => require(['@/components/Meshing/industrialPark'], resolve)
export default {
  data () {
    let headLists = [{
      'name': '产业园区',
      'checked': true,
      'src': IndustrialPark,
      'disabled': false
    },
    {
      'name': '全省总览',
      'checked': true,
      'src': WholeProvince,
      'disabled': false
    },
    {
      'name': '人口分析',
      'checked': true,
      'src': PopuAnalysis,
      'disabled': false
    },
    {
      'name': '案件分析',
      'checked': true,
      'src': CaseAnalysis,
      'disabled': false
    },
    {
      'name': '人口迁徙',
      'checked': true,
      'src': Migration,
      'disabled': false
    }
    ]
    let newLists = [{
      'name': '产业园区',
      'src': IndustrialPark,
      'key': 'a'
    },
    {
      'name': '全省总览',
      'src': WholeProvince,
      'key': 'b'
    },
    {
      'name': '人口分析',
      'src': PopuAnalysis,
      'key': 'c'
    },
    {
      'name': '案件分析',
      'src': CaseAnalysis,
      'key': 'd'
    },
    {
      'name': '人口迁徙',
      'src': Migration,
      'key': 's'
    }
    ]
    return {
      // 所有的模块信息
      'headLists': headLists,
      // 此时显示的几个模块信息
      'newLists': newLists,
      // 此时有几个显示的数量
      'newListsShow': 5,
      'dragging': null,
      // 拖拽之前的信息数据
      'moveBefore': '',
      // 拖拽之后的信息数据
      'moveAfter': '',
      // 切换专题组弹出框是否显示
      'dialogModuleVisible': false
    }
  },
  components: {
    Migration,
    WholeProvince,
    PopuAnalysis,
    CaseAnalysis,
    IndustrialPark,
    LargeHeader,
    'el-dialog': Dialog,
    'el-checkbox': Checkbox
  },
  mounted() {
    this._init()
  },
  methods: {
    _init() {
      this.items = document.querySelectorAll('.item')
      for (let i = 0; i < this.items.length; i++) {
        console.log(this.items);
        this.items[i].dataset.order = i + 1;
      }
    },
    handleCheckedCitiesChange: function (module) {
      if (module.checked) {
        for (let i = 0; i < this.headLists.length; i++) {
          this.headLists[i].disabled = false
        }
        if (this.newListsShow >= 5) {
          for (let i = 0; i < this.newLists.length; i++) {
            if (this.newLists[i].key === 's') {
              var BeforeName = this.newLists[i].name
              this.newLists[i].name = module.name
              this.newLists[i].src = module.src
            }
          }
          for (let i = 0; i < this.headLists.length; i++) {
            if (this.headLists[i].name === BeforeName) {
              this.headLists[i].checked = false
            }
          }
        } else {
          for (let i = 0; i < this.newLists.length; i++) {
            if (this.newLists[i].src === '') {
              var newKey = this.newLists[i].key
              break
            }
          }
          let beforename
          let beforesrc
          for (let i = 0; i < this.newLists.length; i++) {
            if (this.newLists[i].key === 's') {
              beforename = this.newLists[i].name
              beforesrc = this.newLists[i].src
              this.newLists[i].name = module.name
              this.newLists[i].src = module.src
              break
            }
          }
          for (let i = 0; i < this.newLists.length; i++) {
            if (this.newLists[i].key === newKey) {
              this.newLists[i].name = beforename
              this.newLists[i].src = beforesrc
            }
          }
          this.newListsShow++
        }
      } else {
        if (this.newListsShow === 2) {
          for (let i = 0; i < this.headLists.length; i++) {
            if (this.headLists[i].checked) {
              this.headLists[i].disabled = true
              break
            }
          }
        }
        for (let i = 0; i < this.newLists.length; i++) {
          if (module.name === this.newLists[i].name) {
            if (this.newLists[i].key === 's') {
              if (this.newListsShow >= 1) {
                this.newLists[i].name = ''
                this.newLists[i].src = ''
                for (var j = 0; j < this.newLists.length; j++) {
                  if (this.newLists[j].src !== '') {
                    this.newLists[i].name = this.newLists[j].name
                    this.newLists[i].src = this.newLists[j].src
                    this.newLists[j].name = ''
                    this.newLists[j].src = ''
                    break
                  }
                }
              } else {
                this.newLists[i].name = ''
                this.newLists[i].src = ''
              }
              this.newListsShow--
              break
            } else {
              this.newLists[i].name = ''
              this.newLists[i].src = ''
              this.newListsShow--
              break
            }
          }
        }
      }
    },
    getdata (evt) {
      console.log(evt.draggedContext.element.id)
    },
     clickChart(clickIndex) {
      let activeItem = document.querySelector('.active')
      let activeIndex = activeItem.dataset.order
      let clickItem = this.items[clickIndex - 1]
      if (activeIndex === clickIndex) {
        return
      }
      activeItem.classList.remove('active')
      clickItem.classList.add('active')
      this._setStyle(clickItem, activeItem)
    },
      _setStyle(el1, el2) {
      let transform1 = el1.style.transform
      let transform2 = el2.style.transform
      el1.style.transform = transform2
      el2.style.transform = transform1
    },
    // 拖动事件
    handleDragStart (e, newList) {
      // 兼容ie
      e.dataTransfer.setData('text', ' ')
      // //此句兼容火狐,无实际作用
      e.dataTransfer.setData('infoName', ' ')
      this.moveBefore = {}
      this.moveAfter = {}
      this.dragging = newList
      this.moveBefore = newList
    },
    handleDragEnd (e, newList) {
      this.dragging = null
      for (let i = 0; i < this.newLists.length; i++) {
        if (this.newLists[i].key === this.moveBefore.key) {
          var medianBefore = this.newLists[i].key
          var medianBeforeIndex = i
        }
        if (this.newLists[i].key === this.moveAfter.key) {
          var medianAfter = this.newLists[i].key
          var medianAfterIndex = i
        }
      }
      if ((medianAfter !== undefined) && (medianBefore !== undefined) && (medianAfter !== '') && (medianBefore !== '')) {
        this.newLists[medianBeforeIndex].key = medianAfter
        this.newLists[medianAfterIndex].key = medianBefore
      }
    },
    // 首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver (e) {
      e.dataTransfer.dropEffect = 'move' // e.dataTransfer.dropEffect='move';//在dragenter中针对放置目标来设置!
    },
    handleDragEnter (e, headLists) {
      this.moveAfter = headLists
      // 为需要移动的元素设置dragstart事件
      e.dataTransfer.effectAllowed = 'move'
      if (headLists === this.dragging) {
        return false
      }
    },
    // 切换专题组
    changeModule (e, headLists) {
      this.dialogModuleVisible = true
    }
  }
}

</script>
<style>
.container {
  margin-top: 100px;
}
.active{
  height: 100%;
  width: 69%;
  margin-left: 10px;
  line-height: 300px;
}
</style>
