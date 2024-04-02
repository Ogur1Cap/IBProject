<template>
  <div id="BD4Gram3"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
const init = () => {
  var chartDom = document.getElementById("BD4Gram3");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {},
    tooltip: {
      trigger: "item",
    },
    legend: {
      left: "0",
      show: true,
      orient: "vertical",
      itemWidth: 22,
      itemHeight: 22,
      itemStyle: {
        borderWidth: 10,
      },
      textStyle: {
        color: "#aabde6",
      },
      itemGap: 24,
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        // radius: ["60%", "80%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 4, name: "PM2.5" },
          { value: 2, name: "noise" },
          { value: 1, name: "temperature" },
          { value: 1, name: "humidity" },
          { value: 2, name: "windSpeed" },
          { value: 1, name: "wind" },
          { value: 1, name: "TSP" },
        ],
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
#BD4Gram3 {
  width: 24vw;
  height: 36vh;
}
</style>
