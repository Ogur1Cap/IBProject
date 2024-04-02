<template>
  <div id="gram2"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
const init = () => {
  var chartDom = document.getElementById("gram2");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: "Basic Radar Chart",
      show: false,
    },
    legend: {
      show: false,
      data: ["Allocated Budget", "Actual Spending"],
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "效率指数", max: 6500 },
        { name: "油耗指数", max: 16000 },
        { name: "安全系数", max: 30000 },
        { name: "稳定系数", max: 38000 },
        { name: "强度系数", max: 52000 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: "Allocated Budget",
          },
        ],
        itemStyle: {
          color: "#457ab9",
        },
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
#gram2 {
  width: 20vw;
  height: 28vh;
}
</style>
