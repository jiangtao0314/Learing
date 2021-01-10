
<template>
  <div class="charts" ref="rankCharts">
    <!-- {{RankData}} -->
  </div>
</template>
<script>

import {getRankData} from '../../network/home'
export default {
  data() {
    return {
      RankData :[],
      mCharts:null,
      startValue:0,
      endValue:9,
    }
  },

  mounted(){
    getRankData()
      .then((res) =>{
        this.RankData = res;
        this.mCharts = this.$echarts.init(this.$refs.rankCharts,'chalk');
        this.setoption();
        
        this.updataoption();
        this.screenAdapter();
        this.changeDatazoom();
      })
  },
  methods: {
    //定时器使其进行位移
    changeDatazoom(){
      setInterval(() => {
        if(this.endValue >= this.RankData.length){
          this.startValue = 0;
          this.endValue = 9;
          this.setoption();
        };
        this.startValue++;
        this.endValue++;
        this.setoption();
        // console.log(this.RankData);
        
      }, 3000);
    },
    //初始数据
    setoption(){
      let option = {
        dataZoom:[
          {
            type:'slider',
            show:false,
            startValue:this.startValue,   //从X轴第0个开始
            endValue:this.endValue,    //到X轴第9个结束
          }
        ],
        title:{
          text:'地区销量排行',
          left:20,
          top:20
        },
        grid:{
          top:'40%',
          left:'5%',
          right:'5%',
          bottom:'5%',
          containLabel:true
        },
        tooltip:{
          show:true
        },
        xAxis:{
        type:'category',
        },
      yAxis:{
        type:'value',
      },
     
      }
      this.mCharts.setOption(option)
    },

  //更新数据
    updataoption(){
      let cateArr = this.RankData.map(item=>{
        // console.log(item);
        return item.name
      })
      let cateValue = this.RankData.map(item=>{
        // console.log(item);
        return item.value
      })
      cateValue.sort((a,b)=>{
        return b-a
      })

      let updataoption = {
        xAxis:{
        data:cateArr
        },
      series:[{
        barWidth:'50%',
        itemStyle:{
        borderRadius: [30, 30, 0, 0],
        color:(arg)=>{
            if(arg.data > 200){
              return {
                type:'linear',
                x:0,
                y:0,
                x2:0,
                y2:1,
                colorStops:[{
                  offset:0,
                  color:'#2E72BF',
                },{
                  offset:1,
                  color:'#23E5E5'
                }]
              }
            }else{
              return {
                type:'linear',
                x:0,
                y:0,
                x2:0,
                y2:1,
                colorStops:[{
                  offset:0,
                  color:'#5052EE',
                },{
                  offset:1,
                  color:'#AB6EE5'
                }]
              }
            }
        }
      },
        type:'bar',
        data:cateValue,
      }]
      }
      this.mCharts.setOption(updataoption)
    },
    screenAdapter(){
      window.addEventListener('resize',()=>{
        // console.log(1);
        // const fontsize = this.$refs.rankCharts.offsetHeight /40
        this.mCharts.resize()
      })
    }
  },
}
</script>