<template>
  <div id="BD3gram5"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
const init = () => {
  var chartDom = document.getElementById("BD3gram5");
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
        areaStyle: {},
      },
    ],
  };
  option && myChart.setOption(option);
};
onMounted(async () => {
  await init();
});
</script>
<style>
#BD3gram5 {
  width: 48vw;
  height: 42vh;
}
</style>
