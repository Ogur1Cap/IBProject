<template>
  <el-row>
    <el-col :span="18">
      <el-card style="height: 600px">
        <div>
          <video width="100%" height="560px"  :src="videoSrc" controls>
          </video>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card style="height: 600px">
        <div class="button">
          <el-button type="danger" @click="stopit">停止电梯</el-button>
          <el-button type="warning" @click="slowit">减缓电梯</el-button>
          <el-button type="success" @click="resetit">恢复电梯</el-button>
        </div>
        <el-divider><i class="el-icon-video-camera"></i></el-divider>
        <div class="menu">
          <el-scrollbar style="height: 400px;">
          <el-menu>
            <el-menu-item v-for="(item, index) in flowAreas" :key="index">
              <el-button
                style="width: 95%; margin: 10px; text-align: center;"
                size="medium"
                type="info"
                @click="switchVideo(item)"
              >
                <i class="el-icon-film" style="color: white;"></i>{{ item }}
              </el-button>
            </el-menu-item>
            <div style=" position: relative; top: -40px;">
            <el-divider><i class="el-icon-warning-outline"></i></el-divider>
            <el-button style=" position: relative; right: -55px; top: 60px;" type="primary" @click="openAddFlowAreaDialog">添加流域</el-button>
            <el-button style=" position: relative; right: -80px; top: 60px;" type="success" @click="checkfuti">查看电梯状况</el-button>
            </div>
          </el-menu>
        </el-scrollbar>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12" style="    position: relative;
    top: 20px;">
      <el-card style="margin-top: 20px; height: 230px ; margin: 5px;" > 
      <div id="chart1" style="height: 320px; top: -40px;"></div>
      </el-card>
    </el-col>
    <el-col :span="12" style="    position: relative;
    top: 20px;">
      <el-card style="margin-top: 20px; height: 230px ; margin: 5px;"> 
        <div ref="chart" style="width: 100%; height: 300%; top: -47px;"></div>
      </el-card>
    </el-col>
    <el-dialog title="添加流域" :visible.sync="dialogVisible1" width="30%">
      <el-form>
        <el-form-item label="新流域名称">
          <el-input v-model="form.newFlowName"></el-input>
        </el-form-item>
        <el-form-item label="新流域地址">
          <el-input v-model="form.newFlowAreaAddress"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="addFlowArea">添加</el-button>
      </span>
    </el-dialog>
    <el-dialog title="电梯状况" :visible="dialogVisible" :show-close="false">
    <!-- 在这里添加echarts图表，展示电梯状况 -->
    <div class="echarts-container">
      <div id="echart1" style="width: 100%; height: 300px;"></div>
      <div id="echart2" style="width: 100%; height: 300px;"></div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
    </span>
    </el-dialog>
  </el-row>
</template>
    
    <script>
    import {stop,slow,reset} from '../api/index'
    import * as echarts from 'echarts';
    import liuyu1 from '../assets/images/futisp.mp4'
    import liuyu2 from '../assets/images/futisp2.mp4'
    import liuyu3 from '../assets/images/666.mp4'
export default {
  data(){
    return {
      videoSrc: '', // 初始视频源为空
      dialogVisible: false,
      dialogVisible1: false,
      form:{
      newFlowAreaAddress: '',
      newFlowName: '',
      },
      three:{
        stopd:11,
        slowd:21,
        resetd:31,
      },
      flowAreas: ['流域1', '流域2', '流域3', '流域4', '流域5',]
    }
  },
  mounted() {
    // 初始化图表
    const myChart = echarts.init(document.getElementById('chart1'));

    let data = []; // 初始数据为空数组

    // 更新数据并重绘图表
    function updateData() {
      // 模拟生成新的数据点
      const newData = [
        // 时间点: 数据
        [new Date(), Math.floor(Math.random() * 4) + 4],
      ];

      // 删除最早的20秒数据
      const currentTime = new Date().getTime();
      const startTime = currentTime - (60 * 1000); // 1分钟前的时间戳

      data = data.filter(function(item) {
        return item[0].getTime() >= startTime;
      });

      // 将新数据点添加到数据数组
      data.push(newData[0]);

      // 处理时间轴
      const timeAxis = data.map(function(item) {
        return [
          item[0].getHours(),
          item[0].getMinutes(),
          item[0].getSeconds()
        ].join(':');
      });

      // 处理速度数据
      const speedData = data.map(function(item) {
        return item[1];
      });

      // 配置图表
      const option = {
        xAxis: {
          type: 'category',
          data: timeAxis,
          boundaryGap: false, // 时间轴紧凑显示
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          type: 'line',
          smooth: true, // 将曲线变得平滑
          data: speedData,
        }],
        tooltip: {
          trigger: 'axis', // 设置触发类型为坐标轴
          formatter: function(params) {
            const dataIndex = params[0].dataIndex;
            const time = timeAxis[dataIndex];
            var value = params[0].value;
            value = value % 10;
            return `时间: ${time}<br>速度: ${value}m/s`;
          },
        },
      };

      // 渲染图表
      myChart.setOption(option);
    }

    // 在页面加载时立即显示图表
    updateData();

    // 每隔3秒更新数据并重绘图表
    setInterval(updateData, 3000);
    //-------------------------------------------------------------------------------------
    // 初始化图表
     const MyChart = echarts.init(this.$refs.chart);

    // 指定图表的配置项和数据
    const option = {
      xAxis: {
        type: 'category',
        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 1000
      },
      series: [{
        type: 'bar',
        data: [800, 600, 400, 300, 500, 700, 900]
      }],
      tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          return '乘客数量：' + params[0].value;
        }
      }
    };

    // 使用刚指定的配置项和数据显示图表
    MyChart.setOption(option);
  },
  beforeDestroy() {
    // 销毁图表实例
    if (myChart) {
      myChart.dispose();
      myChart = null;
      MyChart.dispose();
      MyChart = null;
    }
  },
  methods:{
    stopit(){
      stop({params:{i:this.three.stopd}}).then((data)=>{
        console.log(data)
      })
    },
    slowit(){
      slow({params:{i:this.three.slowd}}).then((data)=>{
        console.log(data)
      })
    },
    resetit(){
      reset({params:{i:this.three.resetd}}).then((data)=>{
        console.log(data)
      })
    },
    switchVideo(flowRegion) {
      // 根据所选择的流域确定要切换的视频源
      if (flowRegion === '流域1') {
        this.videoSrc = liuyu1;
        this.three.stopd = 11;
        this.three.slowd = 21;
        this.three.resetd = 31;
        console.log(this.three.stopd)
      } else if (flowRegion === '流域2') {
        this.videoSrc = liuyu2;
        this.three.stopd = 12;
        this.three.slowd = 22;
        this.three.resetd = 32;
    //    console.log(this.three.stopd)
      } else if (flowRegion === '流域3') {
        this.videoSrc = liuyu3;
        this.three.stopd = 13;
        this.three.slowd = 23;
        this.three.resetd = 33;
     //   console.log(this.three.stopd)
      } else if (flowRegion === '流域4') {
        this.videoSrc = 'video-url-2';
        this.three.stopd = 14;
        this.three.slowd = 24;
        this.three.resetd = 34;
   //     console.log(this.three.stopd)
      } else if (flowRegion === '流域5') {
        this.videoSrc = 'video-url-2';
        this.three.stopd = 15;
        this.three.slowd = 25;
        this.three.resetd = 35
      }
    },
    openAddFlowAreaDialog() {
      this.dialogVisible1 = true;
    },
    addFlowArea() {
      const address = this.newFlowAreaAddress.trim();
      if (address) {
        this.flowAreas.push(address);
        this.$message.success(`添加流域 ${address} 成功`);
        this.dialogVisible = false;
      } else {
        this.$message.error('请输入完整流域信息');
      }
    },
    checkfuti() {
      this.dialogVisible = true;
      
      // 延迟 200ms 渲染图表，确保弹窗正常显示后再渲染
      setTimeout(() => {
        const myChart1 = echarts.init(document.getElementById('echart1'));
        const myChart2 = echarts.init(document.getElementById('echart2'));
        //const myChart3 = echarts.init(document.getElementById('echart3'));

        // 设置图表配置项和数据
        const option1 = {
          backgroundColor: 'transparent',
          title: {
          text: '电梯速度和加速度',
          textStyle: {
            color: 'rgba(55,255,249,1)',
            fontSize: 13
          }
        },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['速度','加速度'],
        textStyle: {
            color: 'rgba(55,255,249,1)'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['周一','周二','周三','周四','周五','周六','周日'],
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(55,255,249,1)',
                }
            },
            axisLabel: {
                color: 'rgba(55,255,249,1)'
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(55,255,249,1)',
                }
            }
        }
    ],
    series : [
        {
            name:'加速度',
            type:'bar',
            barWidth: 20,
            itemStyle: {
               barBorderRadius: 20, 
               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(55,255,249,1)"
                    },
                    {
                        offset: 1,
                        color: "rgba(0,222,215,0.2)"
                    }
                ])
            },
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'速度',
            type:'bar',
            barWidth: 20,
            barGap: '-100%',
            stack: '速度',
            itemStyle: {
               barBorderRadius: 20, 
               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0.4,
                        color: "rgba(255,252,0,1)"
                    },
                    {
                        offset: 1,
                        color: "rgba(8,228,222,0.2)"
                    }
                ])
            },
            data:[220, 182, 191, 234, 290, 330, 310]
        }
    
    ]
        };
        const option2 = {
          backgroundColor: '#fff',
    title: {
        text: "扶梯温度",
        left: "18px",
        top: "0",
        textStyle: {
            color: 'rgba(55,255,249,1)',
            fontSize: 13,
            left:20
          }
    },
    color: ['#73A0FA', '#73DEB3', '#FFB761'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            },
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    grid: {
        left: '25',
        right: '25',
        bottom: '24',
        top: '75',
        containLabel: true
    },
    legend: {
        data: ['扶梯电机温度', '扶梯外壳温度'],
        orient: 'horizontal',
        icon: "rect",
        show: true,
        left: 20,
        top: 25,
    },
    xAxis: {
        type: 'category',
        data: ['01-01', '01-02', '01-03', '01-04', '01-05', '01-06', '01-07'],
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
    },
    yAxis: {
        type: 'value',
        // max: max_value>=100? max_value + 100: max_value+10,
        // max: max_value > 100 ? max_value * 2 : max_value + 10,
        // interval: 10,
        // nameLocation: "center",
        axisLabel: {
            color: '#999',
            textStyle: {
                fontSize: 12
            },
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#F3F4F4'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
    },
    series: [{
            name: '扶梯电机温度',
            type: 'line',
            smooth: true,
            data: [134,212,124,244,345,322,276]
        },
        {
            name: '扶梯外壳温度',
            type: 'line',
            smooth: true,
            data: [13,54,34,14,35,53,26]
        },
    ]
        };
        const option3 = {

        };

        // 使用 setOption 方法渲染图表
        myChart1.setOption(option1);
        myChart2.setOption(option2);
        myChart3.setOption(option3);
      }, 200);
    },
    handleClose() {
      // 关闭弹窗时重置图表
      const myChart1 = echarts.getInstanceByDom(document.getElementById('echart1'));
      const myChart2 = echarts.getInstanceByDom(document.getElementById('echart2'));
     // const myChart3 = echarts.getInstanceByDom(document.getElementById('echart3'));
      
      myChart1.clear();
      myChart2.clear();
     // myChart3.clear();
    },
  }
};
</script>
    
    <style lang="less" scoped>
.menu {
  position: relative;
  top: 50px;
  .menucard{
    background-color: #ccc;
  }
}
.button {
  position: relative;
  left: 10px;
  top: 40px;
  .el-button {
    margin: 8px;
  }
}
.el-divider {
  top: 50px;
}
.user {
  // 垂直居中
  display: flex;
  align-items: center;

  // 外边距:分割线距离loginInfo的距离
  margin-bottom: 20px;
  // 内边距:分割线距离User的距离
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }

  .userInfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
    }
  }
}
.loginInfo {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.description {
  // 外边距:分割线距离loginInfo的距离
  margin-bottom: 20px;
  // 内边距:分割线距离User的距离
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  i {
    position: relative;
    bottom: -20px;
  }
  span {
    position: relative;
    bottom: -20px;
  }
}
.power {
  margin-bottom: 20px;
  // 内边距:分割线距离User的距离
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  i {
    position: relative;
    bottom: -20px;
  }
  span {
    position: relative;
    bottom: -20px;
  }
}
#chart1{
  position: absolute;
    left: -20px;
    top: -50px;
    width: 850px;
    height: 280px;
}
.echarts-container {
  display: flex;
  flex-wrap: wrap;
}

</style>