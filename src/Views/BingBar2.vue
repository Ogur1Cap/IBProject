<template>
  <div id="bar2"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
const init = () => {
  var chartDom = document.getElementById("bar2");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      left: "center",
      top: "middle",
      text: "25次",
      textStyle: {
        color: "#bcd6f0",
        fontWeight: 700,
        fontSize: "20",
      },
      subtext: "总预警次数",
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
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 9, name: "特种设备预警" },
          { value: 9, name: "智能监控预警" },
          { value: 7, name: "工程机械预警" },
          { value: 0, name: "环境监控预警" },
          { value: 0, name: "安全帽预警" },
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
#bar2 {
  width: 16vw;
  height: 20vh;
}
</style>
