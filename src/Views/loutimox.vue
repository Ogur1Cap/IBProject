<template>
  <div>
    <dv-loading v-show="loading" class="loadingw">加载中...</dv-loading>
    <div class="content">
      <div class="host-body">
        <div>
          <el-row>
            <el-col :span="6">
              <div class="draw-border">
                <el-button
                  class="cssw"
                  type="text"
                  size="medium"
                  style="position: absolute; top: 6px; left: 100px"
                  @click="jump"
                  >后台管理</el-button
                >
              </div>
              <div class="draw-border">
                <el-button
                  type="text"
                  class="cssw"
                  size="medium"
                  style="position: absolute; top: 6px; left: 250px"
                  @click="jump3"
                  >扶梯统计</el-button
                >
              </div>
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
            <el-col :span="6">
              <div class="draw-border">
                <el-button
                  type="text"
                  size="medium"
                  style="
                    position: absolute;
                    top: 4px;
                    right: 95px;
                    padding: 10px 20px;
                    font-weight: bold;
                    font-size: medium;
                  "
                  >楼梯模型</el-button
                >
              </div>
              <div class="draw-border">
                <el-button
                  class="cssw"
                  type="text"
                  size="medium"
                  style="position: absolute; top: 6px; right: 250px"
                  @click="jump2"
                  >扶梯检测</el-button
                >
              </div>
              <dv-decoration-8
                :reverse="true"
                class="title_left"
                :color="['#008CFF', '#00ADDD']"
            /></el-col>
          </el-row>
          <el-dialog
            title="自动扶梯"
            :visible="dialogVisible"
            :show-close="false"
          >
            <h3>
              自动扶梯是以电力驱动，在一定方向上能够大量、连续运送乘客的开放式运输机械。具有结构紧凑、安全可靠、安装维修简单方便等特点。因此，在客流量大而集中的场所，如车站、码头、商场等处，得以广泛应用。扶梯分类方法很多，可从不同角度来分。按驱动方式分类：有链条式(端部驱动)和齿轮齿条式(中间驱动)两类。
              按使用条件分：有普通型(每周少于140h运行时间)和公共交通型(每周大于140h运行时间)。按提升高度分：有最大至8m的小提升高裂陵圆度，和最大至25m中提升高度以及最大可达65m的大提升高度3类。按运行速度分：有恒速和可调速两种。
            </h3>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
          </el-dialog>
        </div>
      </div>

      <!--切换 <el-button type="info" @click="gltfmoudel2" style="position: absolute;">切换</el-button> -->
      <div class="canvas-container">
        <canvas ref="canvas"></canvas>
      </div>
      <a
        style="
          position: absolute;
          left: 47.5%;
          bottom: 70px;
          width: 40px;
          height: 20px;
        "
        id="buttoncss1"
        @click="xiangxi"
        data-title="详细"
      ></a>
    </div>
  </div>
</template> 

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  data() {
    return {
      loading: true,
      currentModel: 0,
      dialogVisible: false,
    };
  },
  methods: {
    gltfmoudel() {
      const canvas = this.$refs.canvas;

      // 创建渲染器
      const renderer = new THREE.WebGLRenderer({ alpha: true, canvas });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      // 创建透明场景
      const scene = new THREE.Scene();

      // 创建相机
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // 在相机和渲染器之后创建OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // 开启阻尼效果
      controls.dampingFactor = 0.05; // 阻尼系数
      //controls.zoomSpeed = 0.5; // 缩放速度
      controls.enableZoom = false; // 禁用缩放

      // 创建灯光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
      scene.add(ambientLight);
      const light = new THREE.DirectionalLight(0xffffff);
      light.position.set(0, 1, 0);
      scene.add(light);

      // 导入gltf模型
      const loader = new GLTFLoader();
      loader.load("static/module/scene.gltf", (gltf) => {
        console.log(gltf);
        gltf.scene.scale.set(0.005, 0.005, 0.004);
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.material.envMap = scene.environment; // 反射环境光
            child.material.needsUpdate = true; // 更新材质
          }
        });
        scene.add(gltf.scene);
      });

      // 渲染场景
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }

      animate();
    },
    gltfmoudel2() {
      const canvas = this.$refs.canvas;

      // 创建渲染器
      const renderer = new THREE.WebGLRenderer({ alpha: true, canvas });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      // 创建透明场景
      const scene = new THREE.Scene();

      // 创建相机
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // 在相机和渲染器之后创建OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // 开启阻尼效果
      controls.dampingFactor = 0.05; // 阻尼系数
      //controls.zoomSpeed = 0.5; // 缩放速度
      controls.enableZoom = false; // 禁用缩放

      // 创建灯光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
      scene.add(ambientLight);
      const light = new THREE.DirectionalLight(0xffffff);
      light.position.set(0, 1, 0);
      scene.add(light);

      // 导入gltf模型
      const loader = new GLTFLoader();
      loader.load("static/electronic_stepper_motor/scene.gltf", (gltf) => {
        console.log(gltf);
        gltf.scene.scale.set(0.005, 0.005, 0.004);
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.material.envMap = scene.environment; // 反射环境光
            child.material.needsUpdate = true; // 更新材质
          }
        });
        scene.add(gltf.scene);
      });

      // 渲染场景
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }

      animate();
    },
    jump() {
      this.$router.push("/home");
    },
    jump2() {
      this.$router.push("/futi");
    },
    jump3() {
      this.$router.push("/bigdata");
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 800);
    },
    buttoncsss() {
      const docStyle = document.documentElement.style;
      const aElem = document.querySelector("a");
      const boundingClientRect = aElem.getBoundingClientRect();

      aElem.onmousemove = function (e) {
        const x = e.clientX - boundingClientRect.left;
        const y = e.clientY - boundingClientRect.top;

        const xc = boundingClientRect.width / 2;
        const yc = boundingClientRect.height / 2;

        const dx = x - xc;
        const dy = y - yc;

        docStyle.setProperty("--rx", `${dy / -1}deg`);
        docStyle.setProperty("--ry", `${dx / 10}deg`);
      };

      aElem.onmouseleave = function (e) {
        docStyle.setProperty("--ty", "0");
        docStyle.setProperty("--rx", "0");
        docStyle.setProperty("--ry", "0");
      };

      aElem.onmousedown = function (e) {
        docStyle.setProperty("--tz", "-25px");
      };

      document.body.onmouseup = function (e) {
        docStyle.setProperty("--tz", "-12px");
      };
    },
    xiangxi() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    setInterval(() => {
      this.cancelLoading();
    }, 600);
    setTimeout(() => {
      this.gltfmoudel();
      this.buttoncsss();
    }, 1400);
  },
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../assets/back.jpg"); // 背景图
  background-size: cover; // 背景尺寸
  background-position: center center; // 背景位置
  z-index: 0;
}
.loading-bg {
  background-image: url("../assets/back.jpg"); /* 背景图 */
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.canvas-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 70%;
  z-index: 1;
}
.loadingw {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9; // 设置为较高的层级，例如 2
}
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
.draw-border .cssw {
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
  content: "";
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
  transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s,
    height 0.3s ease-out 1s;
}

a {
  position: relative;
  display: inline-block;
  padding: 1.2em 2em;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  user-select: none;
  color: white;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(135deg, #3151b9, #1a67a7);
    border-radius: 4px;
    transition: box-shadow 0.5s ease, transform 0.2s ease;
    will-change: transform;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0))
      rotateY(var(--ry, 0)) translateZ(var(--tz, -12px));
  }

  &:hover::before {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  &::after {
    position: relative;
    display: inline-block;
    content: attr(data-title);
    transition: transform 0.2s ease;
    font-weight: bold;
    letter-spacing: 0.01em;
    will-change: transform;
    transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0))
      rotateY(var(--ry, 0));
  }
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  transform-style: preserve-3d;
  transform: perspective(800px);
}
</style>