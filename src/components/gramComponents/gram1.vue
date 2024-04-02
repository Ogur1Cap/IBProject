<template>
  <div id="gram1"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
const init = () => {
  var chartDom = document.getElementById("gram1");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      left: "center",
      top: "middle",
      text: "6台",
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
          { value: 1, name: "沥青机" },
          { value: 1, name: "装载机" },
          { value: 4, name: "挖掘机" },
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
#gram1 {
  width: 10vw;
  height: 24vh;
}
</style>
