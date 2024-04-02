<template>
  <div id="bar"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
const init = () => {
  var chartDom = document.getElementById("bar");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      left: "center",
      top: "middle",
      text: "4个",
      textStyle: {
        color: "#bcd6f0",
        fontWeight: 700,
        fontSize: "20",
      },
      subtext: "总单位数",
      subtextStyle: {
        color: "#91a0ba",
        fontSize: "12",
      },
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        left: "center",
        width: 200,
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
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1, name: "专业分包" },
          { value: 1, name: "设别分包" },
          { value: 1, name: "材料分包" },
          { value: 1, name: "劳务分包" },
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
#bar {
  width: 16vw;
  height: 20vh;
}
</style>
