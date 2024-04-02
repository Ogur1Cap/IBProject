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
            <el-breadcrumb-item :to="{ path: '/BigData2' }"
              >设备概况</el-breadcrumb-item
            ><el-breadcrumb-item :to="{ path: '/BigData3' }"
              >物料管理</el-breadcrumb-item
            ><el-breadcrumb-item
              :to="{ path: '/BigData4.vue' }"
              class="myColors"
              >环境管理</el-breadcrumb-item
            >
          </el-breadcrumb>
        </el-col>
      </el-row>
    </el-header>
    <el-main height="42vh">
      <div class="locations">
        <div
          class="location"
          v-for="l in locations"
          :key="l.id"
          :style="l.style"
          @click="ColorChange(l.id)"
        >
          {{ l.location }}
        </div>
      </div>
      <div class="zazhi" v-for="zz in zazhis" :key="zz.id">
        <div class="zazhiImg">
          <img :src="zz.imgSRc" alt="" />
        </div>
        <span class="zazhiItem1">{{ zz.item1 }}</span>
        <span class="zazhiItem2">{{ zz.item2 }}</span>
        <span class="zazhiItem3">{{ zz.item3 }}</span>
      </div>
      <div class="gram">
        <div class="gramTop">
          <div class="img">
            <img src="../assets/drag.png" alt="" />
          </div>
          <span>近24小时数据分析</span>
        </div>
        <div class="componentGram1"><BD4Gram1></BD4Gram1></div>
        <div class="componentGram2"><BD4Gram2></BD4Gram2>></div>
        <div class="swipers">
          <div class="swiper" v-for="s in swipers" :key="s.id">
            <div class="swipweItem">
              <div class="colorCircle" :style="s.style"></div>
              <div class="swiperItem1">{{ s.detail }}</div>
              <div class="swiperItem3">{{ s.percentage }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer height="42vh">
      <div class="footer">
        <div class="footerGram1"><BD4Gram3></BD4Gram3></div>
        <div class="footerGram2"><BD4Gram4></BD4Gram4></div>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
import moment from "moment";
import pm from "../assets/environmentImg/pm2.5.png";
import noise from "../assets/environmentImg/noise.png";
import temperature from "../assets/environmentImg/temperature.png";
import humidity from "../assets/environmentImg/humidity.png";
import windSpeed from "../assets/environmentImg/windSpeed.png";
import wind from "../assets/environmentImg/wind.png";
import TSP from "../assets/environmentImg/TSP.png";
import BD4Gram1 from "../components/gramComponents/BD4Gram1.vue";
import BD4Gram2 from "../components/gramComponents/BD4Gram2.vue";
import BD4Gram3 from "../components/gramComponents/BD4Gram3.vue";
import BD4Gram4 from "../components/gramComponents/BD4Gram4.vue";
export default {
  name: "BigData4",
  data() {
    return {
      timeNow: "2024-1-1 00:00:00",
      swipers: [
        {
          id: 1,
          detail: "PM2.5",
          percentage: "33.3%",
          style: {
            backgroundColor: "#5c7bd9",
          },
        },
        {
          id: 2,
          detail: "噪音",
          percentage: "16.7%",
          style: {
            backgroundColor: "#9fe080",
          },
        },
        {
          id: 3,
          detail: "温度",
          percentage: "8.3%",
          style: {
            backgroundColor: "#ffdc60",
          },
        },
        {
          id: 4,
          detail: "湿度",
          percentage: "8.3%",
          style: {
            backgroundColor: "#ee6666",
          },
        },
        {
          id: 5,
          detail: "风速",
          percentage: "16.7%",
          style: {
            backgroundColor: "#73c0de",
          },
        },
        {
          id: 6,
          detail: "风力",
          percentage: "8.3%",
          style: {
            backgroundColor: "#3ba272",
          },
        },
        {
          id: 7,
          detail: "TSP",
          percentage: "8.3%",
          style: {
            backgroundColor: "#fc8452",
          },
        },
      ],
      zazhis: [
        {
          id: 1,
          imgSRc: pm,
          item1: "PM2.5",
          item2: "87",
          item3: "ug/㎡",
        },
        {
          id: 2,
          imgSRc: noise,
          item1: "噪音",
          item2: "60",
          item3: "db",
        },
        {
          id: 3,
          imgSRc: temperature,
          item1: "温度",
          item2: "30",
          item3: "°C",
        },
        {
          id: 4,
          imgSRc: humidity,
          item1: "湿度",
          item2: "50",
          item3: "%",
        },
        {
          id: 5,
          imgSRc: windSpeed,
          item1: "风速",
          item2: "2.0",
          item3: "m/s",
        },
        {
          id: 6,
          imgSRc: wind,
          item1: "风向风力",
          item2: "w/2",
          item3: "级",
        },
        {
          id: 7,
          imgSRc: TSP,
          item1: "TSP",
          item2: "120",
          item3: "ug/m",
        },
      ],
      locations: [
        {
          id: 0,
          location: "地点1",
          style: {
            color: "blue",
          },
        },
        {
          id: 1,
          location: "地点2",
          style: {
            color: "#aabde6",
          },
        },
        {
          id: 2,
          location: "地点3",
          style: {
            color: "#aabde6",
          },
        },
      ],
    };
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
  methods: {
    ColorChange(e) {
      for (let i = 0; i < this.locations.length; i++) {
        if (i == e) {
          this.locations[i].style = {
            color: "blue",
          };
        } else {
          this.locations[i].style = {
            color: "#aabde6",
          };
        }
      }
    },
  },
  components: { BD4Gram2, BD4Gram1, BD4Gram3, BD4Gram4 },
};
</script>
<style lang="scss" scoped>
.el-container {
  width: 100vw;
  background: url(../assets/back2.png);
  .el-main {
    .zazhi {
      border: #aabde6 solid 1px;
      border-radius: 6px;
      width: 10vw;
      height: 12vh;
      position: relative;
      float: left;
      margin: 1vh 1vw 1vh 0;
      .zazhiImg {
        width: 2vw;
        height: 4vh;
        position: absolute;
        left: 1.5vw;
        top: 1vh;
      }
      .zazhiItem1 {
        position: absolute;
        left: 0.5vw;
        width: 4vw;
        text-align: center;
        top: 5.5vh;
      }
      .zazhiItem2 {
        position: absolute;
        left: 6vw;
        top: 1vh;
        font-size: 2vw;
        color: #c0ad3e;
        font-family: "UnidreamLED";
      }
      .zazhiItem3 {
        position: absolute;
        left: 5vw;
        width: 4vw;
        text-align: center;
        top: 7vh;
      }
    }
    .zazhi:hover {
      box-shadow: #aabde6 0px 0px 1px 2px;
      border: black;
    }
    .locations {
      height: 3vh;
      border: #aabde6 solid 1px;
      width: 96vw;
      .location {
        height: 2vh;
        line-height: 2vh;
        list-style: none;
        float: left;
        margin: 0.5vh 1vw 0vh 1vw;
      }
    }
    .gram1 {
    }
    .gram {
      width: 96vw;
      .componentGram1 {
        float: left;
        width: 64vw;
        height: 24vh;
      }
      .componentGram2 {
        float: left;
        width: 16vw;
        height: 24vh;
      }
      .gram2Data {
        float: left;
        width: 8vw;
        height: 24vh;
      }
    }
    .swipers {
      float: left;
      height: 22vh;
      width: 8vw;
      font-size: 0.5vw;
      padding-top: 1vh;
      overflow: scroll;
      // 滚动条优化
      overflow-y: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
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
  }
  .el-footer {
    .footer {
      border: #aabde6 solid 1px;
      height: 40vh;
      .footerGram1 {
        height: 100%;
        width: 24vw;
        float: left;
      }
      .footerGram2 {
        height: 100%;
        width: 42vw;
        float: left;
      }
    }
  }
}
</style>
