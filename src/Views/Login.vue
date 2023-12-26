<template>
    <dv-full-screen-container class="content">
       <!--<div>
            <canvas ref="canvas" style="z-index: 9999;"></canvas>
        </div>--> 
            <img src="../assets/zhinenglogo.png" alt="" style="    position: absolute;  right: 60px;    top: 120px;">
    <el-form ref="form" class="login_container" :model="login" status-icon :rules="rules" label-width="70px">
        <!-- h3要放在里面:只能有一个根,且title也是表单的一部分 -->
    <h3 class="login_title">用户登录</h3>
        <!-- prop对应rules里的键 -->
        <el-form-item label="用户名" prop="username">
            <el-input v-model="login.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="login.password" autocomplete="off"></el-input>
        </el-form-item>
        <!--
        <el-form-item label="" prop="rememberme">
            <el-checkbox v-model="rememberme" style="left: -50px;">记住密码</el-checkbox>
        </el-form-item>
        -->
        <el-form-item class="button">
            <el-button @click="submit" type="primary" style="margin-left:30px;margin-top:10px">登录</el-button>
            <el-link type="primary" class="register" @click="register">注册</el-link>
        </el-form-item>
    </el-form>
    </dv-full-screen-container>
</template>

<script>
import Cookie from 'js-cookie'
//import { getMenu } from '../api/index'
import getmenu from '@/data/menu'
export default {
    props: {
    amountX: {
      type: Number,
      default: 50
    },
    amountY: {
      type: Number,
      default: 50
    },
    //控制点颜色
    color: {
      type: Number,
      default: '#097bdb'
    },
    top: {
      type: Number,
      default: 350
    }
  },
    data() {
        return {
            count: 0,
            // 用来跟踪鼠标水平位置
            mouseX: 0,
            windowHalfX: null,
            // 相机
            camera: null,
            // 场景
            scene: null,
            // 批量管理粒子
            particles: null,
            // 渲染器
            renderer: null,
            // 登陆数据
            login: {
                username: '',
                password: ''
            },
            // 校验规则
            rules: {
                username: [{ required: 'true', message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: 'true', message: '请输入密码', trigger: 'blur' }]
            }
        }
    },
    methods: {
        submit() {
            // 表单的校验
           this.$refs.form.validate((valid) => {
               if (valid) {
            /*
                    // 传入表单数据
                  getMenu(this.login).then((data) => {
                        console.log(data);
                        if(data.data.code === '20000'){
                            // 记录cookie
                            Cookie.set('token',data.data.time)
                            // 设置菜单
                            this.$store.commit('setMenu',data.data.data)
                            // 动态添加路由
                            this.$store.commit('addMenu',this.$router)
                            // 跳转到首页
                            this.$router.push('/home')
                            this.$message.success('登录成功');
                            console.log('dlcg')
                        }else{
                            // 验证失败的弹窗
                            this.$message.error('登陆失败');
                        }
                    })
                */
                            if(this.login.username === 'admin' && this.login.password === 'admin'){
                            // 记录cookie
                            Cookie.set('token',getmenu.time)
                            // 设置菜单
                            this.$store.commit('setMenu',getmenu.data)
                            // 动态添加路由
                            this.$store.commit('addMenu',this.$router)
                            // 跳转到首页
                            this.$router.push('/home')
                            this.$message.success('登录成功');
                            }
                            else{
                            this.$message.error('登陆失败');
                            }    
                          

                            
                }
                
            })
            
        },
        register(){
            this.$router.push('/register')
        },
    },
    mounted(){
    }
}
</script>

<style lang="less" scoped>
.custom-font {
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  font-weight: bold;
}
.content{
        background-image: url(../../src/assets/LoginBack.jpg);
        background-size: cover;
        height: auto;
      }   
.login_container {
    width: 350px;

    // 居中
    margin: 180px auto;

    padding: 35px 35px 15px 35px;

    // 让padding在width里面
    box-sizing: border-box;

    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 0 25px #cac6c6;
    position: absolute;
    right: 200px;
    top: 12%;
    opacity: 70%;

    .login_title {
        color: #505458;
        // 左右居中
        text-align: center;
        margin-bottom: 40px;
    }

    .el-input {
        width: 198px;
    }
}
.register{
    right: -70px;
}
</style>