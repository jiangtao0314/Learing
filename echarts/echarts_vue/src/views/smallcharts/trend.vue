<template>
  <div class="charts">
    <nav v-if="TrendData != null" :style="getTitleSize">
      <span>{{changeTitle()}}</span>
      &nbsp<span class="jiantou"></span>
      <div class="select-mon">
        <div v-for="(item,index) in TrendData.type" :key="item.key" @click="handClick(item.key)">
          {{item.key == trendkey?'':item.text}}
          </div>
      </div>
    </nav>
    <!-- 折线图 -->
    <!-- {{TrendData}} -->
    <div class="comchart" ref="trendref">
    </div>
  </div>
</template>
<script>

import {getTrendData} from '../../network/home'
export default {
  data() {
    return {
      TrendData :null,
      trendChart:null,
      trendkey:'map',
      trendsize:16,
    }
  },
  computed:{
     getTitleSize(){
      return {fontSize: this.trendsize + 'px'}
    },
  },
  mounted(){
    getTrendData()
      .then((res) =>{
        console.log(res);
        this.TrendData = res;
        this.setTrend();
        this.screenAdapter();
        this.updatechart();

      })
  },
  methods: {
    changeTitle(){
      if(this.TrendData != null){
        return this.TrendData[this.trendkey].title
      }
    },
    setTrend(){
      this.trendChart = this.$echarts.init(document.querySelector('.comchart'),'chalk');
      let initOption = {
        tooltip:{
          trigger:'axis'
        },
        //控制图例的位置和样式
        legend:{
          left:'12%',
          top:'15%',
          icon:'circle'
        },
        grid:{
          left:'3%',
          top:'35%',
          right:'4%',
          bottom:'1%',
          containLabel:true,  //坐标轴保留文字
        },
        xAxis:{
          type:'category',
          boundaryGap:false,
          //类目轴的数据
          data:this.TrendData.common.month
        },
        yAxis:{
          type:'value',
          scale:true
        },
        series:[{
          type:'line',
          smooth:true, //平滑效果
        }]
      }
      this.trendChart.setOption(initOption)
    },
    updatechart(){

       // 半透明的颜色值
      const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(44, 110, 255, 0.5)',
        'rgba(22, 242, 217, 0.5)',
        'rgba(254, 33, 30, 0.5)',
        'rgba(250, 105, 0, 0.5)'
      ]
      // 全透明的颜色值
      const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(44, 110, 255, 0)',
        'rgba(22, 242, 217, 0)',
        'rgba(254, 33, 30, 0)',
        'rgba(250, 105, 0, 0)'
      ]

      let aa = this.TrendData.[this.trendkey].data.map((item,index) => {
        return {
          //之前只是设置的单个数组，这些配置需要每个数组都设置
          type:'line',
          data:item.data,
          name:item.name,
          smooth:true,
          stack:'map',
          areaStyle:{
            color:{
            type:'linear',
            x:0,
            y:0,
            x2:0,
            y2:1,
            colorStops:[{
              offset:0,
              color:colorArr1[index], 
            },{offset:1,
              color:colorArr2[index]
            }]
            }
          }
        }
      });

      //图例遍历获取name
      let bb = aa.map(item =>{
        return item.name
      })

    //对数据进行处理
    let dataOption = {
      series:aa,
      legend:{
        data:bb
      },
    }
    this.trendChart.setOption(dataOption)
  },
  screenAdapter(){
    // 对分辨率进行适配
    window.addEventListener('resize',()=>{
      if(this.$refs.trendref.offsetHeight){
        this.trendsize = this.$refs.trendref.offsetHeight/20;
         console.log(this.trendsize);
      this.trendChart.resize()  
      }
      
     
    })
  },

  handClick(key){
    this.trendkey = key;
    this.updatechart()
  }
  },
  
}
</script>
<style lang="less" scoped>
.comchart{
  width: 100%;
  height: 100%;
}
.jiantou{
  display: inline-block;
  height: 5px;
  width: 5px;
  border-right:2px solid white;
  border-bottom:2px solid white;
  transform: rotate(45deg);
  margin-bottom: 2px;
}
nav{
  position: absolute;
  color: white;
  z-index: 10;
  left:30px;
  top:5px;
  cursor: pointer;
}
.select-mon{
  display: none;
}
nav:hover{
  .select-mon{
    display: block;
  }
}
</style>