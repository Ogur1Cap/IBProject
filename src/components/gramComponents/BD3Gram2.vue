<template>
  <div id="BD3gram2"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
const init = () => {
  var chartDom = document.getElementById("BD3gram2");
  var myChart = echarts.init(chartDom);
  var option;
  let dataAxis = [
    "点",
    "击",
    "柱",
    "子",
    "或",
    "者",
    "两",
    "指",
    "在",
    "触",
    "屏",
    "上",
    "滑",
    "动",
    "能",
    "够",
    "自",
    "动",
    "缩",
    "放",
  ];
  // prettier-ignore
  let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
  let yMax = 500;
  let dataShadow = [];
  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }
  option = {
    title: {
      text: "特性示例：渐变色 阴影 点击缩放",
      subtext: "Feature Sample: Gradient Color, Shadow, Click Zoom",
      show: false,
    },
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
        "11-21",
        "11-22",
        "11-23",
        "11-24",
        "11-25",
        "11-26",
        "11-27",
        "11-28",
        "11-29",
        "11-30",
        "11-31",
      ],
      //   data: dataAxis,
      axisLabel: {
        inside: false,
        color: "#fff",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: data,
      },
    ],
  };
  // Enable data zoom when user click bar.
  const zoomSize = 6;
  myChart.on("click", function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
      type: "dataZoom",
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
    });
  });
  option && myChart.setOption(option);
};
onMounted(async () => {
  await init();
});
</script>
<style>
#BD3gram2 {
  width: 31vw;
  height: 42vh;
}
</style>
