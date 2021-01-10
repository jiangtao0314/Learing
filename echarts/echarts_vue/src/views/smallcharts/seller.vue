<template>
  <div class="charts">
    <!-- 柱状图 -->
      <div class="zhu" ref="zhu" @mouseout="settime" @mouseover="cleartime">

      </div>
  </div>
</template>
<script>

import {getSellerData} from '../../network/home'
export default {
  data() {
    return {
      mCharts:'',
      SellerData :[],  // 服务器请求的数据
      xiandata:[], //当前要显示的数据
      page:1, //当前页码
      maxpage:0,//最大页码
      timeout:0,
    }
  },

  mounted(){
    getSellerData()
      .then((res) =>{
        this.SellerData = res;
        this.maxpage = Math.floor(this.SellerData.length/5);
        this.SellerData.sort((a,b)=>{
          return a.value - b.value    //对数组进行排序
        })

        this.initChart();

        // 拆分option数据  更利与维护  这边是初始options数据
        let initoption = {
        title:{
          text:'电商数据',
          textStyle:{
            color:'white',
            fontSize:'15'
          },
          left:'5%',
          top:'5%',
        },
        tooltip:{
          trigger:'item',
        },
        grid:{
          top:'22%',
          right:'5%',
          bottom:'3%',
          left:'3%',
           containLabel:true
        },
        xAxis:{
          type:'value'
        },
        yAxis:{
          type:'category',
        },
        label:{
          show:true,
          position:'right',
          
        },
        barWidth:'50%',
        series:[{
          type:'bar',
          itemStyle: {
          barBorderRadius: [0, 30, 30, 0],
          color:{
            type:'linear',
            x:1,
            y:0,
            x2:0,
            y2:0,
            colorStops:[{
              offset:0,
              color:'purple', 
            },{offset:1,
              color:'blue'
            }]
          }
          },
        }],
        
      }
      this.mCharts.setOption(initoption),


        this.upChart()
        this.setin()
        this.resizes()
      })
  },
  methods: {
    // 字体分辨自适应
    resizes(){
      window.addEventListener('resize',()=>{
        let size = this.$refs.zhu.offsetWidth / 100 * 3
        console.log(size);
          let changeoption = {
        title:{
          textStyle:{
            fontSize:size,
          },
        },
        label:{
          position:'right',
        },
        series:[{
          itemStyle: {
          barBorderRadius: [0, size, size, 0],
          },
        }],
        
      }
        this.mCharts.setOption(changeoption),
        this.mCharts.resize()
      })
    },
    cleartime(){
      // 鼠标移动出去清除定时器 
      clearInterval(this.timeout)
    },
    settime(){
      // 鼠标移动进来设置定时器 并防止多重定时器触发
      clearInterval(this.timeout)
      this.setin()
    },

    //初始化echarts
    initChart(){
      this.mCharts = this.$echarts.init(this.$refs.zhu,'chalk')
    },

//绘制图表
    upChart(){
      // 计算截取开始和结束
      var start = (this.page-1)*5
      var end = this.page*5

      // console.log(end);

      this.xiandata = this.SellerData.slice(start,end)
      const names = this.xiandata.map(item => {
        return item.name
      });
       const values = this.xiandata.map(item => {
        return item.value
      });

      // option更新数据
      let option = {
        yAxis:{
          data:names,
        },
        series:[{
          data:values,
        }]
        
      }
      this.mCharts.setOption(option)
      
    },
    // 定时器
    setin(){
      this.timeout = setInterval(() => {
        // console.log(this.timeout);
        // console.log(this.page);
        if(this.page < this.maxpage){
          this.page++
          this.upChart()
        }else{
          this.page = 1
          this.upChart()
        }
      }, 4000);
    }
  },
  
}
</script>


<style lang="less" scoped>
  .zhu{
    height: 100%;
    width: 100%;
  }
</style>