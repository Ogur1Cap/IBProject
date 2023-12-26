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
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
          </el-form-item>


          <el-form-item label="邮箱">
            <el-form-item prop="email">
              <el-input placeholder="请输入邮箱" v-model="form.email">
              </el-input>
            </el-form-item>
          </el-form-item>

          <el-form-item label="手机号" prop="tele">
            <el-input placeholder="请输入手机号" v-model="form.tele"></el-input>
          </el-form-item>

          <el-form-item label="身份" prop="role">
            <el-select placeholder="请选择身份" v-model="form.role">
                <el-option label="管理员" :value="1"></el-option>
                <el-option label="检察员" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 搜索框 -->
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchForm.username" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <!-- 用户数据Table -->
      <el-table :data="tableData" stripe style="width: 100%" height="90%">
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="tele" label="手机号">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="role" label="身份">
          <template slot-scope="scope">
            <span>{{ scope.row.role == 1 ? '管理员' : '检测员' }}</span>
          </template>
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
import { getUser, createUser, deleteUser, updateUser,userscount,userget} from '../api/index'
export default {
  data() {
    return {
      // 表单绑定的数据
      form: {
        username: '',
        tele: '',
        email: '',
        role: ''
      },
      // 表单验证规则
      rules: {
        username: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        tele: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        role: [{ required: true, message: '请输入身份', trigger: 'blur' }],
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
      getUser({ params: { ...this.pageData, ...this.searchForm } }).then((data) => {
        this.tableData = data.data.data
        console.log(data,'getuser')
        userscount({}).then((data)=> {
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
            createUser(this.form).then(() => {
              this.getList()
            })
          } else {
            // 编辑
            updateUser(this.form).then(() => {
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
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除操作:根据后端接口,参数是对象,id是唯一标识符
        deleteUser({ id: index.id }).then(() => {
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
      console.log(this.searchForm.username)
      if(this.searchForm.username.length === 0){
      this.getList();
      }
      else {
        console.log(this.searchForm.username)
        this.tableData.splice(0);
        userget(this.searchForm).then((data) => {
          console.log(data)
          this.tableData = data.data.data
          this.total = data.data.msg || 0;
          this.wholepage = Math.ceil(this.total/this.pageData.limit)
        })
      }
    },
    getsomething(){
      userget().then((data)=>{
        console.log(data)
      })
    }
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