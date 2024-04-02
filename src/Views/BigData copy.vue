<template>
  <dv-full-screen-container class="content">
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-show="loading">加载中...</dv-loading>
      <div class="host-body">
        <div>
          <!-- 顶部title部分 -->
          <el-row>
            <el-col :span="6"
              >
              <div class="draw-border"><el-button class="cssw" type="text" size="medium" style="position: absolute;  top: 6px; left: 100px;" @click="jump">后台管理</el-button></div>
              <div class="draw-border"><el-button type="text" size="medium" style="position: absolute;  top: 4px; left: 245px; padding: 10px 20px; font-weight: bold; font-size: medium;" >扶梯统计</el-button></div>
              <dv-decoration-8
                class="title_right"
                :color="['#008CFF', '#00ADDD']"
            /></el-col>
            <el-col :span="12"
              ><div class="title_text">智 能 安 防 系 统</div>
              <dv-decoration-5
                class="title_center"
                :color="['#008CFF', '#00ADDD']"
            /></el-col>
            <el-col :span="6"
              >
              <div class="draw-border"><el-button class="cssw" type="text" size="medium" style="position: absolute;  top: 6px; right: 100px;" @click="jump3">楼梯模型</el-button></div>
              <div class="draw-border"><el-button class="cssw" type="text" size="medium" style="position: absolute;  top: 6px; right: 250px;" @click="jump2">扶梯检测</el-button></div>
              <dv-decoration-8
                :reverse="true"
                class="title_left"
                :color="['#008CFF', '#00ADDD']"
            /></el-col>
          </el-row>
          <!-- 主体部分 -->
          <el-row>
            <!-- 第一列 -->
            <el-col :span="6">
              <!-- 饼图部分 -->
              <div class="left_box1">
                <dv-border-box-12>
                  <div id="Rose_diagram" ref="rosediagram"></div>
                  <dv-active-ring-chart
                    :config="config"
                    class="left_box1_rose_right"
                  />
                  <div
                    class="rose_text"
                    v-for="(item, index) in numberData"
                    :key="index"
                  >
                    <p>
                      <span class="coin">&</span>
                      <span class="rose_text_nmb">{{
                        item.number.number
                      }}</span>
                    </p>
                    <p>
                      <span>{{ item.text }}</span>
                      <span class="colorYellow">(座)</span>
                    </p>
                  </div>
                </dv-border-box-12>
              </div>
              <!-- 柱状图部分 -->
              <div class="left_box2">
                <dv-border-box-12 style="padding-top: 10px">
                  <p style="margin-left: 15px">振动和速度统计图</p>
                  <div id="columnar" ref="columnar" style="position: relative; left: -5px;"></div>
                </dv-border-box-12>
              </div>
              <!-- 轮播表格部分 -->
              <div class="left_box3">
                <dv-border-box-12 style="padding-top: 10px">
                  <dv-scroll-board
                    :config="board_info"
                    class="carousel_list"
                  />
                </dv-border-box-12>
              </div>
            </el-col>
            <!-- 第二列 -->
            <el-col :span="12">
              <!-- 中国地图 -->
              <div class="line_center_map">
                <dv-border-box-10>
                  <div id="chart" style="width: 100%; height: 100%;"></div>
                </dv-border-box-10>
              </div>
              <!-- 折线图 -->
              <div class="line_center">
                <dv-border-box-8>
                  <div id="line_center_diagram" ref="echartsline"></div>
                </dv-border-box-8>
              </div>
            </el-col>
            <!-- 第三列 -->
            <el-col :span="6">
              <!-- 轮播排行榜部分 -->
              <div class="right_box1">
                <dv-border-box-12>
                  <dv-decoration-7 style="width: 100%; height: 30px"
                    >扶 梯 总 量  排 行 </dv-decoration-7
                  >
                  <dv-scroll-ranking-board
                    :config="config"
                    style="width: 95%; height: 87%; margin-left: 2%"
                  />
                </dv-border-box-12>
              </div>
              <!-- 虚线柱状图部分 -->
              <div class="right_box2">
                <dv-border-box-12 :reverse="true">
                  <p style="position: relative; top: 20px; left: 10px;">制停距离测量图</p>
                  <div id="dotter_bar" ref="dotterbar" style="position: relative; top: -20px;"></div>
                </dv-border-box-12>
              </div>
              <!-- 部分 -->
              <div class="right_box3">
                <dv-border-box-12 :reverse="true">
                  <dv-conical-column-chart :config="cone" class="cone_box" />
                </dv-border-box-12>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</dv-full-screen-container>
</template>
<script>
import drawMixin from "../utils/drawMixin"; //自适应缩放
import { formatTime } from "../utils/index.js"; //日期格式转换
import * as echarts from "echarts";
import nanchang from "../utils/nanchang.json"
import { Bigdataecharts } from "@/api/echartsapi";
import one from '../assets/futi1.jpg'

export default {
  mixins: [drawMixin],
  data() {
    return {
      //振动和速度统计（每组10个数据）
      columnardata:{
        //振动数据
        data1:[46, 50, 55, 230, 75, 85, 99, 125, 140, 215],
        //速度数据
        data2:[180, 207, 240, 283, 328, 360, 398, 447, 484, 504]
      },
      //平均电动机温度变化（每组12个数据）
      linecenterdiagramdata:{
        //去年每月温度数据
        before:[20, 50, 42, 41, 30,60,45, 30, 50, 42,20, 50],
        //今年每月温度数据
        now:[40, 56, 52, 60, 50,40,32, 52, 35,60, 52, 65]
      },
      //制动距离测量（每组14个数据）
      dotterbardata:{
        //速度数据
        data1:[20,26,59,45,21,12,33,12,54,12,32,12,51,12],
        //最大制动速度
        data2:[23,15,65,12,45,23,51,23,66,31,51,23,45,12],
        //制停距离
        data3:[12,5,1,22,16,13,9,5,15,18,22,11,15,15]
      },
      //定时器
      timing: null,
      //loading图
      loading: true,
      //时分秒
      dateDay: null,
      //年月日
      dateYear: null,
      //周几
      dateWeek: null,
      //周几
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      zoom: 13,
      center: [115.858479, 28.682812],
      //轮播排行榜
      config: {
        data: [
          {
            name: "东湖区",
            value: 215,
          },
          {
            name: "西湖区",
            value: 264,
          },
          {
            name: "青云谱区",
            value: 192,
          },
          {
            name: "青山湖区",
            value: 203,
          },
          {
            name: "新建区",
            value: 325,
          },
          {
            name: "湾里区",
            value: 155,
          },
          {
            name: "南昌县",
            value: 359,
          },
          {
            name: "进贤县",
            value: 192,
          },
          {
            name: "安义县",
            value: 149,
          },
        ],
      },
      //左侧饼图文字
      numberData: [
        {
          number: {
            number: 224,
          },
          text: "县扶梯量",
        },
        {
          number: {
            number: 6554,
          },
          text: "总扶梯量",
        },
        {
          number: {
            number: 2054,
          },
          text: "市扶梯量",
        },
      ],
      //左侧轮播表格配置项
      board_info: {
        header:  ["扶梯编号", "运行状态", "故障次数"],
        data: [
        ["ET001", "正常运行", "2次"],
        ["ET002", "故障", "5次"],
        ["ET003", "正常运行", "1次"],
        ["ET004", "正常运行", "0次"],
        ["ET005", "正常运行", "0次"],
        ["ET006", "故障", "3次"],
        ["ET007", "正常运行", "0次"],
        ["ET008", "正常运行", "0次"],
        ["ET009", "故障", "4次"],
        ["ET010", "正常运行", "1次"],
        ],
      },
      // 定义颜色
      colorList: {
        linearYtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#f5b44d",
            },
            {
              offset: 1,
              color: "#28f8de",
            },
          ],
        },
        linearGtoB: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#43dfa2",
            },
            {
              offset: 1,
              color: "#28f8de",
            },
          ],
        },
        linearBtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#1c98e8",
            },
            {
              offset: 1,
              color: "#28f8de",
            },
          ],
        },
        areaBtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(35,184,210,.2)",
            },
            {
              offset: 1,
              color: "rgba(35,184,210,0)",
            },
          ],
        },
      },
      //锥形柱状图
      cone: {
        data: [
          {
            name: "南昌",
            value: 55,
          },
          {
            name: "九江",
            value: 120,
          },
          {
            name: "赣州",
            value: 71,
          },
          {
            name: "上饶",
            value: 66,
          },
          {
            name: "吉安",
            value: 80,
          },
          {
            name: "丰城",
            value: 35,
          },
          {
            name: "漯河",
            value: 15,
          },
        ],
        showValue: true,
      },
    };
  },
  beforeDestroy() {
    //离开时删除计时器
    clearInterval(this.timing);
  },
  methods: {
    getchart(){
      Bigdataecharts().then((data)=>{
        console.log(data,'bigdata')
        this.columnardata.data1 = data.data.vibrationAndSpeed.vibration
        this.columnardata.data2 = data.data.vibrationAndSpeed.speed
        this.linecenterdiagramdata.before = data.data.temperature.before
        this.linecenterdiagramdata.now = data.data.temperature.now
        this.dotterbardata.data1 = data.data.brakingDistance.speed
        this.dotterbardata.data2 = data.data.brakingDistance.retardationSpeed
        this.dotterbardata.data3 = data.data.brakingDistance.brakingDistance
     })
    },
      jump(){
          this.$router.push('/home')
      },
      jump2(){
          this.$router.push('/futi')
      },
      jump3(){
        this.$router.push('/louti')
      },
    //右上角当前日期时间显示：每一秒更新一次最新时间
    timeFn() {
      this.timing = setInterval(() => {
        //获取当前时分秒
        this.dateDay = formatTime(new Date(), "HH: mm: ss");
        //获取当前年月日
        this.dateYear = formatTime(new Date(), "yyyy-MM-dd");
        //获取当前周几
        this.dateWeek = this.weekday[new Date().getDay()];
      }, 1000);
    },
    //loading图
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 800);
    },
    //玫瑰饼图
    Rose_diagram() {
      const mapChart = echarts.init(this.$refs.rosediagram); //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize; //如果容器变大小，自适应从新构图
      let option = {
        color: [
          "#37a2da",
          "#32c5e9",
          "#9fe6b8",
          "#ffdb5c",
          "#ff9f7f",
          "#fb7293",
          "#e7bcf3",
          "#8378ea",
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        toolbox: {
          show: true,
        },
        calculable: true,
        legend: {
          orient: "horizontal",
          icon: "circle",
          bottom: 0,
          x: "center",
          data: ["东湖区", "西湖区", "青云谱区", "湾里区", "青山湖区", "进贤县"],
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "扶梯量统计",
            type: "pie",
            radius: [10, 50],
            roseType: "area",
            center: ["50%", "40%"],
            data: [
              { value: 215, name: "东湖区" },
              { value: 264, name: "西湖区" },
              { value: 192, name: "青云谱区" },
              { value: 155, name: "湾里区" },
              { value: 203, name: "青山湖区" },
              { value: 192, name: "进贤县" },
            ],
          },
        ],
      };
      mapChart.setOption(option); //生成图表
    },
    //柱状图
    columnar() {
      const mapChart = echarts.init(this.$refs.columnar); //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize; //如果容器变大小，自适应从新构图
      let option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "white",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
              backgroundColor: "#7B7DDC",
            },
          },
                formatter: function(params) {
            var tooltipContent = params[0].name + "<br/>";
            
            tooltipContent += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#956FD4;"></span>';
            tooltipContent += "梯级振动: " + params[0].data + " m/s²" + "<br/>";
            
            tooltipContent += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(156,107,211,0.8);"></span>';
            tooltipContent += "扶梯速度: " + params[1].data + " m/s";
            
            return tooltipContent;
        },
        },
        grid: {
          x: "8%",
          width: "95%",
          y: "4%",
        },
        xAxis: {
          data: [
            "南昌",
            "东湖",
            "西湖",
            "青云谱",
            "青山湖",
            "湾里",
            "新建",
            "进贤",
            "安义",
            "赣江",
          ],
          axisLine: {
            lineStyle: {
              color: "#B4B4B4",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },

            axisLabel: {
              formatter: "{value} ",
            },
          },
        ],
        series: [
          {
            name: "梯级振动",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#956FD4" },
                  { offset: 1, color: "#3EACE5" },
                ]),
              },
            },
            data:this.columnardata.data1
          },
          {
            name: "扶梯速度",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(156,107,211,0.8)" },
                  { offset: 0.2, color: "rgba(156,107,211,0.5)" },
                  { offset: 1, color: "rgba(156,107,211,0.2)" },
                ]),
              },
            },
            z: -12,
            data:this.columnardata.data2
          },
        ],
      };
      mapChart.setOption(option); //生成图表
    },
    //折线图
    line_center_diagram() {
      const mapChart = echarts.init(this.$refs.echartsline)
      let xLabel = ['一月', '二月', '三月', '四月', '五月', '六月','七月', '八月', '九月', '十月', '十一月', '十二月',]

      const option = {
  backgroundColor:"rgba(255,255,255,0.1)",
  tooltip: {
      show:true,
      trigger: 'axis',
  },
  title:{
      text:'平均电动机温度',
      left:'center',
      top:20,
      textStyle:{
          color:'#9DCFCF',
      }
  },
  legend: {
      show:true,
      top:45,
      textStyle:{
          color:'#9DCFCF'
      }
  },
  grid: {
      top: '15%',
      left: '10%',
      right: '5%',
      bottom: '15%'
  },
  xAxis: [{
      type: 'category',
      boundaryGap: false,
      axisLine: {
          show: true,
          lineStyle: {
              color: "rgba(76, 230, 231, 0.1)"
          },
      },
      axisLabel: {
          textStyle: {
              color: '#9DCFCF',
              padding: 16,
              fontSize: 14
          },
          formatter: function(data) {
              return data
          }
      },
      splitLine: {
          show: false,
      },
      axisTick: {
          show: false,
      },
      data: xLabel
  }],
  yAxis: [{
      name:'摄氏度',
      nameTextStyle: {
          color: "#9DCFCF",
          fontSize: 16,
          padding: 10
      },
      min: 0,
      splitNumber: 10,
      splitLine: {
          show: true,
          lineStyle: {
              color: "rgba(76, 230, 231, 0.1)"
          },
      },
      axisLine: {
          show: false,
      },
      axisLabel: {
          show: true,
          textStyle: {
              color: '#9DCFCF',
              padding: 16
          },
          formatter: function(value) {
              if (value === 0) {
                  return value
              }
              return value
          }
      },
      axisTick: {
          show: false,
      },
  }],
  series: [{
      name: '去年',
      type: 'line',
      symbol: 'circle',
      showAllSymbol: true,
      symbolSize: 0,
      smooth: true,
      lineStyle: {
          normal: {
              width: 4,
              color: "rgba(32, 214, 179, 1)",
          }
      },
      itemStyle: {
          color: "rgba(32, 214, 179, 1)",
          borderWidth: 2
      },
      tooltip: {
          show: true
      },
      areaStyle: {
          normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: "rgba(32, 214, 179,.3)"
                  },
                  {
                      offset: 1,
                      color: "rgba(32, 214, 179, 0)"
                  }
              ], false),
              shadowColor: 'rgba(32, 214, 179, 0.5)',
              shadowBlur: 20
          }
      },
      data:this.linecenterdiagramdata.before
  }, {
      name: '今年',
      type: 'line',
      symbol: 'circle',
      showAllSymbol: true,
      symbolSize: 0,
      smooth: true,
      lineStyle: {
          normal: {
              width: 4,
              color: "rgba(76, 228, 230, 1)",
          }
      },
      itemStyle: {
          color: "rgba(76, 228, 230, 1)",
          borderWidth: 2

      },
      tooltip: {
          show: true
      },
      areaStyle: {
          normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: "rgba(76, 228, 230, 0.3)"
                  },
                  {
                      offset: 1,
                      color: "rgba(76, 228, 230, 0)"
                  }
              ], false),
              shadowColor: 'rgba(76, 228, 230, 0.5)',
              shadowBlur: 20
          }
      },
      data:this.linecenterdiagramdata.now
  }]
};
    mapChart.setOption(option); //生成图表
    },
    //右侧虚线柱状图图
    dotter_bar() {
      const mapChart = echarts.init(this.$refs.dotterbar); //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize; //如果容器变大小，自适应从新构图
      // Generate data
      let category = [
      '第一次',
      '第二次',
      '第三次',
      '第四次',
      '第五次',
      '第六次',
      '第七次',
      '第八次',
      '第九次',
      '第十次',
      '第十一次',
      '第十二次',
      '第十三次',
      '第十四次',
      ];

      // option
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function(params) {
            var tooltipContent = params[0].name + "<br/>";
            
            tooltipContent += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#956FD4;"></span>';
            tooltipContent += "运行速度: " + params[0].data + " cm/s" + "<br/>";
            
            tooltipContent += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#14c8d4;"></span>';
            tooltipContent += "最大制动速度: " + params[1].data + " dm/s²" + "<br/>";
            
            tooltipContent += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(20,200,212,0.5);"></span>';
            tooltipContent += "制停距离: " + params[2].data + " cm";

            return tooltipContent;
        },
        },
        grid: {
          left: 50,
          right: 10,
          bottom: 25,
          top: "18%",
        },
        legend: {
          data: ["line", "bar"],
          textStyle: {
            color: "#ccc",
          },
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        series: [
          {
            name: "运行速度",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            data: this.dotterbardata.data1
          },
          {
            name: "最大制动速度",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              borderRadius: 5,
              // color: "#14c8d4",
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#14c8d4" },
                { offset: 1, color: "#43eec6" },
              ]),
            },
            data:this.dotterbardata.data2
          },
          {
            name: "制停距离",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              // color: "rgba(20,200,212,0.5)",
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(20,200,212,0.5)" },
                { offset: 0.2, color: "rgba(20,200,212,0.2)" },
                { offset: 1, color: "rgba(20,200,212,0)" },
              ]),
            },
            z: -12,
            data: this.dotterbardata.data3
          },
        ],
      };
      mapChart.setOption(option); //生成图表
    },
    map(){
         //地图
    const mapChart = echarts.init(document.getElementById('chart'))
    echarts.registerMap('nanchang',nanchang);
    var option = {
        geo: {
          type: 'map',
          map: 'nanchang',
          zoom: 1.2,
          itemStyle: {
                        areaColor: 'rgba(0, 128, 255, 0.8)', // 将地图的填充颜色设置为淡蓝色（使用RGBA颜色值）
                      },
          label: {
            show: false,
            fontSize: 10,
            color: '#000',
            emphasis: {
              show: false,
            }
          },
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [
              { name: '东湖区', value: [115.900207, 28.692375] },
              { name: '西湖区', value: [115.877857, 28.682162] },
              { name: '青云谱区', value: [115.925749, 28.635724] },
              { name: '湾里区', value: [115.749083, 28.716854] },
              { name: '青山湖区', value: [115.962268, 28.690788] },
              { name: '南昌县', value: [115.944507, 28.543781] },
              { name: '新建区', value: [115.815455, 28.692929] },
              { name: '安义县', value: [115.553109, 28.844245] },
              { name: '进贤县', value: [116.259139, 28.368781] }
            ],
            symbolSize: 6,
            label: {
              show: true,
              formatter: '{b}',
              position: 'right',
              fontSize: 10,
              color: '#000',
              emphasis: {
                show: true,
                color: '#000',
                fontSize: 12,
                fontWeight: 'bold',
              }
            },
            itemStyle: {
              color: '#F00'
            }
          }
        ],
        tooltip: {
          show: true,
          formatter: function(params) {
            var content = document.createElement('div'); // 创建一个包含内容的div元素

            var title = document.createElement('p'); // 创建标题元素
            title.innerHTML = '<strong>' + params.name + '</strong>'; // 设置标题内容
            content.appendChild(title); // 将标题元素添加到内容div中

            var value = document.createElement('p'); // 创建数值元素
            var config = {
        data: [
          {
            name: "东湖区",
            value: 215,
          },
          {
            name: "西湖区",
            value: 264,
          },
          {
            name: "青云谱区",
            value: 192,
          },
          {
            name: "青山湖区",
            value: 203,
          },
          {
            name: "新建区",
            value: 325,
          },
          {
            name: "湾里区",
            value: 155,
          },
          {
            name: "南昌县",
            value: 359,
          },
          {
            name: "进贤县",
            value: 192,
          },
          {
            name: "安义县",
            value: 149,
          },
        ],
          };
            let dataa = config.data.find(item => item.name === params.name);
            if (dataa) {
              params.value = dataa.value;
            }
            value.innerHTML = '扶梯数量：'+params.value; // 设置数值内容
            content.appendChild(value); // 将数值元素添加到内容div中

            var value = document.createElement('p'); // 创建数值元素
            var config = {
        data: [
          {
            name: "东湖区",
            value: 315,
          },
          {
            name: "西湖区",
            value: 464,
          },
          {
            name: "青云谱区",
            value: 492,
          },
          {
            name: "青山湖区",
            value: 503,
          },
          {
            name: "新建区",
            value: 625,
          },
          {
            name: "湾里区",
            value: 455,
          },
          {
            name: "南昌县",
            value: 659,
          },
          {
            name: "进贤县",
            value: 492,
          },
          {
            name: "安义县",
            value: 649,
          },
        ],
          };
            let datae = config.data.find(item => item.name === params.name);
            if (datae) {
              params.value = datae.value;
            }
            value.innerHTML = '扶梯压力：'+params.value+' Pa'; // 设置数值内容
            content.appendChild(value); // 将数值元素添加到内容div中

            
            var value = document.createElement('p'); // 创建数值元素
            var config = {
        data: [
          {
            name: "东湖区",
            value: 215,
          },
          {
            name: "西湖区",
            value: 364,
          },
          {
            name: "青云谱区",
            value: 292,
          },
          {
            name: "青山湖区",
            value: 303,
          },
          {
            name: "新建区",
            value: 225,
          },
          {
            name: "湾里区",
            value: 355,
          },
          {
            name: "南昌县",
            value: 459,
          },
          {
            name: "进贤县",
            value: 292,
          },
          {
            name: "安义县",
            value: 349,
          },
        ],
          };
            let datad = config.data.find(item => item.name === params.name);
            if (datad) {
              params.value = datad.value;
            }
            value.innerHTML = '扶梯电流：'+params.value+' A'; // 设置数值内容
            content.appendChild(value); // 将数值元素添加到内容div中


            var image = new Image(); // 创建img元素
            image.src = one ; // 设置图片URL
            content.appendChild(image); // 将图片元素添加到内容div中

            return content.outerHTML; // 返回内容div的HTML字符串
          }
        }
      }

mapChart.setOption(option);
    }
  },
    
  mounted() {
    //获取实时时间
    this.timeFn();
    //加载loading图
    setInterval(()=>{
      this.cancelLoading()
    },600)
    this.getchart()
    setTimeout(() => {
    // 执行初始化操作
    //左侧玫瑰饼图
    this.Rose_diagram();
    //左侧柱状图
    this.columnar();
    //中间折线图
    this.line_center_diagram();
    //虚线柱状图
    this.dotter_bar();
    this.map()
  }, 1000); // 延迟1秒
  },
};
</script>
<style lang="scss" scoped>
//全局样式部分！！！！
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
  outline: none;
  box-sizing: border-box;
}
html {
  margin: 0;
  padding: 0;
}
.content{
  background-image: url("../assets/back.jpg"); //背景图
  background-size: cover; //背景尺寸
  background-position: center center; //背景位置
}
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.2em;
  background-color: #f1f1f1;
  margin: 0;
  padding: 0;
}
a {
  color: #343440;
  text-decoration: none;
}
//--------------------------------------------

//页面样式部分！！！！
#index {
  color: #d3d6dd;
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;
  .bg {
    //整体页面背景
    width: 100%;
    height: 100%;
    padding: 16px 16px 0 16px;
    position: relative;
  top: -15px;
  }
  //顶部右边装饰效果
  .title_left {
    margin-top: 18px;
    width: 100%;
    height: 50px;
  }
  //顶部左边装饰效果
  .title_right {
    width: 100%;
    height: 50px;
    margin-top: 18px;
  }
  //顶部中间装饰效果
  .title_center {
    width: 100%;
    height: 50px;
  }
  //顶部中间文字数据可视化系统
  .title_text {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-top: 14px;
    color: #008cff;
  }
  //时间日期
  .title_time {
    text-align: center;
  }
  //中国地图
  .line_center_map {
    height: 635px;
    width: 100%;
  }
  //中间折线图
  .line_center {
    width: 100%;
    height: 310px;
    padding: 3px;
    position: relative;
    bottom: -5px;
  }
  //左1模块
  .left_box1 {
    height: 310px;
    width: 100%;
    margin-bottom: 10px;
    position: relative;
  }
  //左2模块
  .left_box2 {
    height: 310px;
    width: 100%;
    margin-bottom: 10px;
  }
  //左3模块
  .left_box3 {
    height: 310px;
    width: 100%;
  }
  //右1模块
  .right_box1 {
    height: 310px;
    width: 100%;
    margin-bottom: 10px;
  }
  //右2模块
  .right_box2 {
    height: 310px;
    width: 100%;
    margin-bottom: 10px;
  }
  //右3模块
  .right_box3 {
    height: 310px;
    width: 100%;
  }
  //左1模块-玫瑰饼图
  #Rose_diagram {
    height: 70%;
    width: 55%;
  }
  //左1模块-圆环图
  .left_box1_rose_right {
    height: 85%;
    width: 55%;
    position: absolute;
    right: 0;
    top: 0;
  }
  //左1模块-文字部分
  .rose_text {
    display: inline-block;
    margin-top: 4%;
    margin-left: 4%;
  }
  // 左1模块-￥符号样式
  .coin {
    font-size: 20px;
    color: #ffc107;
  }
  //左1模块-（件）样式
  .colorYellow {
    color: yellowgreen;
  }
  //左1模块-数字样式
  .rose_text_nmb {
    font-size: 20px;
    color: #00b891;
  }
  //左2模块 柱状图
  #columnar {
    height: 97%;
    width: 95%;
    margin-left: 3%;
    margin-top: 5px;
  }
  //折线图
  #line_center_diagram {
    height: 100%;
    width: 100%;
  }
  #line_center_gaodemap {
    height: 98%;
    width: 98%;
    position: relative;
    left: 9px;
    top: 5px;
  }
  //轮播表格
  .carousel_list {
    width: 96%;
    height: 98%;
    margin-left: 10px;
  }
  //虚线柱状图
  #dotter_bar {
    width: 100%;
    height: 100%;
  }
  //锥形图
  .cone_box {
    width: 95%;
    height: 97%;
    margin-left: 3%;
  }
}
.draw-border .cssw{
    border: 0;
    background: none;
    text-transform: uppercase;
    color: #008cff;
    font-weight: bold;
    position: relative;
    outline: none;
    padding: 10px 20px;
    box-sizing: border-box;
  }
  .draw-border .cssw::before,
  .draw-border .cssw::after {
      box-sizing: inherit;
      position: absolute;
      content: '';
      border: 2px solid transparent;
      width: 0;
      height: 0;
    }

    .draw-border .cssw::after {
      bottom: 0;
      right: 0;
    }

    .draw-border .cssw::before {
      top: 0;
      left: 0;
    }

    .draw-border .cssw:hover::before,
    .draw-border .cssw:hover::after {
      width: 100%;
      height: 100%;
    }

    .draw-border .cssw:hover::before {
      border-top-color: #008cff;
      border-right-color: #008cff;
      transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
    }

    .draw-border .cssw:hover::after {
      border-bottom-color: #008cff;
      border-left-color: #008cff;
      transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s, height 0.3s ease-out 1s;
    }
</style>

