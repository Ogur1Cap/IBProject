<template>
  <div ref="waterBallChart" :style="{ width: '10vw', height: '16vh' }"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-liquidfill";

export default {
  name: "WaterBall",
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [0.5, 0.55];
      },
    },
  },
  mounted() {
    this.initWaterBallChart();
    console.log(1);
    console.log(this.data);
    console.log(2);
  },
  methods: {
    initWaterBallChart() {
      this.chartInstance = echarts.init(this.$refs.waterBallChart);
      this.chartInstance.setOption(this.data);
    },
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
};
</script>
