<!-- 
添加moment组件
添加一张图片
使用scss 添加两个组件页面
一个图片文件
组件
Bingbar1
Bingbar2
liquidfillChart
添加一个字体文件
引入三张weathers图片
-->
<template>
  <div id="root">
    <div class="head" height="8vh">
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
            <el-breadcrumb-item :to="{ path: '/BigData' }" class="myColors"
              >项目概况</el-breadcrumb-item
            >
            <el-breadcrumb-item :to="{ path: '/BigData2' }"
              >设备概况</el-breadcrumb-item
            ><el-breadcrumb-item :to="{ path: '/BigData3' }"
              >物料管理</el-breadcrumb-item
            ><el-breadcrumb-item :to="{ path: '/BigData4.vue' }"
              >环境管理</el-breadcrumb-item
            >
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>
    <div class="left">
      <div class="leftcomtains" v-for="item in imformations" :key="item.id">
        <div class="leftNmae">
          <div class="leftImg">
            <img src="../assets/drag.png" alt="" />
          </div>
          {{ item.name }}
        </div>
        <div class="LDS">
          <div class="leftDetails">{{ item.details1 }}</div>
          <div class="leftDetails">{{ item.details2 }}</div>
          <div class="leftDetails">{{ item.details3 }}</div>
          <div class="leftDetails">{{ item.details4 }}</div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="centerImage"></div>
      <div class="centerDetails">
        <div class="projectProgress">
          <div class="PPN">
            <dv-decoration-11 style="width: 12vw; height: 6vh"
              >安全生产天数</dv-decoration-11
            >
          </div>
          <div class="PPD">900天</div>
          <div class="PP">
            <el-progress
              :percentage="80"
              :format="format"
              color="#f328ea"
              text-color="red"
              define-back-color="red"
            ></el-progress>
          </div>
        </div>
        <div class="liquidfillChart">
          <liquidfillChart :data="liquidfillChartData1"></liquidfillChart>
        </div>
        <div class="liquidfillChart">
          <liquidfillChart :data="liquidfillChartData2"></liquidfillChart>
        </div>
        <div class="liquidfillChart">
          <liquidfillChart :data="liquidfillChartData3"></liquidfillChart>
        </div>
        <div class="liquidfillChart">
          <liquidfillChart :data="liquidfillChartData4"></liquidfillChart>
        </div>
        <div class="liquidfillChart">
          <liquidfillChart :data="liquidfillChartData5"></liquidfillChart>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="rightContain1">
        <div class="rightTop">
          <div class="img">
            <img src="../assets/drag.png" alt="" />
          </div>
          <span>合作单位</span>
        </div>
        <div class="BingBarVue1">
          <BingBarVue1></BingBarVue1>
        </div>
        <div class="swiper" v-for="s in swipers" :key="s.id">
          <div class="swipweItem">
            <div class="colorCircle" :style="s.style"></div>
            <div class="swiperItem1">{{ s.detail }}</div>
            <div class="swiperItem2">{{ s.frequency }}</div>
            <div class="swiperItem3">{{ s.percentage }}</div>
          </div>
        </div>
      </div>
      <div class="rightContain2">
        <div class="leftTop">
          <div class="img">
            <img src="../assets/drag.png" alt="" />
          </div>
          <span>近24小时预警统计</span>
        </div>
        <div class="BingBarVue2"><BingBarVue2></BingBarVue2></div>
        <div class="capsuleDiagram">
          <dv-capsule-chart
            :config="config3"
            style="width: 16vw; height: 20vh"
          />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="rightContain1">
        <div class="top">当前天气</div>
        <div class="rightDetails">10°C</div>
        <div class="leftDetails">
          <img src="../assets/weathers/weather_1.png" alt="" />
        </div>
      </div>
      <div class="rightContain2">
        <div class="weathers" v-for="w in weathers" :key="w.id">
          <div class="weather">
            <span>{{ w.data }}</span>
            <span>{{ w.week }}</span>
            <span>{{ w.detail }}</span>
            <div class="image">
              <img :src="w.imageSrc" />
            </div>
            <span>{{ w.temperature }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "../../node_modules/moment";
import BingBarVue1 from "../components/gramComponents/BingBar1.vue";
import BingBarVue2 from "../components/gramComponents/BingBar2.vue";
import liquidfillChart from "../components/gramComponents/liquidfillChart.vue";
import qingtian from "../assets/weathers/weather_1.png";
import leizhengyu from "../assets/weathers/weather_5雷阵雨.png";
import duoyun from "../assets/weathers/weather_2多云.png";
import { setInterval } from "core-js";
import MapContainer from "@/components/MapContainer/MapContainer";

export default {
  data() {
    return {
      bcs: "/",
      weathers: [
        {
          id: 1,
          week: "星期六",
          data: "2024-3-2",
          detail: "晴天",
          imageSrc: qingtian,
          temperature: "2°~11°",
        },
        {
          id: 2,
          week: "星期天",
          data: "2024-3-3",
          detail: "多云",
          imageSrc: duoyun,
          temperature: "3°~15°",
        },
        {
          id: 3,
          week: "星期一",
          data: "2024-3-4",
          detail: "雷阵雨",
          imageSrc: leizhengyu,
          temperature: "12°~19°",
        },
        {
          id: 4,
          week: "星期二",
          data: "2024-3-5",
          detail: "雷阵雨",
          imageSrc: leizhengyu,
          temperature: "8°~18°",
        },
        {
          id: 5,
          week: "星期三",
          data: "2024-3-6",
          detail: "晴天",
          imageSrc: qingtian,
          temperature: "7°~13°",
        },
        {
          id: 6,
          week: "星期四·",
          data: "2024-3-7",
          detail: "多云",
          imageSrc: duoyun,
          temperature: "9°~15°",
        },
        {
          id: 7,
          week: "星期五",
          data: "2024-3-8",
          detail: "晴天",
          imageSrc: qingtian,
          temperature: "2°~11°",
        },
      ],
      config: {
        data: [55],
        shape: "round",
        colors: ["gray", "blue", "white"],
      },
      config3: {
        data: [
          {
            name: "特种设备预警",
            value: 9,
          },
          {
            name: "智能监控预警",
            value: 9,
          },
          {
            name: "公程机械预警",
            value: 7,
          },
          {
            name: "环境监控预警",
            value: 0,
          },
          {
            name: "安全帽预警",
            value: 0,
          },
        ],
        colors: ["#17cdf3", "#17cdf3", "#17cdf3", "#17cdf3", "#17cdf3"],
        showValue: true,
        unit: "次",
      },
      swipers: [
        {
          id: 1,
          detail: "专业分包",
          frequency: "1次",
          percentage: "20%",
          style: {
            backgroundColor: "#5c7bd9",
          },
        },
        {
          id: 2,
          detail: "设备分包",
          frequency: "1次",
          percentage: "20%",
          style: {
            backgroundColor: "#9fe080",
          },
        },
        {
          id: 3,
          detail: "材料分包",
          frequency: "1次",
          percentage: "20%",
          style: {
            backgroundColor: "#ffdc60",
          },
        },
        {
          id: 4,
          detail: "劳务分包",
          frequency: "1次",
          percentage: "20%",
          style: {
            backgroundColor: "#ff7070",
          },
        },
      ],
      timeNow: "2024-1-1 00:00:00",
      timer: false,
      imformations: [
        {
          id: 1,
          name: "项目概况",
          details1: "项目名称    智慧工地项目",
          details2: "项目编码    XXXXX",
          details3: "项目许可证  XXXXXXXX",
          details4: "项目造价    800000万",
        },
        {
          id: 2,
          name: "项目工期",
          details1: "开工日期    2021-9-8",
          details2: "竣工日期    2024-2-28",
          details3: "项目周期    30个月",
        },
        {
          id: 3,
          name: "责任主体",
          details1: "施工单位    NIT",
          details2: "监理单位    NIT",
        },
        {
          id: 4,
          name: "项目职位",
          details1: "项目经理    1    项目总工    1",
          details2: "项目书记    1    项目负责人  1",
        },
        {
          id: 5,
          name: "项目简历",
          details1:
            "该项目成立于2022年10月,项目负责人是李四,项目总工是王五,项目总工负责项目整体的管理,项目经理负责项目整体的协调,项目总工负责项目整体的协调,项目总工负责项目整体的协调,项目总工负责项目整体的协调,项目总工负责项目整体的协调,项目总工负责项目整体的协调,项目总工负责项目整体的协调,项目总工负责项目整体的协调",
          details2: "",
        },
      ],
      liquidfillChartData1: {
        series: [
          {
            type: "liquidFill",
            data: [0.5, 0.55],
            radius: "80%",
            label: {
              position: ["50%", "50%"],
              formatter: function () {
                return "在线\n\n工程设备\n\n3台";
              },
              fontSize: 12,
              color: "#3c77b6",
            },
            outline: {
              borderDistance: 1,
              itemStyle: {
                borderWidth: 1,
                borderColor: "#d4a20c",
                shadowBlur: 0,
              },
            },
            backgroundStyle: {
              color: "transparent",
              borderWidth: 0,
            },
            itemStyle: { color: "#d4a20c" },
          },
        ],
      },
      liquidfillChartData2: {
        series: [
          {
            type: "liquidFill",
            data: [0.5, 0.55],
            radius: "80%",
            label: {
              position: ["50%", "50%"],
              formatter: function () {
                return "出勤\n\n在岗人数\n\n12人";
              },
              fontSize: 12,
              color: "#3c77b6",
            },
            outline: {
              borderDistance: 1,
              itemStyle: {
                borderWidth: 1,
                borderColor: "#64c17b",
                shadowBlur: 0,
              },
            },
            backgroundStyle: {
              color: "transparent",
              borderWidth: 0,
            },
            itemStyle: { color: "#64c17b" },
          },
        ],
      },
      liquidfillChartData3: {
        series: [
          {
            type: "liquidFill",
            data: [0.5, 0.55],
            radius: "80%",
            label: {
              position: ["50%", "50%"],
              formatter: function () {
                return "在线\n\n特种设备\n\n6台";
              },
              fontSize: 12,
              color: "#3c77b6",
            },
            outline: {
              borderDistance: 1,
              itemStyle: {
                borderWidth: 1,
                borderColor: "#c9c76d",
              },
            },
            backgroundStyle: {
              color: "transparent",
              borderWidth: 0,
            },
            itemStyle: { color: "#c9c76d" },
          },
        ],
      },
      liquidfillChartData4: {
        series: [
          {
            type: "liquidFill",
            data: [0.5, 0.55],
            radius: "80%",
            label: {
              position: ["50%", "50%"],
              formatter: function () {
                return "在线\n\n环境设备\n\n3台";
              },
              fontSize: 12,
              color: "#3c77b6",
            },
            outline: {
              borderDistance: 1,
              itemStyle: {
                borderWidth: 1,
                borderColor: "#22ab21",
                shadowBlur: 0,
              },
            },
            backgroundStyle: {
              color: "transparent",
              borderWidth: 0,
            },
            itemStyle: { color: "#22ab21" },
          },
        ],
      },
      liquidfillChartData5: {
        series: [
          {
            type: "liquidFill",
            data: [0.5, 0.55],
            radius: "80%",
            label: {
              position: ["50%", "50%"],
              formatter: function () {
                return "在线\n\n视频设备\n\n3台";
              },
              fontSize: 12,
              color: "#3c77b6",
            },
            outline: {
              borderDistance: 1,
              itemStyle: {
                borderWidth: 1,
                borderColor: "#28c3df",
                shadowBlur: 0,
              },
            },
            backgroundStyle: {
              color: "transparent",
              borderColor: "#28c3df",
              borderWidth: 0,
            },
            itemStyle: { color: "#28c3df" },
          },
        ],
      },
    };
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
  },
  mounted() {
    if (!this.timer) {
      console.log("计时器已打开");
      const timer = setInterval(() => {
        this.timeNow = moment().format("YYYY-MM-DD HH:mm:ss");
      }, 1000);
      this.timer = true;
    }
  },
  beforeDestroy() {
    if (this.timer) {
      console.log("计时器已关闭");
      clearInterval(this.timer);
      this.timer = false;
    }
  },
  components: { BingBarVue1, BingBarVue2, liquidfillChart, MapContainer },
};
</script>
<style lang="scss">
#root {
  background: url(../assets/others/back.png);
  background-size: cover; //背景尺
  background-position: center center; //背景位置
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  color: #aabde6;
  img {
    height: 100%;
    width: 100%;
  }
  div {
    border-radius: 2px;
  }
  .head {
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
  .left {
    position: absolute;
    left: 1vw;
    width: 16vw;
    height: 85vh;
    overflow: hidden;
    font-size: 1.8vh;
    .leftcomtains {
      width: 100%;
      height: 16vh;
      border: 1px #4c7fc2 solid;
      margin-bottom: 1vh;
      text-indent: 12px;
      .leftNmae {
        height: 3vh;
        width: 16vw;
        line-height: 3vh;
        background-image: linear-gradient(to right, #0472e2, #0e234b);
        .leftImg {
          height: 100%;
          width: 1vw;
          float: left;
        }
      }
      .LDS {
        overflow: scroll;
        // 滚动条优化
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          display: none;
        }
        .leftDetails {
          height: 3vh;
          line-height: 3vh;
        }
      }
    }
  }
  .center {
    left: 18vw;
    width: 64vw;
    height: 70vh;
    position: absolute;
    .centerImage {
      width: 64vw;
      height: 50vh;
      background: url("../assets/others/centerImage.png");
      background-size: cover; //背景尺寸
      border: #aabde6 solid 1px;
    }
    .centerDetails {
      margin-top: 12px;
      .projectProgress {
        width: 12vw;
        height: 16vh;
        border: gray solid 1px;
        float: left;
        background-color: #1e3562;
        border-radius: 12px;
        .PPN {
          width: 100%;
          height: 6vh;
        }
        .PPD {
          color: #f328ea;
          width: 100%;
          text-align: center;
          height: 5vh;
          line-height: 5vh;
          font-size: 24px;
        }
        .PP {
          width: 80%;
          height: 2vh;
          margin-left: 2.5vw;
        }
      }
      .liquidfillChart {
        width: 10vw;
        height: 16vh;
        float: right;
      }
    }
  }
  .right {
    right: 1vw;
    position: absolute;
    width: 16vw;
    height: 90vh;
    .rightContain1 {
      height: 40vh;
      width: 100%;
      border: 1px #4c7fc2 solid;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 1vh;
      .BingBarVue1 {
        width: 16vw;
        height: 20vh;
      }
      .swiper {
        height: 4vh;
        width: 100%;
        border: transparent solid 1px;
        line-height: 4vh;
        font-size: 12px;
        color: #aabde6;
        .colorCircle {
          height: 1vh;
          float: left;
          border-radius: 1vh;
          width: 1vh;
          margin: 1.5vh 2% 1.5vh 5%;
        }
        .swiperItem1 {
          height: 4vh;
          float: left;
          width: 40%;
        }
        .swiperItem2 {
          height: 4vh;
          float: left;
          width: 20%;
        }
        .swiperItem3 {
          height: 4vh;
          float: left;
          width: 20%;
        }
      }
      .rightTop {
        height: 3vh;
        width: 100%;
        background-image: linear-gradient(to right, #0472e2, #0e234b);
        .img {
          height: 3vh;
          width: 1vw;
          float: left;
          margin-left: 1vw;
        }
      }
    }
    .rightContain2 {
      height: 43vh;
      width: 100%;
      border: 1px #4c7fc2 solid;
      border-radius: 8px;
      overflow: hidden;
      .leftTop {
        height: 3vh;
        width: 100%;
        background-image: linear-gradient(to right, #0472e2, #0e234b);
        .img {
          height: 3vh;
          width: 1vw;
          float: left;
          margin-left: 1vw;
        }
      }
      .capsuleDiagram {
        height: 20vh;
        width: 100%;
      }
      .BingBarVue2 {
        width: 100%;
        height: 20vh;
      }
    }
  }
  .bottom {
    position: absolute;
    border: 1px #4c7fc2 solid;
    top: 80vh;
    left: 18vw;
    height: 12vh;
    width: 64vw;
    color: #aabde6;
    .rightContain1 {
      width: 10vw;
      float: left;
      height: 12vh;
      .top {
        height: 5vh;
        text-align: center;
        line-height: 5vh;
      }
      .leftDetails {
        float: left;
        width: 2vw;
        height: 4vh;
        float: right;
        margin-right: 4px;
      }
      .rightDetails {
        font-size: 28px;
        line-height: 4vh;
        float: left;
        width: 5vw;
        height: 4vh;
        float: right;
        line-height: 4vh;
        text-indent: 4px;
      }
    }
    .rightContain2 {
      height: 100%;
      width: 52.5vw;
      float: right;
      .weathers {
        width: 100%;
        .weather {
          width: 6.5vw;
          float: left;
          line-height: 4vh;
          margin-left: 1vw;
          span {
            display: block;
            height: 2vh;
            text-align: center;
            font-size: 12px;
          }
          .image {
            height: 2vh;
            width: 1vw;
            margin: 0 auto;
          }
        }
      }
    }
  }
}
</style>
