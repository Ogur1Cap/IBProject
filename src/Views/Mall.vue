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
              <div class="draw-border"><el-button class="cssw" type="text" size="medium" style="position: absolute;  top: 6px; right: 100px;" @click="jump3">楼梯模型</el-button></div>
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
                  <div id="map" style="height: 100%; width: 100%;"></div>
                    <!-- <div id="map" style="height: 100%; width: 100%;"></div> -->
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
import AMapLoader from '@amap/amap-jsapi-loader'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import * as d3 from "d3";

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
      const option = {
    backgroundColor: 'rgba(255,255,255,0.1)',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        top: '15%',
        right: '3%',
        left: '5%',
        bottom: '12%'
    },
    xAxis: [{
        type: 'category',
        data: ['南京市', '淮安市','常州市', '徐州市', '南通市', '宿迁市', '无锡市', '扬州市', '盐城市', '苏州市', '泰州市', '镇江市', '连云港市'],
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0.12)'
            }
        },
        axisLabel: {
            margin: 10,
            color: '#e2e9ff',
            textStyle: {
                fontSize: 14
            },
        },
    }],
    yAxis: [{
        axisLabel: {
            formatter: '{value}',
            color: '#e2e9ff',
        },
        axisLine: {
            show: false
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0.12)'
            }
        }
    }],
    series: [{
        type: 'bar',
        data: [300, 450, 770, 203, 255, 188, 156,300, 450, 770, 203, 255, 188, ],
        barWidth: '20px',
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0,244,255,1)' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: 'rgba(0,77,167,1)' // 100% 处的颜色
                }], false),
                barBorderRadius: [30, 30, 30, 30],
                shadowColor: 'rgba(0,160,221,1)',
                shadowBlur: 4,
            }
        },
        label: {
            normal: {
                show: true,
                lineHeight: 13,
                width: 80,
                height: 10,
                backgroundColor: 'rgba(0,160,221,0.1)',
                borderRadius: 200,
                position: ['-8', '-30'],
                distance: 1,
                formatter: [
                    '    {d|●}',
                    ' {a|{c}}     \n',
                    '    {b|}'
                ].join(','),
                rich: {
                    d: {
                        color: '#3CDDCF',
                    },
                    a: {
                        color: '#fff',
                        align: 'center',
                    },
                    b: {
                        width: 1,
                        height: 20,
                        borderWidth: 1,
                        borderColor: '#234e6c',
                        align: 'left'
                    },
                }
            }
        }
    }]
};
      mapChart.setOption(option); //生成图表
    },
  map(){
          // 地图初始化
        AMapLoader.load({
        key: 'ea59c9dbda5ebf8b012385192f0708b5',
      }).then((AMap) => {
        // 地图对象类，封装了地图的属性设置、图层变更、事件交互等接口的类
        let map = new AMap.Map('map', {
          // 设置地图的显示样式
          mapStyle: "amap://styles/5ab2a81bebd9090246e216d6dc02d6c2",
          viewMode: '3D',    
          pitch: 60,    
          rotation: 11.4,    
          zoom: 18,    
          zooms:[3,20],  
          // 地图中心点坐标值
          center: [113.533247, 22.794298], 
          showIndoorMap: false,    
          features:['bg','road','building']
        })
        var object3Dlayer = new AMap.Object3DLayer();
        map.add(object3Dlayer);

        var sourceList = [{    
              url: 'static/module/scene.gltf', //    
              position: [113.524818,22.792584],    
              scale: 7.3,    
              height: 0
            },{    
              url: 'static/building_06/scene.gltf', //    
              position: [113.527976,22.796998],    
              scale: 7.3,    
              height: 0
          }];
          
          map.plugin(['AMap.GltfLoader'], function () {
            loadModel()
          })

          // 加载模型
      function loadModel () {
      var gltfObj = new AMap.GltfLoader()
      for (var i = 0; i < sourceList.length; i++) {
       // 逐个加载模型        
      (function (count) {
      var model = sourceList[count]
      gltfObj.load(model.url, function (gltfObj) {
        console.log('加载成功')
        gltfObj.setOption({
          position: new AMap.LngLat(model.position[0], model.position[1]), // 必须                    
          scale: model.scale, // 非必须，默认1                    
          height: model.height,  // 非必须，默认0                    
          scene: 0, // 非必须，默认0                
        })
        gltfObj.rotateX(90)
        gltfObj.rotateZ(0)
        object3Dlayer.add(gltfObj)
              })
            })(i)
          }
        }
       }).catch(e => {
        console.log(e)
      })
      }
  },
    
  mounted() {
    //加载loading图
    setInterval(()=>{
      this.cancelLoading()
    },800)
    this.getchart()
    setTimeout(() => {
    this.dotter_bar();
    //this.map()
    
  const scene = new THREE.Scene();

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);
const ambientLight = new THREE.AmbientLight(0xd4e7fd, 4);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xe8eaeb, 0.2);
directionalLight.position.set(0, 10, 5);
const directionalLight2 = directionalLight.clone();
directionalLight2.position.set(0, 10, -5);
const directionalLight3 = directionalLight.clone();
directionalLight3.position.set(5, 10, 0);
const directionalLight4 = directionalLight.clone();
directionalLight4.position.set(-5, 10, 0);
scene.add(directionalLight);
scene.add(directionalLight2);
scene.add(directionalLight3);
scene.add(directionalLight4);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 8;
camera.position.z = 8;

const labelRenderer = new CSS2DRenderer();
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.pointerEvents = "none";
labelRenderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("map").appendChild(labelRenderer.domElement);

const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("map").appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
};
animate();
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
});

const url = "static/jiangxi.json";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const map = createMap(data);
    map.scale.set(0.9, 0.9, 0.9);
    map.position.set(-5,-3,-6)
    scene.add(map);

   /* let intersect = null;
    window.addEventListener("pointerdown", (event) => {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster
        .intersectObjects(map.children)
        .filter((item) => item.object.type !== "Line");
      if (intersects.length > 0) {
        if (intersects[0].object.type === "Mesh") {
          if (intersect) isAplha(intersect, 1);
          intersect = intersects[0].object.parent;
          isAplha(intersect, 0.4);
        }
        if (intersects[0].object.type === "Sprite") {
          console.log(intersects[0].object);
        }
      } else {
        if (intersect) isAplha(intersect, 1);
      }
      function isAplha(intersect, opacity) {
        intersect.children.forEach((item) => {
          if (item.type === "Mesh") {
            item.material.opacity = opacity;
          }
        });
      }
    });
    */
  });
const offsetXY = d3.geoMercator();

const createMap = (data) => {
const map = new THREE.Object3D();
const center = data.features[0].properties.centroid;
offsetXY.center(center).translate([0, 0]);
data.features.forEach((feature) => {
  const unit = new THREE.Object3D();
  const { centroid, center, name } = feature.properties;
  const { coordinates, type } = feature.geometry;
  const point = centroid || center || [0, 0];

  const color = new THREE.Color(`hsl(
    ${233},
    ${Math.random() * 30 + 55}%,
    ${Math.random() * 30 + 55}%)`).getHex();
  const depth = Math.random() * 0.3 + 0.3;

  const label = createLabel(name, point, depth);
  const icon = createIcon(center, depth);

  coordinates.forEach((coordinate) => {
    if (type === "MultiPolygon") coordinate.forEach((item) => fn(item));
    if (type === "Polygon") fn(coordinate);

    function fn(coordinate) {
      unit.name = name;
      const mesh = createMesh(coordinate, color, depth);
      const line = createLine(coordinate, depth);
      unit.add(mesh, ...line);
    }
  });
  map.add(unit, label, icon);
  setCenter(map);
});
return map;
};
const createMesh = (data, color, depth) => {
const shape = new THREE.Shape();
data.forEach((item, idx) => {
  const [x, y] = offsetXY(item);

  if (idx === 0) shape.moveTo(x, -y);
  else shape.lineTo(x, -y);
});

const extrudeSettings = {
  depth: depth,
  bevelEnabled: false,
};
const materialSettings = {
  color: color,
  emissive: 0x000000,
  roughness: 0.45,
  metalness: 0.8,
  transparent: true,
  side: THREE.DoubleSide,
};
const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const material = new THREE.MeshStandardMaterial(materialSettings);
const mesh = new THREE.Mesh(geometry, material);

return mesh;
};
const createLine = (data, depth) => {
const points = [];
data.forEach((item) => {
  const [x, y] = offsetXY(item);
  points.push(new THREE.Vector3(x, -y, 0));
});
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const uplineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const downlineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

const upLine = new THREE.Line(lineGeometry, uplineMaterial);
const downLine = new THREE.Line(lineGeometry, downlineMaterial);
downLine.position.z = -0.0001;
upLine.position.z = depth + 0.0001;
return [upLine, downLine];
};
const createLabel = (name, point, depth) => {
const div = document.createElement("div");
div.style.color = "#fff";
div.style.fontSize = "12px";
div.style.textShadow = "1px 1px 2px #047cd6";
div.textContent = name;
const label = new CSS2DObject(div);
label.scale.set(0.01, 0.01, 0.01);
const [x, y] = offsetXY(point);
label.position.set(x, -y, depth);
return label;
};
const createIcon = (point, depth) => {
const map = new THREE.TextureLoader().load(url);
const material = new THREE.SpriteMaterial({
  map: map,
  transparent: true,
});
const sprite = new THREE.Sprite(material);
const [x, y] = offsetXY(point);
sprite.scale.set(0.3, 0.3, 0.3);

sprite.position.set(x, -y, depth + 0.2);
sprite.renderOrder = 1;

return sprite;
};
const setCenter = (map) => {
map.rotation.x = -Math.PI / 2;
const box = new THREE.Box3().setFromObject(map);
const center = box.getCenter(new THREE.Vector3());

const offset = [0, 0];
map.position.x = map.position.x - center.x - offset[0];
map.position.z = map.position.z - center.z - offset[1];
};
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

