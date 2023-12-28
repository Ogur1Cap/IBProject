<template>
  <el-row>
    <el-col :span="18" style="padding-right: 10px">
      <el-card style="height: 300px">
        <el-carousel :interval="4000" type="card" height="250px">
          <el-carousel-item v-for="(item, index) in imageList" :key="index">
            <img
              :src="item.urle"
              :alt="item.alt"
              class="carousel-item-container"
            />
          </el-carousel-item>
        </el-carousel>
      </el-card>
      <el-col :span="12" style="margin-top: 10px; padding: 5px">
        <el-card style="width: 100%; height: 533px">
          <div style="width: 100%; height: 500px">
            <el-button
              @click="openForm"
              style="position: relative; top: -1px; right: -380px"
              type="primary"
              >添加日志</el-button
            >
            <el-timeline>
              <el-scrollbar style="height: 400px">
                <el-timeline-item
                  v-for="(log, index) in logs"
                  :key="index"
                  :timestamp="log.createTime"
                >
                  {{ log.content }}
                  <br />
                  <el-button type="text" @click="deleteLog(index)"
                    >删除</el-button
                  >
                  <el-button type="text" @click="editLog(index)"
                    >编辑</el-button
                  >
                </el-timeline-item>
              </el-scrollbar>
            </el-timeline>
            <el-dialog
              :visible.sync="dialogVisible"
              width="50%"
              :before-close="closeDialog"
            >
              <!-- 表单Form -->
              <!-- ref=form:为了通过this.$refs调用组件的方法 -->
              <el-form
                :inline="true"
                :model="Rizhi"
                ref="Rizhi"
                label-width="80px"
              >
                <!-- 每一项表单域:el-form-item -->
                <el-form-item label="日志" prop="description">
                  <el-input
                    placeholder="请输入日志内容"
                    v-model="Rizhi.content"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                  ></el-input>
                </el-form-item>

                <el-form-item label="发布时间">
                  <el-form-item prop="createTime">
                    <el-date-picker
                      v-model="Rizhi.createTime"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form-item>
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="addLog">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" style="margin-top: 10px; padding: 5px">
        <el-card style="width: 100%; height: 533px">
          <div style="width: 100%; height: 500px">
            <div>
              <el-button
                @click="showDrawer"
                style="position: relative; right: -380px"
                type="success"
                v-show="RenwuVisible"
                >添加任务</el-button
              >
              <el-drawer :visible="drawerVisible" @close="closeDrawer">
                <!-- 在这里放置任务指派的表单 -->
                <div>
                  <el-form
                    ref="taskFormData"
                    :model="taskFormData"
                    label-width="120px"
                  >
                    <el-form-item label="任务内容">
                      <el-input v-model="taskFormData.content"></el-input>
                    </el-form-item>
                    <el-form-item label="指派人员">
                      <el-select
                        v-model="taskFormData.worker"
                        placeholder="请选择指派人员"
                      >
                        <el-option
                          v-for="person in assigneeList"
                          :key="person.id"
                          :label="person.name"
                          :value="person.name"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="发派时间">
                      <el-form-item prop="createTime">
                        <el-date-picker
                          v-model="taskFormData.createTime"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-form-item>
                  </el-form>
                  <el-button
                    @click="addTask"
                    style="position: relative; right: -250px; top: 100px"
                    type="primary"
                    round
                    >确定保存</el-button
                  >
                </div>
              </el-drawer>
            </div>
            <div>
              <h3>任务列表：</h3>
              <el-scrollbar style="height: 400px">
                <el-table :data="taskList" v-if="RenwuVisible">
                  <!-- 这里根据需求定义任务列表的列 -->
                  <el-table-column
                    prop="content"
                    label="任务内容"
                  ></el-table-column>
                  <el-table-column
                    prop="worker"
                    label="指派人员"
                  ></el-table-column>
                  <el-table-column
                    prop="createTime"
                    label="发派时间"
                  ></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" @click="editTask(scope.row)"
                        >修改</el-button
                      >
                      <el-button type="text" @click="deleteTask(scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>

                <el-table :data="taskList" v-if="!RenwuVisible">
                  <!-- 这里根据需求定义任务列表的列 -->
                  <el-table-column
                    prop="content"
                    label="任务内容"
                  ></el-table-column>
                  <el-table-column
                    prop="createTime"
                    label="发派时间"
                  ></el-table-column>
                </el-table>
              </el-scrollbar>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-col>
    <el-col :span="6">
      <el-card style="height: 850px">
        <div class="user">
          <img src="../assets/images/user.jpg" alt="" />
          <div class="userInfo">
            <p div class="name">小栗帽</p>
            <p div class="access">开发者</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>上次登录时间：<span id="last-login-time"></span></p>
          <p>上次登陆地点：<span>`江西</span></p>
        </div>
        <div class="description">
          <i class="el-icon-chat-line-square"></i>
          <span>介绍</span>
        </div>
        <p id="description">管理员：能够使用所有权限，并且可以设置管理员</p>
        <br />
        <p id="description">手机号：17828631028</p>
        <br />
        <p id="description">团队：IB协同智能扶梯管理工作室</p>
        <div class="power">
          <i class="el-icon-chat-line-square"></i>
          <span>权限</span>
        </div>
        <div>
          <el-progress
            :percentage="40"
            status="warning"
            style="margin-top: 20px"
          ></el-progress>
          <el-progress :percentage="70" style="margin-top: 20px"></el-progress>
          <el-progress
            :percentage="100"
            status="success"
            style="margin-top: 20px"
          ></el-progress>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
  
  <script>
import one from "../../src/assets/futilunbo1.jpg";
import two from "../../src/assets/futilunbo2.jpg";
import three from "../../src/assets/futilunbo3.jpg";
import four from "../../src/assets/futilunbo4.jpg";
import {
  getRizhi,
  createRizhi,
  deleteRizhi,
  updateRizhi,
  getRenwu,
  createRenwu,
  deleteRenwu,
  updateRenwu,
} from "../api/index";

export default {
  data() {
    return {
      pageData: {
        page: 1,
        limit: 8,
      },
      imageList: [
        { urle: one, alt: "Image 1" },
        { urle: two, alt: "Image 2" },
        { urle: three, alt: "Image 3" },
        { urle: four, alt: "Image 4" },
      ],
      logs: [
        { createTime: "2022-8-05", content: "日志1" },
        { createTime: "2023-4-15", content: "日志2" },
        { createTime: "2023-6-09", content: "日志3" },
      ],
      Rizhi: {
        content: "",
        createTime: "",
      },
      dialogVisible: false,
      RenwuVisible: true,
      drawerVisible: false,
      modalType: 0,
      modalType1: 0,
      taskFormData: {
        content: "",
        worker: "",
        createTime: "",
      },
      assigneeList: [
        { id: 1, name: "张三" },
        { id: 2, name: "李四" },
        { id: 3, name: "王五" },
      ],
      taskList: [],
    };
  },
  methods: {
    getlist1() {
      getRizhi({ params: { ...this.pageData, ...this.searchForm } }).then(
        (data) => {
          console.log(data, "getrizhi");
          this.logs = data.data.data;
          console.log(this.logs, "LOGS");
        }
      );
    },
    getlist2() {
      getRenwu({ params: { ...this.pageData, ...this.searchForm } }).then(
        (data) => {
          console.log(data, "getrenwu");
          this.taskList = data.data.data;
        }
      );
    },
    openForm() {
      this.Rizhi = {
        content: "",
      };
      this.dialogVisible = true;
    },
    openForm1() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.Rizhi = {
        content: "",
      };
      // 先重置
      this.$refs.Rizhi.resetFields();
      // 后关闭
      this.dialogVisible = false;
    },
    showDrawer() {
      this.drawerVisible = true;
    },
    closeDrawer() {
      // 先重置表单数据模型
      this.taskFormData = {
        content: "",
        worker: "",
      };
      // 先重置
      this.$refs.taskFormData.resetFields();
      // 后关闭
      this.drawerVisible = false;
    },
    editLog(index) {
      // 打开修改任务的对话框或页面，并传入当前任务的信息
      this.Rizhi = this.logs[index];
      console.log(this.Rizhi, "this.rizhi");
      this.modalType = 1;
      this.openForm1();
    },
    deleteLog(index) {
      console.log({ params: { id: index + 1 } });
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log({ params: { id: index + 1 } });
          // 删除操作:根据后端接口,参数是对象,id是唯一标识符
          deleteRizhi({ params: { id: index + 1 } }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getlist1();
          });
        })
        .catch(() => {
          // 点击取消:不删除了
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addTask() {
      // 要用箭头函数,若用function会报错
      this.$refs.taskFormData.validate((valid) => {
        // 符合校验
        if (valid) {
          // 提交数据
          console.log(this.taskFormData);
          if (this.modalType1 === 0) {
            // 新增
            createRenwu(this.taskFormData).then(() => {
              this.getlist2();
            });
          } else {
            // 编辑
            updateRenwu(this.taskFormData).then(() => {
              this.getlist2();
            });
          }
          // 清空,关闭
          this.closeDrawer();
          this.modalType1 = 0;
        }
      });
    },
    editTask(task) {
      // 打开修改任务的对话框或页面，并传入当前任务的信息
      console.log(task, "JSONTASK");
      this.modalType1 = 1;
      this.showDrawer();
      // 深拷贝
      this.taskFormData = JSON.parse(JSON.stringify(task));
      console.log("修改任务", task);
    },
    deleteTask(task) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作:根据后端接口,参数是对象,id是唯一标识符
          deleteRenwu({ params: { id: task.id } }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getlist2();
          });
        })
        .catch(() => {
          // 点击取消:不删除了
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    gettime() {
      var now = new Date();
      this.taskFormData.createTime =
        now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    },
    //----------------------------------
    addLog() {
      // 提交数据
      if (this.modalType === 0) {
        // 新增
        console.log(this.Rizhi, "RIZHI");
        createRizhi(this.Rizhi).then(() => {
          this.getlist1();
        });
        if (1) {
          this.$notify({
            title: "成功",
            message: "添加日志成功！",
            type: "success",
            position: "bottom-left",
          });
        }
      } else {
        // 编辑
        updateRizhi(this.Rizhi).then(() => {
          this.getlist1();
          if (2) {
            this.$notify({
              title: "成功",
              message: "修改日志成功！",
              type: "success",
              position: "bottom-left",
            });
          }
        });
      }
      // 清空,关闭
      this.closeDialog();
      this.modalType = 0;
    },
    displayLastLoginTime() {
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      var day = ("0" + currentDate.getDate()).slice(-2);

      var lastLoginTimeElement = document.getElementById("last-login-time");
      lastLoginTimeElement.textContent = year + "-" + month + "-" + day;
    },
  },
  mounted() {
    this.getlist1();
    this.getlist2();
    this.displayLastLoginTime();
  },
};
</script>
  
  <style lang="less" scoped>
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
    border-radius: 20%;
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.carousel-item-container {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>