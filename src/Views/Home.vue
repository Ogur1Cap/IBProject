<template>
  <el-row>
    <el-col :span="11">
       <div id="chart" style="width: 100%; height: 800px;"></div>
    </el-col>
    <el-col :span="13">
      <!-- echarts图表 -->
      <div style="margin-left: =20px">
        <!-- 折线图 -->
        <el-card style="height: 270px">
          <div ref="echarts1" style="height: 280px"></div>
        </el-card>
        <div class="gonggao" style="margin-top: 15px">
          <!-- 柱状图 -->
          <el-card style="height: 270px ; width: 100%;">
                  <dv-scroll-board
                    :config="board_info"
                    class="carousel_list"
                    style="height: 240px; width: 100%;"
                  />
          </el-card>
        </div>
        <div class="graph" style="margin-top: 15px">
          <!-- 柱状图 -->
          <el-card style="height: 270px ; width: 100%;">
            <div ref="echarts2" style="height: 270px"></div>
          </el-card>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountData from "../data/CountData";
import * as echarts from "echarts";

// echarts的配置数据
import order from "../data/echartsData/order";
import user from "../data/echartsData/user";
import nanchang from "../utils/nanchangxian.json"

export default {
  data() {
    return {
      CountData,
      capacity:[100,153,145,200,149,110,210],
      scatterData:[
      { name: '莲塘镇', value: [115.940361,28.548905],averageSpeed: 40,  quantity: 50, gradient: 3 },
      { name: '三江镇', value: [116.015286,28.298123] ,averageSpeed: 52,  quantity: 80, gradient: 6 },
      { name: '幽兰镇', value: [116.162062,28.582903] ,averageSpeed: 42,  quantity: 60, gradient: 3 },
      { name: '武阳镇', value: [116.026213,28.523407],averageSpeed: 40,  quantity: 56, gradient: 3 },
      { name: '昌东镇', value: [116.013391,28.682402],averageSpeed: 53,  quantity: 78, gradient: 3 },
      { name: '东新乡', value: [115.853041,28.60688] ,averageSpeed: 56,  quantity: 65, gradient: 3 },
      { name: '冈上镇', value: [115.87439,28.421587],averageSpeed: 54,  quantity: 63, gradient: 3  },
      { name: '广福镇', value: [115.918078,28.370138] ,averageSpeed: 52,  quantity: 87, gradient: 3 },
      { name: '蒋巷镇', value: [116.025323,28.770742] ,averageSpeed: 45,  quantity: 74, gradient: 3 },
      ],
      nanchangxian:['莲塘镇','三江镇','幽兰镇','武阳镇','昌东镇','东新乡'],
      wholedata:[
        //莲塘镇
        {'扶扶梯量':100,'平均速度':10,'梯级振动':0.6,'电机温度':300},
        //三江镇
        {'扶扶梯量':108,'平均速度':40,'梯级振动':0.9,'电机温度':400},
        //幽兰镇
        {'扶扶梯量':140,'平均速度':20,'梯级振动':0.6,'电机温度':300},
        //武阳镇
        {'扶扶梯量':150,'平均速度':17,'梯级振动':0.5,'电机温度':500},
        //昌东镇
        {'扶扶梯量':130,'平均速度':50,'梯级振动':0.4,'电机温度':500},
        //东新乡
        {'扶扶梯量':150,'平均速度':15,'梯级振动':0.3,'电机温度':600},],
        board_info: {
        headerBGC:'#999',//909399
        oddRowBGC:'#FFF',//999
        evenRowBGC:'#FFF',
        header:  ["区域", "扶梯编号", "总体情况", "故障次数"],
        data: [
        ['<span style="color:#000;">莲塘镇</span>', '<span style="color:#000;">ET065</span>','<span style="color:#000;">良好</span>', '<span style="color:#000;">30次</span>'],
        ['<span style="color:#000;">三江镇</span>', '<span style="color:#000;">ET596</span>', '<span style="color:#000;">一般</span>','<span style="color:#000;">56次</span>'],
        ['<span style="color:#000;">幽兰镇</span>', '<span style="color:#000;">ET323</span>', '<span style="color:#000;">良好</span>', '<span style="color:#000;">24次</span>'],
        ['<span style="color:#000;">武阳镇</span>', '<span style="color:#000;">ET048</span>', '<span style="color:#000;">一般</span>', '<span style="color:#000;">46次</span>'],
        ['<span style="color:#000;">昌东镇</span>', '<span style="color:#000;">ET658</span>', '<span style="color:#000;">一般</span>', '<span style="color:#000;">40次</span>'],
        ['<span style="color:#000;">东新乡</span>', '<span style="color:#000;">ET256</span>', '<span style="color:#000;">良好</span>', '<span style="color:#000;">25次</span>'],
        ['<span style="color:#000;">冈上镇</span>', '<span style="color:#000;">ET067</span>', '<span style="color:#000;">偏差</span>', '<span style="color:#000;">106次</span>'],
        ['<span style="color:#000;">广福镇</span>', '<span style="color:#000;">ET364</span>', '<span style="color:#000;">一般</span>', '<span style="color:#000;">60次</span>'],
        ['<span style="color:#000;">蒋巷镇</span>', '<span style="color:#000;">ET158</span>', '<span style="color:#000;">一般</span>', '<span style="color:#000;">54次</span>'],
        ],
        align: ['center']
      },
    };
  },
  methods: {
    priceFormate(price) {
      return "&" + price;
    },
    map() {
  const mapChart = echarts.init(document.getElementById('chart'));
  echarts.registerMap('nanchang', nanchang);
  const option = {
    geo: {
      type: 'map',
      map: 'nanchang',
      zoom: 1.2,
      label: {
        show: false,
        emphasis: {
          show: false,
        }
      },
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: this.scatterData,
        symbolSize: 10,
        label: {
          show: true,
          formatter: '{b}',
          position: 'right',
          color: '#000'
        },
        itemStyle: {
          color: '#FF0000'
        }
      },
    ],
    tooltip: {
      show: true,
      formatter: function(params) {
        return params.name;
      }
    },
  };
  
  mapChart.on('click', function(params) {
    console.log('464');
  });
  
  mapChart.setOption(option);

  const areaOption = {
        xAxis: [],
        yAxis: [],
        tooltip: {
            trigger: 'axis',
        },
        grid: [],
        series: []
    };
    echarts.util.each(this.scatterData, function(dataItem, idx) {     
      console.log(idx)
        // 获取坐标
        var geoCoord = dataItem.value
        // 转换坐标系上的点到像素坐标值
        var coord = mapChart.convertToPixel('geo', geoCoord);
        idx += '';
        // X轴配置
        areaOption.xAxis.push({
            id: idx, // 组件id，在配置中引用标识
            gridIndex: idx, // x轴所在的grid的索引
            type: 'category', // 坐标轴类型
            name: dataItem[0], // 坐标轴名称
            nameLocation: 'middle', // 坐标轴名称显示位置
            nameGap: 3, // 坐标轴名称与轴线之间的距离
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                show: false
            },
            axisTick: { // 坐标轴刻度
                show: false
            },
            axisLabel: { // 坐标轴刻度标签
                show: false
            },
            axisLine: { // 坐标轴轴线
                onZero: false,
                lineStyle: {
                    color: '#666'
                }
            },
            data: ["平均速度","扶梯数量","平均梯级"], // 类目数据
            z: 100
        });
        // Y轴配置
        areaOption.yAxis.push({
            id: idx, // 组件id，在配置中引用标识
            gridIndex: idx, // x轴所在的grid的索引
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                show: false
            },
            axisTick: { // 坐标轴刻度
                show: false
            },
            axisLabel: { // 坐标轴刻度标签
                show: false
            },
            axisLine: { // 坐标轴轴线
                show: false,
                lineStyle: {
                    color: '#1C70B6'
                }
            },
            z: 100
        });
        // 坐标系配置
        areaOption.grid.push({
            id: idx, // 组件id，在配置中引用标识
            width: 30, // 组件的宽度
            height: 40, // 组件的高度
            left: coord[0] - 10, // 离容器左侧的距离
            top: coord[1] - 34, // 离容器上侧的距离
            z: 100
        });

        areaOption.tooltip.formatter = dataItem.name + '<br>平均速度：' + dataItem.averageSpeed + '<br>扶梯数量：' + dataItem.quantity + '<br>平均梯级：' + dataItem.gradient;
            
        // 图标系列配置
        areaOption.series.push({
            id: idx, // 组件id，在配置中引用标识
            type: 'bar', // 柱状图
            xAxisId: idx, // 使用的x轴的id
            yAxisId: idx, // 使用的y轴的id
            barGap: 0, // 柱间距离
            barCategoryGap: 0, // 同一系列的柱间距离
            data: [dataItem.averageSpeed,dataItem.quantity,dataItem.gradient], // 柱子数据
            z: 100,
            itemStyle: { // 柱子样式
                normal: {
                    color: function(params){
                        // 柱状图每根柱子颜色
                        var colorList = ['#F75D5D','#59ED4F','#4C91E7'];
                        return colorList[params.dataIndex];
                    }
                }
            }
        });
    });
    // 应用配置
    mapChart.setOption(areaOption);
},
    getData(){

          // echarts图表

          // 折线图

          // 基于准备好的dom，初始化echarts实例
          const echarts1 = echarts.init(this.$refs.echarts1);
          var echarts1Option = order;
          // ES6解构语法

          // 获取x轴:要求是一个对象
          const xAxis = Object.keys(this.wholedata[0]);
          console.log(xAxis)
          const xAxisData = {
            data: this.nanchangxian,
          };
          console.log(xAxisData.data)
          // 配置
          echarts1Option.legend = this.wholedata[0];
          echarts1Option.xAxis = xAxisData;
          echarts1Option.yAxis = {};
          echarts1Option.series = [];

          // 配置series
          xAxis.forEach((key) => {
            console.log(key)
            echarts1Option.series.push({
              name: key,
              type: "line",
              // key对应的orderData的所有值
              data: this.wholedata.map((item) => item[key]),
            });
          });

          // 使用刚指定的配置项和数据显示图表。
          echarts1.setOption(echarts1Option);

          // 柱状图
          const echarts2 = echarts.init(this.$refs.echarts2);
          const echarts2xdata = ['周一','周二','周三','周四','周五','周六','周七']
          var echarts2Option = user;

          // 配置
          echarts2Option.xAxis.data = echarts2xdata
                echarts2Option.series = [
            {
              name: "承载数量",
              data: this.capacity,
              type: "bar",
            }
          ];

          // 修改图例配置
          echarts2Option.legend = {
            textStyle: {
              color: "#333",
            },
            data: ["承载数量"],
          };

          // 修改提示框配置
          echarts2Option.tooltip = {
            trigger: 'axis',
            formatter: '{b}: {c}人', // 设置提示框格式，显示横坐标和对应的承载数量
          };

          echarts2.setOption(echarts2Option);
          }
  },
  mounted() {
    this.map();
    this.getData()
  },
};
</script>

<style lang="less" scoped>
.user {
  // 垂直居中
  display: flex;
  align-items: center;

  // 外边距:分割线距离loginInfo的距离
  margin-bottom: 20px;
  // 内边距:分割线距离User的距离
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }

  .userInfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
    }
  }
}

.loginInfo {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  // 要换行
  flex-wrap: wrap;
  // 从头到尾均匀排列
  justify-content: space-between;
  margin-left: 20px;

  .el-card {
    width: 48%;
    margin-bottom: 20px;

    .icon {
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 30px;
      color: #fff;
    }

    .details {
      // 竖着排且居中
      display: flex;
      flex-direction: column;
      justify-content: center;

      margin-left: 15px;

      .price {
        font-size: 30px;
        margin-bottom: 10px;
        line-height: 30px;
        height: 30px;
      }

      .desc {
        font-size: 14px;
        color: #999;
        text-align: center;
      }
    }
  }
}

.graph {
  display: flex;
  // 两个靠边
  justify-content: space-between;
  margin-top: 20px;

  .el-card {
    width: 49%;
  }
}
</style>