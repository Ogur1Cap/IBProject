<template>
    <div id="create">
        <el-button type="info" style="position: absolute;" @click="back">返回主页</el-button>
    </div>
</template>
  
  <script>
  import * as Three from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  
  export default {
  
    data() {
      return {
        scene: null,
        camera: null,
        renderer: null,
        geometry: null,
  
        // 添加材质
        material: [
          new Three.MeshBasicMaterial({
            map: new Three.TextureLoader().load(require("../assets/images/4.jpg")),
            side: Three.DoubleSide,
          }),
          new Three.MeshBasicMaterial({
            map: new Three.TextureLoader().load(require("../assets/images/3.jpg")),
            side: Three.DoubleSide,
          }),
          new Three.MeshBasicMaterial({
            map: new Three.TextureLoader().load(require("../assets/images/2.jpg")),
            side: Three.DoubleSide,
          }),
          new Three.MeshBasicMaterial({
            map: new Three.TextureLoader().load(require("../assets/images/1.jpg")),
            side: Three.DoubleSide,
          }),
          new Three.MeshBasicMaterial({
            map: new Three.TextureLoader().load(require("../assets/images/6.jpg")),
            side: Three.DoubleSide,
          }),
          new Three.MeshBasicMaterial({
            map: new Three.TextureLoader().load(require("../assets/images/5.jpg")),
            side: Three.DoubleSide,
          }),
        ],
        cube: null,
      };
    },
    methods: {
        back(){
            this.$router.push('/home')
        },
      init() {
        this.scene = new Three.Scene();
        this.camera = new Three.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          2,
          1000
        );
        this.renderer = new Three.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("create").appendChild(this.renderer.domElement);
        this.geometry = new Three.BoxGeometry(10, 10, 10);
        this.cube = new Three.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
        this.camera.position.set(0.5, 0, 0);
        this.camera.lookAt(this.scene.position);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableZoom = false;
        // 添加帧渲染
      },
      animate() {
        requestAnimationFrame(this.animate);
        // 渲染场景
        this.renderer.render(this.scene, this.camera);
      },
    },
    created() {},
    mounted() {
      this.init();
      this.animate();
  
    },
  };
  </script>
  
  <style></style>