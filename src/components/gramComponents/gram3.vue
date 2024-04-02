<template>
  <div id="gram3"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
const init = () => {
  var chartDom = document.getElementById("gram3");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      left: "center",
      top: "middle",
      text: "6",
      textStyle: {
        color: "#bcd6f0",
        fontWeight: 700,
        fontSize: "20",
      },
      subtext: "总设备（台）",
      subtextStyle: {
        color: "#91a0ba",
        fontSize: 12,
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["60%", "80%"],
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
          { value: 2, name: "工作" },
          { value: 0, name: "宕机" },
          { value: 1, name: "停机" },
          { value: 3, name: "立宪" },
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
#gram3 {
  width: 8vw;
  height: 20vh;
}
</style>
