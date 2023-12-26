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
                <div class="draw-border"><el-button class="cssw" type="text" size="medium" style="position: absolute;  top: 6px; left: 250px;" @click="jump2">扶梯统计</el-button></div>
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
                <div class="draw-border"><el-button class="cssw" type="text" size="medium" style="position: absolute;  top: 6px; right: 100px;" @click="jump3">LOUTIMOX</el-button></div>
                  <div class="draw-border"><el-button type="text" size="medium" style="position: absolute;  top: 4px; right: 245px;  padding: 10px 20px; font-weight: bold; font-size: medium;">扶梯检测</el-button></div>
                <dv-decoration-8
                :reverse="true"
                  class="title_left"
                  :color="['#008CFF', '#00ADDD']"
              /></el-col>
            </el-row>
            <!-- 主体部分 -->
            <el-row>
              <el-col :span="16">
                <!-- 中国地图 -->
                <div class="line_center_map">
                  <dv-border-box-10>
                    <canvas ref="canvas" style="width: 100%; height: 100%;"></canvas>
                    <div ref="tooltip" id="tooltip">{{ tooltipText }}</div>
                  </dv-border-box-10>
                </div>
              </el-col>
              <!-- 第三列 -->
              <el-col :span="8">
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
  import * as echarts from "echarts";
  import { Bigdataecharts } from "@/api/echartsapi";
  //import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
 // import { ObjectLoader } from "three/examples/jsm/loaders/OBJLoader";
  //import * as THREE from 'three';
  
  export default {
    mixins: [drawMixin],
    data() {
      return {
      tooltipText: '',
      raycaster: null,
      mouse: null,
      lastPick: null,
      tooltip: null ,// 添加tooltip属性
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
        //loading图
        loading: true,
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
            this.$router.push('/bigdata')
        },
        jump3(){
            this.$router.push('/louti')
        },
      //loading图
      cancelLoading() {
        setTimeout(() => {
          this.loading = false;
        }, 600);
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
      initScene() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.25;
      this.renderer.outputEncoding = THREE.sHSVEncoding;
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);

      this.canvasContainer = this.$refs.canvasContainer;
      this.canvasContainer.appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 5000);
      this.camera.position.set(0, -40, 70);
      this.camera.lookAt(0, 0, 0);
    },
    init() {
      const canvas = this.$refs.canvas
      const width = window.innerWidth
      const height = window.innerHeight

      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      this.renderer = new THREE.WebGLRenderer({ canvas })
      this.renderer.setClearColor(0xffffff, 0);
      this.camera.position.z = 5

      this.controller = new OrbitControls(this.camera, canvas)
      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

      window.addEventListener('mousemove', this.onMouseMove, false)
    },
    onMouseMove(event) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      this.tooltip.style.left = event.clientX + 2 + 'px'
      this.tooltip.style.top = event.clientY + 2 + 'px'
    },
    animate() {
      requestAnimationFrame(this.animate)

      this.raycaster.setFromCamera(this.mouse, this.camera)
      const intersects = this.raycaster.intersectObjects(this.scene.children, true)

      if (this.lastPick) {
        this.lastPick.object.material.color.set(0x00ff00)
      }

      this.lastPick = intersects.find(item => item.object.material && item.object.material.color)

      if (this.lastPick) {
        this.lastPick.object.material.color.set(0xff0000)
        this.tooltipText = this.lastPick.object.parent.properties.name
        this.tooltip.style.visibility = 'visible'
      } else {
        this.tooltipText = ''
        this.tooltip.style.visibility = 'hidden'
      }

      this.controller.update()
      this.renderer.render(this.scene, this.camera)
    },
    loadJSON() {
      const loader = new THREE.FileLoader()
      loader.load('static/jiangxi.json',
        data => {
          const objLoader = new ObjectLoader()
          const obj = objLoader.parse(JSON.parse(data))
          obj.children[0].material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
          this.scene.add(obj)
        },
        xhr => {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        },
        error => {
          console.error('An error happened', error)
        }
      )
    },
    },
      
    mounted() {
      //加载loading图
      setInterval(()=>{
        this.cancelLoading()
      },800)
      this.getchart()
      setTimeout(() => {
      this.dotter_bar();
      this.init()
      this.tooltip = this.$refs.tooltip
      this.loadJSON()
      this.animate()
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
    //中国地图
    .line_center_map {
      height: 946px;
      width: 100%;
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
    #tooltip {
  position: absolute;
  z-index: 2;
  background: white;
  padding: 10px;
  border-radius: 2px;
  visibility: hidden;
}
  </style>
  
  