<template>
  <div class="charts">
    <!-- 地图图表 -->
    <div class="map" ref="mapCharts">

    </div>
    <!-- {{MapData}} -->
  </div>
</template>
<script>

import {getMapData} from '../../network/home'
import mapjson from '../../../public/map/china.json'
export default {
  data() {
    return {
      MapData :[],
      MCharts:null,

    }
  },

  mounted(){
    getMapData()
      .then((res) =>{
        this.MapData = res
        // console.log(this.MapData);
        this.setOption();
        this.updatachart();
        this.screenAdapter()
      })
    },
    methods: {
     setOption(){

        this.MCharts = this.$echarts.init(document.querySelector('.map'),'chalk')
        this.$echarts.registerMap('chinaMap',mapjson)
        let option = {
          title:{
            text:'商家分布',
            top:'20',
            left:'20',
          },
          geo:{
            type:'map',
            map:'chinaMap',
            roam:true,
            top:'5%',
            bottom:'5%',
            itemStyle:{
              areaColor:'#2E72BF',  //设置地图颜色 
              borderColor:'#333'
            },
            label:{
              show:true,
            },
            zoom:1,
          },
        }
        this.MCharts.setOption(option)
      },
      //更新数据
      updatachart(){
        let legend = this.MapData.map(item=>{
          return item.name
        })
        let aa = this.MapData.map(item =>{
          return {
            data:item.children,
            name:item.name,
            type:'effectScatter',  
            coordinateSystem:'geo',
            rippleEffect: {
                    scale: 5,  //涟漪动画
                    brushType:'stroke'
                  }
          }
        })
        // console.log(aa);
        let updateOption = {
          legend:{
            data:legend,
            left:'5%',
            bottom:'5%',
            orient:'vertical'
          },
          series:aa
        }
        this.MCharts.setOption(updateOption)
      },
      // 响应式
      screenAdapter(){
        window.addEventListener('resize',()=>{
          console.log(11);
          this.MCharts.resize()
        })
      },

    },
}
</script>
<style lang="less" scoped>
  .map{
    height: 100%;
    width: 100%;
  }
</style>