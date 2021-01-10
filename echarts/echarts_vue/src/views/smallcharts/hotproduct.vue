<template>
  <div class="charts">
    <!-- {{HotproductData[0]}} -->
    <div class="charts" ref="productChart"></div>
    <div class="catname">{{catname}}</div>
    <div class="leftCurrent" @click="leftClick">
      《
    </div>
    <div class="rightCurrent" @click="rightClick">
      》
    </div>
  </div>
</template>
<script>

import {getHotproductData} from '../../network/home'
export default {
  data() {
    return {
      HotproductData :[],
      mCharts:null,
      currentIndex:0,
      catname:'',
      threeArr:[],
    }
  },

  mounted(){
    // 获取数据调用方法
    getHotproductData()
      .then((res) =>{
        this.HotproductData = res;
        // console.log(res);
        this.mCharts = this.$echarts.init(this.$refs.productChart,'chalk');
        this.setOption()
        this.updateChart()
        this.screenAdapter()

      })
  },
  methods: {
    setOption(){
      let Option = {
      title:{
        text:'热销商品销售金额占比统计',
        top:'5%',
        left:'5%',
        fontSize:'20'
        },
       legend:{
         top:'15%',
         fontSize:10,
         icon:'circle'
        },
        tooltip:{
          show:true,
          // 计算每个三级子菜单的百分比占比并输出
          formatter:(arg)=>{
            let bb = '';
            let aa = ''
            // console.log(arg.data.value);  //总销量
            // console.log(arg.data.children);  //三级分类销量和名称
            arg.data.children.forEach(item =>{   
              aa = ((item.value / arg.data.value)*100).toFixed(1) + '%'
              bb += (item.name+':'+aa) + '<br/>'
            })
            return bb
          }
        },
      series:[{
        type:'pie',
        label:{
          show:false  //隐藏文字
        },
        top:'20%',
        radius:'50%',
        emphasis:{
          label:{
            show:true,    //当饼状图处于高亮状态时的样式
          },
          labelLine:{
            show:false   //隐藏饼状图的线条
          }
        }
      }]
    }
    this.mCharts.setOption(Option)
    },
    // 左箭头点击事件
  leftClick(){
    if(this.currentIndex == 0){
      this.currentIndex = this.HotproductData.length
    }
      this.currentIndex --;
      this.updateChart()
  },
  // 右箭头点击事件
  rightClick(){
    this.currentIndex ++;
    // console.log(this.currentIndex);
    if(this.currentIndex >= this.HotproductData.length){
      this.currentIndex = 0
    }
    
    this.updateChart()
  },
  // 数据更新
  updateChart(){
    // console.log(this.HotproductData);
    this.catname = this.HotproductData[this.currentIndex].name
    let aa = this.HotproductData[this.currentIndex].children.map(item =>{
      return{
        name:item.name,
        value:item.value,
        children:item.children
      }
    })
    let aalegend = this.HotproductData[this.currentIndex].children.map(item =>{
      return item.name
    })
    
    let updataOption = {
       legend:{
          data:aalegend,
        },
      series:[{
        data:aa,
      }]
    }
    this.mCharts.setOption(updataOption)
  },
  // 响应式
  screenAdapter(){
    window.addEventListener('resize',()=>{
      this.mCharts.resize();
    })
  },
  }
}
</script>
<style lang="less" scoped>
  .leftCurrent,.rightCurrent{
    position: absolute;
    z-index: 10;
    font-size: 15px;
    color: white;
    top:60%;
    // transform: translateY(-50%);
    cursor: pointer;
  }
  .leftCurrent{
    left:10%
  }
  .rightCurrent{
    right:10%
  }
  .catname{
    position: absolute;
    z-index: 10;
    font-size: 15px;
    color: white;
    left:70%;
    bottom: 20px;
  }
</style>