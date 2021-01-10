
<template>
<!-- 圆环图 -->
  <div class="charts" ref="stock" @mouseover="cleartimer" @mouseout="settimer">
    <!-- {{StockData}} -->
  </div>
</template>
<script>

import {getStockData} from '../../network/home'
export default {
  data() {
    return {
      StockData :[],
      mChart:null,
      start:0,
      end:5,
      timer:0,
    }
  },

  mounted(){
    
    getStockData()
      .then((res) =>{
        this.StockData = res;
        this.mChart = this.$echarts.init(this.$refs.stock,'chalk');
        this.setOption();
        this.updataOption();
        this.changestart();
        this.updateChart();
      })
  },
  methods: {
    settimer(){
      console.log(123);
      this.changestart()
    },
    cleartimer(){
      // console.log(456);
      clearInterval(this.timer)
      console.log(this.timer);
    },
    setOption(){
      let option = {
        title:{
          text:'库存和销量分析',
          left:20,
          top:20,
        }
      }
      this.mChart.setOption(option)
    },
    updataOption(){
      // 中心点数据
       const centerArr = [
        ['18%', '40%'],
        ['50%', '40%'],
        ['82%', '40%'],
        ['34%', '75%'],
        ['66%', '75%']
      ]
      //库存颜色值
      const colorArr = [
        ['#4FF778', '#0BA82C'],
        ['#E5DD45', '#E8B11C'],
        ['#E8821C', '#E55445'],
        ['#5052EE', '#AB6EE5'],
        ['#23E5E5', '#2E72BF']
      ]

      //截取当前要显示的数据
      let showData = this.StockData.slice(this.start,this.end)
      let seriesArr = showData.map((item,index) =>{
        // console.log(item);
        return{
          type:'pie',
          radius:['35%','30%'],
          center:centerArr[index],
          emphasis:{
            scale:false
          },   //移除鼠标移动动画
          labelLine:{
            show:false    //移除指示线
          }, 
            avoidLabelOverlap: false,
            label: {
                color:colorArr[index][0],
                show: true,
                fontSize: '10',
                position: 'center'
            },
          data:[{
            // name:item.name + '\n' + item.sales,
            value:item.sales,
            itemStyle:{
              color:{
                type:'linear',
                x:0,
                y:1,
                x2:0,
                y2:0,
                colorStops:[{
                  offset:0,
                  color:colorArr[index][0]
                },{
                  offset:1,
                  color:colorArr[index][1]
                }]
              }
            }
          },{
            name:item.name + '\n' +'\n' + item.sales,
            value:item.stock,
            itemStyle:{
              color:'#333843'
            }
          }]
        }
      })
      let updataOption = {
        
        series:seriesArr
      };
      this.mChart.setOption(updataOption)
    },
    changestart(){
      if(this.timer != 0){
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.start += 5;
        this.end += 5;
        if(this.start >= 10){
          this.start = 0;
          this.end = 5
        }
        this.updataOption()
      }, 3000);
    },
    updateChart(){
      window.addEventListener('resize',()=>{
        this.mChart.resize()
      })
    },
  },
}
</script>