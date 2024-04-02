<template>
  <div id="gram4"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
const init = () => {
  var chartDom = document.getElementById("gram4");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    xAxis: {
      type: "category",
      data: [
        "11-13",
        "11-14",
        "11-15",
        "11-16",
        "11-17",
        "11-18",
        "11-19",
        "11-20",
      ],
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [60, 50, 40, 60, 80, 70, 80],
        type: "line",
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
#gram4 {
  width: 48vw;
  height: 24vh;
}
</style>
