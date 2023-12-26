<template>
    <div class="manage">
      <div class="manage-header">
        <!-- 新增按钮 -->
        <el-button type="primary" @click="handlecreate">+ 新增</el-button>
  
        <!-- 对话框:点击新增或编辑才会弹出表单 -->
        <!-- :before-close="closeDialog" 点击关闭的x之前要做的事情 -->
        <el-dialog :title="modalType == 0 ? '新建' : '编辑'" :visible.sync="dialogVisible" width="50%"
          :before-close="closeDialog">
          <!-- 表单Form -->
          <!-- ref=form:为了通过this.$refs调用组件的方法 -->
          <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="80px">
            <!-- 每一项表单域:el-form-item -->
            <el-form-item label="扶梯名称" prop="name">
              <el-input placeholder="请输入扶梯名称" v-model="form.name"></el-input>
            </el-form-item>
  
  
            <el-form-item label="扶梯地点">
              <el-form-item prop="location">
                <el-input placeholder="请输入扶梯地点" v-model="form.location">
                </el-input>
              </el-form-item>
            </el-form-item>

            <el-form-item label="安装时间" prop="installationDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.installationDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
              
            <el-form-item label="最近检修" prop="recentCheck">
              <el-date-picker placeholder="请输入最近检修时间"  type="date"  v-model="form.recentCheck" style="width: 100%;"></el-date-picker>
            </el-form-item>
  
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>
  
        <!-- 搜索框 -->
      </div>
      <div class="common-table">
        <!-- 用户数据Table -->
        <el-table :data="tableData" stripe style="width: 100%" height="90%">
          <el-table-column prop="name" label="扶梯名称">
          </el-table-column>
          <el-table-column prop="location" label="扶梯地点">
          </el-table-column>
          <el-table-column prop="installationDate" label="安装时间">
          </el-table-column>
          <el-table-column prop="recentCheck" label="最近检修时间">
          </el-table-column>
          <!-- 自定义列 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="primary">编辑</el-button>
              <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
  import { getFuti, createFuti, deleteFuti, updateFuti,futicount,futiget} from '../api/index'
  export default {
    data() {
      return {
        // 表单绑定的数据
        form: {
          name: '',
          recentCheck: '',
          location: '',
          installationDate: ''
        },
        // 表单验证规则
        rules: {
          name: [{ required: true, message: '请输入扶梯名称', trigger: 'blur' }],
          recentCheck: [{ required: true, message: '请输入最近检修时间', trigger: 'blur' }],
          location: [{ required: true, message: '请输入扶梯地点', trigger: 'blur' }],
          installationDate: [{ required: true, message: '请输入安装时间', trigger: 'blur' }],
        },
        // 表单是否打开
        dialogVisible: false,
        // 列表数据
        tableData: [],
        // 打开表单:新建0,编辑1
        modalType: 0,
        // 分页的对象
        pageData: {
          page: 1,
          limit: 9
        },
        // 分页页数
        total: 0,
        wholepage:0,
        // 搜索框表单
        searchForm: {
          name: ''
        }
      }
    },
    methods: {
      // 获取列表数据
      getList() {
        // 由接口文档知传入一个对象:要返回的是当前页面数据和搜索到的数据的交集
        getFuti({ params: { ...this.pageData, ...this.searchForm } }).then((data) => {
          this.tableData = data.data.data
          console.log(data,'futi')
          futicount({}).then((data)=> {
              console.log(data)
            this.total = data.data || 0;
            this.wholepage = Math.ceil(this.total/this.pageData.limit)
            console.log(this.wholepage,'getcount')
            }
            );
        })
      },
      // 表单提交
      submit() {
        // 要用箭头函数,若用function会报错,不知道为什么
        this.$refs.form.validate((valid) => {
          // 符合校验
          if (valid) {
            // 提交数据
            if (this.modalType === 0) {
              // 新增
              createFuti(this.form).then(() => {
                this.getList()
              })
            } else {
              // 编辑
              updateFuti(this.form).then(() => {
                this.getList()
              })
            }
            // 清空,关闭
            this.closeDialog()
          }
        })
      },
      // 关闭对话框
      closeDialog() {
        // 先重置
        this.$refs.form.resetFields()
        // 后关闭
        this.dialogVisible = false
      },
      // 编辑按钮
      handleEdit(index) {
        this.modalType = 1
        this.openForm()
        // 深拷贝
        this.form = JSON.parse(JSON.stringify(index))
      },
      // 删除按钮
      handleDelete(index) {
        this.$confirm('此操作将永久删除该扶梯信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除操作:根据后端接口,参数是对象,id是唯一标识符
          deleteFuti({ id: index.id }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          });
        }).catch(() => {
          // 点击取消:不删除了
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 新建按钮
      handlecreate() {
        this.modalType = 0
        this.openForm()
      },
      // 打开表单
      openForm() {
        this.dialogVisible = true
      },
      // 改变页码
      currentChange(val) {
        this.pageData.page = val
        this.getList()
      },
      // 搜索
      search() {
        console.log(this.searchForm.name)
        if(this.searchForm.name.length === 0){
        this.getList();
        }
        else {
          console.log(this.searchForm.name)
          this.tableData.splice(0);
          futiget(this.searchForm).then((data) => {
            console.log(data)
            this.tableData = data.data.data
            this.total = data.data.msg || 0;
            this.wholepage = Math.ceil(this.total/this.pageData.limit)
          })
        }
      },
    },
    mounted() {
      this.getList()
    }
  }
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
        right:20px;
        bottom: 0;
      }
    }
  }
  </style>