<template>
  <div class="manage">
    <div class="manage-header">
      <!-- 新增按钮 -->
      <el-button type="primary" @click="handlecreate">+ 新增</el-button>
      <el-dialog
        :title="modalType == 0 ? '新建' : '编辑'"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="closeDialog"
      >
        <!-- 表单Form -->
        <!-- ref=form:为了通过this.$refs调用组件的方法 -->
        <el-form
          :inline="true"
          :model="form"
          :rules="rules"
          ref="form"
          label-width="80px"
        >
          <!-- 每一项表单域:el-form-item -->

          <el-form-item label="日期">
            <el-form-item prop="datea">
              <el-date-picker
                v-model="form.datea"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-form-item>

          <el-form-item label="地点" prop="name">
            <el-input placeholder="请输入地点" v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="程度" prop="degree">
            <el-input placeholder="请输入事故程度" v-model="form.degree"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="description">
            <el-input
              placeholder="请输入描述内容"
              v-model="form.description"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6 }"
            ></el-input>
          </el-form-item>

          <el-form-item label="图片" prop="image">
            <el-upload
              class="upload-demo"
              :before-upload="beforeUpload"
              :on-success="handleUploadSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
            </el-upload>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogisible" width="30%">
        <img :src="dialogImageUrl" style="width: 100%" />
      </el-dialog>
    </div>
    <div class="common-table">
    <!-- 检修记录表格 -->
    <el-table :data="records" border>
      <el-table-column prop="datea" label="日期"></el-table-column>
      <el-table-column prop="name" label="地点"></el-table-column>
      <el-table-column prop="degree" label="程度"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <!-- 自定义列 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="handleView(scope.row)">查看</el-button>
          <el-button @click="handleEdit(scope.row)" type="primary">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pager">
        <el-pagination layout="prev, pager, next" :page-count="wholepage" @current-change="currentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getCase, createCase, deleteCase, updateCase,Casecount } from '../api/index'
export default {
  data() {
    return {
      form: {
        degree: "",
        datea: "",
        description: "",
        name:"",
        dialogImageUrl: '',//获得的地址
        uploadedImage: '' // 存储上传成功后的图片地址
      },
      rules: {
        name: [{ required: true, message: "请输入设备地点", trigger: "blur" }],
        description: [{ required: true, message: "请输入描述内容", trigger: "blur" }, ],
          datea: [{ required: true, message: "请输入日期", trigger: "blur" }],
          degree: [{ required: true, message: "请输入程度", trigger: "blur" }],
      },
      // 表单是否打开
      dialogVisible: false,
      dialogisible: false,
      // 列表数据
      records: [],
      // 打开表单:新建0,编辑1
      modalType: 0,
      wholepage:0,
      // 分页的对象
      pageData: {
        page: 1,
        limit: 7,
      },
      // 分页页数
      total: 0,
    };
  },
  methods: {
    // 获取列表数据
    getList() {
      // 由接口文档知传入一个对象:要返回的是当前页面数据和搜索到的数据的交集
      getCase({ params: { ...this.pageData, ...this.searchForm } }).then(
        (data) => {
          this.records = data.data.data;
          Casecount({}).then((data)=> {
          console.log(data)
          this.total = data.data || 0;
          this.wholepage = Math.ceil(this.total/this.pageData.limit)
          console.log(this.wholepage)
          }
          );
        }
      );
    },
    // 表单提交
    submit() {
      // 要用箭头函数,若用function会报错
      this.$refs.form.validate((valid) => {
        // 符合校验
        if (valid) {
          // 提交数据
          if (this.modalType === 0) {
            // 新增
            createCase(this.form).then(() => {
              this.getList();
            });
          } else {
            // 编辑
            updateCase(this.form).then(() => {
              this.getList();
            });
          }
          // 清空,关闭
          this.closeDialog();
        }
      });
    },
    // 关闭对话框
    closeDialog() {
      // 先重置
      this.$refs.form.resetFields();
      // 后关闭
      this.dialogVisible = false;
    },
    // 编辑按钮
    handleEdit(index) {
      this.modalType = 1;
      this.openForm();
      // 深拷贝
      this.form = JSON.parse(JSON.stringify(index));
    },
    // 删除按钮
    handleDelete(index) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作:根据后端接口,参数是对象,id是唯一标识符
          deleteCase({params:{ id: index.id }}).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
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
    // 新建按钮
    handlecreate() {
      this.modalType = 0;
      this.openForm();
    },
    // 打开表单
    openForm() {
      this.dialogVisible = true;
    },
    // 改变页码
    currentChange(val) {
      this.pageData.page = val;
      this.getList();
    },
    //查看图片
    handleView(row) {
      console.log(row.url);
    this.dialogImageUrl = row.url;
    this.dialogisible = true;
    },
    //上传图片
    beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg'
    const isPNG = file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG && !isPNG) {
      this.$message.error('只能上传 JPG/PNG 格式的图片')
      return false
    }
    if (!isLt2M) {
      this.$message.error('图片大小不能超过 2MB')
      return false
    }
    return true
  },
  handleUploadSuccess(response) {
    console.log(response)
    if (response.code === 0) {
      this.uploadedImage = response.data.url // 存储上传成功后的图片地址
      this.$message.success('图片上传成功')
    } else {
      this.$message.error('图片上传失败')
    }
  }
  },
  mounted() {
    this.getList();
  },
};
</script>
  
<style lang="less" scoped>
.manage {
  height: 100%;

  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .common-table {
    height: 90%;
    position: relative;

    .pager {
      position: absolute;
      right: 20px;
      bottom: 0;
    }
  }
}
</style>

