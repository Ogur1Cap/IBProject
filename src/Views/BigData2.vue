<template>
  <el-container>
    <el-header height="8vh">
      <el-row style="height: 4vh">
        <el-col :span="8" class="time">{{ timeNow }}</el-col>
        <el-col :span="8" class="title"
          ><dv-decoration-7>智慧工地管理系统</dv-decoration-7></el-col
        >
        <el-col :span="8"></el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="height: 2vh">
          <el-breadcrumb separator="/ " class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/home' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item :to="{ path: '/BigData' }"
              >项目概况</el-breadcrumb-item
            >
            <el-breadcrumb-item :to="{ path: '/BigData2' }" class="myColors"
              >设备概况</el-breadcrumb-item
            ><el-breadcrumb-item :to="{ path: '/BigData3' }"
              >物料管理</el-breadcrumb-item
            ><el-breadcrumb-item :to="{ path: '/BigData4.vue' }"
              >环境管理</el-breadcrumb-item
            >
          </el-breadcrumb>
        </el-col>
      </el-row>
    </el-header>
    <el-main height="60vh">
      <el-row :gutter="20">
        <el-col :span="5" style="height: 60vh">
          <div class="gram1">
            <div class="gram">
              <div class="gramTop">
                <div class="img">
                  <img src="../assets/drag.png" alt="" />
                </div>
                <span>在线设备</span>
              </div>
              <div class="componentsGram1">
                <gram1></gram1>
              </div>
              <div class="swipers">
                <div class="swiper" v-for="s in swipers1" :key="s.id">
                  <div class="swipweItem">
                    <div class="colorCircle" :style="s.style"></div>
                    <div class="swiperItem1">{{ s.detail }}</div>
                    <div class="swiperItem2">{{ s.frequency }}</div>
                    <div class="swiperItem3">{{ s.percentage }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="gram">
            <div class="gramTop">
              <div class="img">
                <img src="../assets/drag.png" alt="" />
              </div>
              <span>设备指数</span>
            </div>
            <div class="componentsGram2">
              <gram2></gram2>
            </div>
          </div>
        </el-col>
        <el-col :span="14" style="height: 60vh" class="middleMap">
          <MapContainer></MapContainer
        ></el-col>
        <el-col :span="5" style="height: 60vh"
          ><div class="gram1 gram">
            <div class="gramTop">
              <div class="img">
                <img src="../assets/drag.png" alt="" />
              </div>
              <span>预警统计</span>
            </div>
            <div class="states">
              <div
                class="state"
                @click="stateChange(0)"
                :style="clickOrNot1[0]"
              >
                全部
              </div>
              <div
                class="state"
                @click="stateChange(1)"
                :style="clickOrNot1[1]"
              >
                工作
              </div>
              <div
                class="state"
                @click="stateChange(2)"
                :style="clickOrNot1[2]"
              >
                宕机
              </div>
              <div
                class="state"
                @click="stateChange(3)"
                :style="clickOrNot1[3]"
              >
                停机
              </div>
              <div
                class="state"
                @click="stateChange(4)"
                :style="clickOrNot1[4]"
              >
                离线
              </div>
            </div>
            <div class="componentsGram1">
              <gram3></gram3>
            </div>
            <div class="swipers">
              <div class="swiper" v-for="s in swipersChange0" :key="s.id">
                <div class="swipweItem">
                  <div class="colorCircle" :style="s.style"></div>
                  <div class="swiperItem1">{{ s.detail }}</div>
                  <div class="swiperItem2">{{ s.frequency }}</div>
                  <div class="swiperItem3">{{ s.percentage }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="gram2 gram">
            <div class="gramTop">
              <div class="img">
                <img src="../assets/drag.png" alt="" />
              </div>
              <span>实时状态</span>
              <span style="color: red; margin-left: 1.2vw"
                >总预警次数:{{ totalFrequency }}次</span
              >
            </div>
            <div class="swipers">
              <div class="swiper" v-for="s in swipers2" :key="s.id">
                <div class="swipweItem">
                  <div class="colorCircle" :style="s.style"></div>
                  <div class="swiperItem1">{{ s.detail }}</div>
                  <div class="swiperItem2">{{ s.frequency }}</div>
                  <div class="swiperItem3">{{ s.percentage }}</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer height="24vh">
      <el-row :gutter="12">
        <el-col :span="12" style="height: 24vh" class="bottomData">
          <div class="gram1 gram">
            <div class="gramTop">
              <div class="img">
                <img src="../assets/drag.png" alt="" />
              </div>
              <span>设备数据(日均)</span>
            </div>
          </div>
          <div class="states">
            <div class="state" @click="colorChange(0)" :style="clickOrNot2[0]">
              工作效率
            </div>
            <div class="state" @click="colorChange(1)" :style="clickOrNot2[1]">
              油耗量
            </div>
            <div class="state" @click="colorChange(2)" :style="clickOrNot2[2]">
              开工率
            </div>
            <div class="state" @click="colorChange(3)" :style="clickOrNot2[3]">
              工作时长
            </div>
          </div>
          <div class="componentsGram4">
            <gram4 :data="option"></gram4>
          </div>
        </el-col>
        <el-col :span="12" style="height: 24vh"
          ><div class="gram1 gram">
            <div class="gramTop">
              <div class="img">
                <img src="../assets/drag.png" alt="" />
              </div>
              <span>实时状态</span>
            </div>
          </div>
          <div class="datas">
            <div class="dataItems">
              <div v-for="o in list[0]" :key="o.id" class="datasItem">
                <div class="data">{{ o.value }}</div>
              </div>
            </div>
            <div class="dataItems">
              <div v-for="o in list[1]" :key="o.id" class="datasItem">
                <div class="data">{{ o.value }}</div>
              </div>
            </div>
            <div class="dataItems">
              <div v-for="o in list[2]" :key="o.id" class="datasItem">
                <div class="data">{{ o.value }}</div>
              </div>
            </div>
            <div class="dataItems">
              <div v-for="o in list[3]" :key="o.id" class="datasItem">
                <div class="data">{{ o.value }}</div>
              </div>
            </div>
            <div class="dataItems">
              <div v-for="o in list[4]" :key="o.id" class="datasItem">
                <div class="data">{{ o.value }}</div>
              </div>
            </div>
            <div class="dataItems">
              <div v-for="o in list[5]" :key="o.id" class="datasItem">
                <div class="data">{{ o.value }}</div>
              </div>
            </div>
            <div class="dataItems">
              <div v-for="o in list[6]" :key="o.id" class="datasItem">
                <div class="data">{{ o.value }}</div>
              </div>
            </div>
            <div class="dataItems">
              <div v-for="o in list[7]" :key="o.id" class="datasItem">
                <div class="data">{{ o.value }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>
<script>
import moment from "moment";
import gram1 from "../components/gramComponents/gram1.vue";
import gram2 from "../components/gramComponents/gram2.vue";
import gram3 from "../components/gramComponents/gram3.vue";
import gram4 from "../components/gramComponents/gram4.vue";
import MapContainer from "@/components/MapContainer/MapContainer";
export default {
  name: "BigData2",
  data() {
    return {
      option: "",
      option1: {
        xAxis: {
          type: "category",
          data: [
            "11-13",
            "11-14",
            "11-15",
            "11-16",
            "11-17",
            "11-18",
            "11-19",
            "11-20",
          ],
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [60, 50, 40, 60, 80, 70, 80],
            type: "line",
            areaStyle: {},
          },
        ],
      },
      option2: {
        xAxis: {
          type: "category",
          data: [
            "11-13",
            "11-14",
            "11-15",
            "11-16",
            "11-17",
            "11-18",
            "11-19",
            "11-20",
          ],
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [10, 30, 40, 60, 80, 82, 90],
            type: "line",
            areaStyle: {},
          },
        ],
      },
      option3: {
        xAxis: {
          type: "category",
          data: [
            "11-13",
            "11-14",
            "11-15",
            "11-16",
            "11-17",
            "11-18",
            "11-19",
            "11-20",
          ],
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [60, 50, 40, 60, 80, 70, 80],
            type: "line",
            areaStyle: {},
          },
        ],
      },
      option4: {
        xAxis: {
          type: "category",
          data: [
            "11-13",
            "11-14",
            "11-15",
            "11-16",
            "11-17",
            "11-18",
            "11-19",
            "11-20",
          ],
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [60, 50, 40, 60, 80, 70, 80],
            type: "line",
            areaStyle: {},
          },
        ],
      },
      list: [
        [
          {
            id: 1,
            value: "时间",
          },
          {
            id: 2,
            value: "3-1 10:20:20",
          },
          {
            id: 3,
            value: "3-1 10:20:20",
          },
          {
            id: 4,
            value: "3-1 10:20:20",
          },
          {
            id: 5,
            value: "3-1 10:20:20",
          },
          {
            id: 6,
            value: "3-1 10:20:20",
          },
          {
            id: 7,
            value: "3-1 10:20:20",
          },
        ],
        [
          {
            id: 1,
            value: "编号",
          },
          {
            id: 2,
            value: "HG110",
          },
          {
            id: 3,
            value: "HG110",
          },
          {
            id: 4,
            value: "HG110",
          },
          {
            id: 5,
            value: "HG110",
          },
          {
            id: 6,
            value: "HG110",
          },
          {
            id: 7,
            value: "HG110",
          },
        ],
        [
          {
            id: 1,
            value: "类型",
          },
          {
            id: 2,
            value: "沥青机",
          },
          {
            id: 3,
            value: "沥青机",
          },
          {
            id: 4,
            value: "沥青机",
          },
          {
            id: 5,
            value: "沥青机",
          },
          {
            id: 6,
            value: "沥青机",
          },
        ],
        [
          {
            id: 1,
            value: "操作手",
          },
          {
            id: 2,
            value: "杨坤坤",
          },
          {
            id: 3,
            value: "杨坤坤",
          },
          {
            id: 4,
            value: "杨坤坤",
          },
          {
            id: 5,
            value: "杨坤坤",
          },
          {
            id: 6,
            value: "杨坤坤",
          },
          {
            id: 7,
            value: "杨坤坤",
          },
        ],
        [
          {
            id: 1,
            value: "实时油量",
          },
          {
            id: 2,
            value: "80%",
          },
          {
            id: 3,
            value: "80%",
          },
          {
            id: 4,
            value: "80%",
          },
          {
            id: 5,
            value: "80%",
          },
          {
            id: 6,
            value: "80%",
          },
          {
            id: 7,
            value: "80%",
          },
        ],
        [
          {
            id: 1,
            value: "状态",
          },
          {
            id: 2,
            value: "工作",
          },
          {
            id: 3,
            value: "工作",
          },
          {
            id: 4,
            value: "停机",
          },
          {
            id: 5,
            value: "离线",
          },
          {
            id: 6,
            value: "离线",
          },
          {
            id: 7,
            value: "离线",
          },
        ],
        [
          {
            id: 1,
            value: "持续时长",
          },
          {
            id: 2,
            value: "01小时02分36秒",
          },
          {
            id: 3,
            value: "01小时02分36秒",
          },
          {
            id: 4,
            value: "01小时02分36秒",
          },
          {
            id: 5,
            value: "01小时02分36秒",
          },
          {
            id: 6,
            value: "01小时02分36秒",
          },
          {
            id: 7,
            value: "01小时02分36秒",
          },
        ],
        [
          {
            id: 1,
            value: "今日开机时长",
          },
          {
            id: 2,
            value: "1h",
          },
          {
            id: 3,
            value: "1h",
          },
          {
            id: 4,
            value: "1h",
          },
          {
            id: 5,
            value: "1h",
          },
          {
            id: 6,
            value: "1h",
          },
          {
            id: 7,
            value: "1h",
          },
        ],
      ],
      BCC: "",
      cC: "",
      clickOrNot1: [
        {
          backgroundColor: "#0671e1",
        },
        {
          backgroundColor: "transparency",
        },
        {
          backgroundColor: "transparency",
        },
        {
          backgroundColor: "transparency",
        },
        {
          backgroundColor: "transparency",
        },
      ],
      clickOrNot2: [
        {
          backgroundColor: "#0671e1",
        },
        {
          backgroundColor: "transparency",
        },
        {
          backgroundColor: "transparency",
        },
        {
          backgroundColor: "transparency",
        },
      ],
      swipers1: [
        {
          id: 1,
          detail: "沥青机",
          frequency: "1台",
          percentage: "16.7%",
          style: {
            backgroundColor: "#5c7bd9",
          },
        },
        {
          id: 2,
          detail: "装载机",
          frequency: "1台",
          percentage: "16.7%",
          style: {
            backgroundColor: "#9fe080",
          },
        },
        {
          id: 3,
          detail: "挖掘机",
          frequency: "4台",
          percentage: "66.7%",
          style: {
            backgroundColor: "#ffdc60",
          },
        },
      ],
      swipers2: [
        {
          id: 1,
          detail: "总宕机数",
          frequency: 0,
          style: {
            backgroundColor: "#5c7bd9",
          },
        },
        {
          id: 2,
          detail: "出区域预警次数",
          frequency: 0,
          style: {
            backgroundColor: "#9fe080",
          },
        },
        {
          id: 3,
          detail: "停机预警数",
          frequency: 0,
          style: {
            backgroundColor: "#ffdc60",
          },
        },
        {
          id: 4,
          detail: "超速预警数",
          frequency: 0,
          style: {
            backgroundColor: "#963FD5",
          },
        },
        {
          id: 5,
          detail: "发动机预警数",
          frequency: 0,
          style: {
            backgroundColor: "#FF1E00",
          },
        },
        {
          id: 6,
          detail: "离线数",
          frequency: 0,
          style: {
            backgroundColor: "#FFD300",
          },
        },
        {
          id: 7,
          detail: "撞击预警数",
          frequency: 0,
          style: {
            backgroundColor: "#70E500",
          },
        },
        {
          id: 8,
          detail: "引擎预警数",
          frequency: 3,
          style: {
            backgroundColor: "#0A64A4",
          },
        },
        {
          id: 9,
          detail: "内燃机预警数",
          frequency: 1,
          style: {
            backgroundColor: "#3914AF",
          },
        },
      ],
      swipersChange0: [],
      swipersChange1: [
        {
          id: 1,
          detail: "工作",
          frequency: "2",
          percentage: "33.3%",
          style: {
            backgroundColor: "#5c7bd9",
          },
        },
        {
          id: 2,
          detail: "宕机",
          frequency: "0",
          percentage: "0.0%",
          style: {
            backgroundColor: "#9fe080",
          },
        },
        {
          id: 3,
          detail: "停机",
          frequency: "1",
          percentage: "16.7%",
          style: {
            backgroundColor: "#ffdc60",
          },
        },
        {
          id: 4,
          detail: "离线",
          frequency: "3",
          percentage: "50.0%",
          style: {
            backgroundColor: "#ff7070",
          },
        },
      ],
      swipersChange2: [
        {
          id: 1,
          detail: "工作",
          frequency: "2",
          percentage: "33.3%",
          style: {
            backgroundColor: "#5c7bd9",
          },
        },
      ],
      swipersChange3: [
        {
          id: 2,
          detail: "宕机",
          frequency: "0",
          percentage: "0.0%",
          style: {
            backgroundColor: "#9fe080",
          },
        },
      ],
      swipersChange4: [
        {
          id: 3,
          detail: "停机",
          frequency: "1",
          percentage: "16.7%",
          style: {
            backgroundColor: "#ffdc60",
          },
        },
      ],
      swipersChange5: [
        {
          id: 4,
          detail: "离线",
          frequency: "3",
          percentage: "50.0%",
          style: {
            backgroundColor: "#ff7070",
          },
        },
      ],
      datas: [
        {
          id: 1,
          time: "",
          orders: "",
          type: "",
          opertter: "",
          oilNumber: "",
          stuation: "",
          time: "",
          timeToday: "",
        },
      ],
      gram1Detail: [
        {
          id: 1,
          colors: {
            backgroundColor: "#f0e775",
          },
          name: "沥青机",
          numbers: "一台",
          percentage: "16.7%",
        },
        {
          id: 2,
          colors: {
            backgroundColor: "#21b6f1",
          },
          name: "装载机",
          numbers: "一台",
          percentage: "16.7%",
        },
      ],
      timeNow: "2024-1-1 00:00:00",
      timer: false,
      totalFrequency: 0,
    };
  },
  mounted() {
    this.calculateTotalFrequency();
    this.swipersChange0 = this.swipersChange1;
    if (!this.timer) {
      console.log("计时器已打开");
      const timer = setInterval(() => {
        this.timeNow = moment().format("YYYY-MM-DD HH:mm:ss");
      }, 1000);
      this.timer = true;
    }
    this.BCC = function name(e) {
      for (let i = 0; i < 5; i++) {
        if (e == i) {
          this.clickOrNot1[i] = {
            backgroundColor: "#0671e1",
          };
        } else {
          this.clickOrNot1[i] = {
            backgroundColor: "transparent",
          };
        }
      }
    };
    this.cC = function name(e) {
      this.clickOrNot2[e] = { backgroundColor: "#0671e1" };
      for (var i = 0; i <= 3; i++) {
        if (i !== e) {
          this.clickOrNot2[i] = { backgroundColor: "transparent" };
        }
      }
    };
  },
  beforeDestroy() {
    if (this.timer) {
      console.log("计时器已关闭");
      clearInterval(this.timer);
      this.timer = false;
    }
  },
  methods: {
    colorChange(e) {
      this.cC(e);
    },
    calculateTotalFrequency() {
      this.totalFrequency = this.swipers2.reduce(
        (acc, item) => acc + item.frequency,
        0
      );
    },

    stateChange(e) {
      this.BCC(e);
      switch (e) {
        case 0:
          this.swipersChange0 = this.swipersChange1;
          break;
        case 1:
          this.swipersChange0 = this.swipersChange2;
          break;
        case 2:
          this.swipersChange0 = this.swipersChange3;
          break;
        case 3:
          this.swipersChange0 = this.swipersChange4;
          break;
        case 4:
          this.swipersChange0 = this.swipersChange5;
          break;
        default:
          break;
      }
    },
  },
  components: { gram1, gram2, gram3, gram4, MapContainer },
};
</script>
<style lang="scss">
.el-container {
  background-image: url("../assets/LoginBack.jpg");
  background: url(../assets/back2.png);
  background-size: cover;
  background-position: center center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  color: #aabde6;
  position: relative;
  .el-row {
    .el-col {
    }
  }
  img {
    height: 100%;
    width: 100%;
  }
  .gram {
    width: 98%;
    border: 1px #4c7fc2 solid;
    text-indent: 12px;
    overflow: hidden;
    margin-bottom: 1vh;
    height: 3vh;
    .gramTop {
      height: 3vh;
      background-image: linear-gradient(to right, #0472e2, #0e234b);
      .img {
        height: 100%;
        width: 1vw;
        float: left;
      }
    }
    span {
      line-height: 3vh;
    }
  }
  .el-header {
    padding-left: 2vw;
    position: relative;
    .time {
      font-size: 3vh;
      letter-spacing: 4px;
      font-style: italic;
      font-family: "UnidreamLED";
      color: #609ec6;
    }
    .title {
      text-align: center;
      font-size: 4vh;
      font-style: italic;
      margin-top: 1vh;
      color: #d1d8d6;
    }
    .breadcrumb {
      position: absolute;
      top: 0;
      .el-breadcrumb__inner {
        color: gray;
        font-size: 18px;
        font-weight: 400;
        padding-right: 1vw;
      }
      .myColors {
        .el-breadcrumb__inner {
          color: #aabde6 !important;
        }
      }
    }
  }
  .el-main {
    padding-top: 0;
    .gram {
      height: 28vh;
    }
    .gram1 {
      .componentsGram1 {
        height: 30vh;
        width: 10vw;
        float: left;
      }
      .swipers {
        float: left;
        height: 30vh;
        width: 8vw;
        font-size: 0.5vw;
        padding-top: 3vh;
        .swiper {
          height: 4vh;
          line-height: 4vh;
          .colorCircle {
            height: 1vh;
            float: left;
            border-radius: 1vh;
            width: 1vh;
            margin: 1.5vh 1vh 1.5vh 1vh;
          }
          .swiperItem1 {
            height: 4vh;
            float: left;
          }
          .swiperItem2 {
            height: 4vh;
            float: left;
          }
          .swiperItem3 {
            height: 4vh;
            float: left;
          }
        }
      }
      .states {
        border: #aabde6 solid 1px;
        border-radius: 2vw;
        height: 3vh;
        line-height: 3vh;
        margin: 1vh auto;
        width: 16vw;
        overflow: hidden;
        .state {
          float: left;
          width: 3.2vw;
        }
      }
    }
    .gram2 {
      .componentsGram2 {
        border: red solid 1px;
      }
      .swipers {
        height: 24vh;
        width: 100%;
        padding-top: 2vh;
        overflow: scroll;
        // 滚动条优化
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          display: none;
        }
        .swiper {
          border-bottom: 1px #76829d solid;
          height: 4vh;
          line-height: 4vh;
          width: 96%;
          margin: 0 auto;
          .colorCircle {
            height: 1vh;
            float: left;
            border-radius: 1vh;
            width: 1vh;
            margin: 1.5vh 1vh 1.5vh 1vh;
          }
          .swiperItem1 {
            height: 4vh;
            float: left;
            width: 48%;
          }
          .swiperItem2 {
            height: 4vh;
            float: left;
          }
        }
      }
    }
    .middleMap {
      background-size: cover;
      background-position: center center;
      padding: 1vh;
      overflow: hidden;
    }
  }
  .el-footer {
    .bottomData {
      position: relative;
      .states {
        border: #aabde6 solid 1px;
        border-radius: 2vw;
        height: 3vh;
        line-height: 3vh;
        margin: 1vh auto;
        width: 16vw;
        overflow: hidden;
        position: absolute;
        right: 10vw;
        z-index: 12;
        .state {
          float: left;
          width: 4vw;
          height: 100%;
          text-align: center;
        }
      }
      .componentsGram4 {
        left: 0vw;
        top: 4vh;
        position: absolute;
        height: 24vh;
        width: 100%;
        z-index: 0;
      }
    }
    .datas {
      height: 24vh;
      width: 100%;
      overflow: scroll;
      // 滚动条优化
      overflow-y: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
      .dataItems {
        height: 24vh;
        width: 12%;
        font-size: 10px;
        float: left;
        text-indent: 8px;
        .datasItem {
          height: 2vh;
          line-height: 2vh;
          border-bottom: #0472e2 1px solid;
        }
      }
    }
  }
}
</style>
