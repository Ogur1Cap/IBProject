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
            ><el-breadcrumb-item :to="{ path: '/BigData3' }" class="myColors"
              >物料管理</el-breadcrumb-item
            ><el-breadcrumb-item :to="{ path: '/BigData4.vue' }"
              >环境管理</el-breadcrumb-item
            >
          </el-breadcrumb>
        </el-col>
      </el-row>
    </el-header>
    <el-main height="42vh">
      <el-row :gutter="12">
        <el-col :span="8"
          ><div class="gram">
            <div class="gramTop">
              <div class="img">
                <img src="../assets/drag.png" alt="" />
              </div>
              <span>用电检测</span>
            </div>
          </div>
          <div class="componentsGram1">
            <gram1></gram1></div
        ></el-col>
        <el-col :span="8"
          ><div class="gram">
            <div class="gramTop">
              <div class="img">
                <img src="../assets/drag.png" alt="" />
              </div>
              <span>用水检测</span>
            </div>
          </div>
          <div class="componentsGram1">
            <gram2></gram2></div
        ></el-col>
        <el-col :span="8"
          ><div class="gram">
            <div class="gramTop">
              <div class="img">
                <img src="../assets/drag.png" alt="" />
              </div>
              <span>水电总趋势分析</span>
            </div>
          </div>
          <div class="componentsGram1">
            <gram3></gram3>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer height="42vh">
      <el-row :gutter="12">
        <el-col :span="12"
          ><div class="gram">
            <div class="gramTop">
              <div class="img">
                <img src="../assets/drag.png" alt="" />
              </div>
              <span>24小时用电趋势</span>
            </div>
          </div>
          <div class="componentsGram1">
            <gram4></gram4></div
        ></el-col>
        <el-col :span="12"
          ><div class="gram">
            <div class="gramTop">
              <div class="img">
                <img src="../assets/drag.png" alt="" />
              </div>
              <span>24小时用水趋势</span>
            </div>
          </div>
          <div class="componentsGram1">
            <gram5></gram5></div
        ></el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>
<script>
import moment from "moment";
import gram1 from "../components/gramComponents/BD3Gram1.vue";
import gram2 from "../components/gramComponents/BD3Gram2.vue";
import gram3 from "../components/gramComponents/BD3Gram3.vue";
import gram4 from "../components/gramComponents/BD3Gram4.vue";
import gram5 from "../components/gramComponents/BD3Gram5.vue";
export default {
  name: "BigData2",
  data() {
    return {
      timeNow: "2024-1-1 00:00:00",
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
  methods: {},
  components: { gram1, gram2, gram3, gram4, gram5 },
};
</script>
<style lang="scss" scoped>
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
    width: 100%;
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
    .componentsGram1 {
      width: 30vw;
      height: 24vh;
    }
  }
  .el-footer {
  }
}
</style>
