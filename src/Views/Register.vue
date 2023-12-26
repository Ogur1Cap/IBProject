<template>
    <dv-full-screen-container class="content">
        <img src="../assets/zhinenglogo.png" alt="" style="    position: absolute;  right: 10px;    top: 120px;">
    <el-form ref="form" class="login_container" :model="register" status-icon :rules="rules" label-width="70px">
        <!-- h3要放在里面:只能有一个根,且title也是表单的一部分 -->
        <h3 class="login_title">用户注册</h3>
        <!-- prop对应rules里的键 -->
        <el-form-item label="用户名" prop="username">
            <el-input v-model="register.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="tele">
            <el-input type="tele" v-model="register.tele" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="register.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="register.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
            <el-input  v-model="register.code" autocomplete="off" style="width: 100px;"></el-input>
            <div  style="position: absolute;  right: -25px;  top: -5px;">
                <el-button @click="sendCode" type="success" style="margin-left:30px;margin-top:9px" size="small" :disabled="isSend">{{ sendBtnText }}</el-button>
            </div>
             <!-- <div @click="refreshCaptcha" style="position: absolute;  right: -25px;  top: -5px;">
                  <img src="" alt="验证码" id="captchaImage"> 
                <el-link  @click="refreshCaptcha" style=" position: relative;  bottom: -40px;">看不清？换一张</el-link>
            </div>
            --> 
        </el-form-item>
        <el-form-item class="button">
            <el-button @click="submit" type="primary" style="margin-left:30px;margin-top:10px">注册</el-button>
            <el-link type="primary" class="login" @click="loginto">登录</el-link>
        </el-form-item>
    </el-form>
    </dv-full-screen-container>
</template>

<script>
import { Register } from '../api/index'
export default {
    data() {
        return {
                // 是否已经发送了验证码
                isSend: false,
                // 文本
                sendBtnText: '发送邮箱验证码',
                // 计时器对象
                timer: null,
                // 倒数60秒
                counter: 60,
            // 登陆数据
            register: {
                username: '',
                password: '',
                code:'',
                email:'',
                tele:''
            },
            // 校验规则
            rules: {
                username: [{ required: 'true', message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: 'true', message: '请输入密码', trigger: 'blur' }],
                code: [{ required: 'true', message: '请输入验证码', trigger: 'blur' }],
                email: [{ required: 'true', message: '请输入邮箱', trigger: 'blur' }],
                tele: [{ required: 'true', message: '请输入手机号码', trigger: 'blur' }]
            }
        }
    },
    methods: {
    /*    refreshCaptcha() {
        console.log('yzm')
        var captchaImage = document.getElementById('captchaImage');
        captchaImage.src = 'http://192.168.171.32:8080/users/code'; // 发送请求获取新的验证码图像
    } ,
    */
    sendCode () {
        // 调用接口，发送短信验证码
        // 这部分放调用发送短信的接口，这里先不做任何功能，主要先把按钮倒计时的功能实现
        // 将按钮禁用，防止再次点击
        this.isSend = true
        // 开始倒计时，60s之后才能再次点击
        this.countDown()  // 这里实现倒计时的功能，文章下面开始介绍
      },
      countDown () {
        // 将setInterval()方法赋值给前面定义的timer计时器对象，等用clearInterval()方法时方便清空这个计时器对象
        this.timer = setInterval(() => {
          // 替换文本，用es6里面的``这个来创建字符串模板，让秒实时改变
          this.sendBtnText = `(${this.counter}秒)后重新发送`
          this.counter--
          if (this.counter < 0) {
            // 当计时小于零时，取消该计时器
            this.reset()
          }
        }, 1000)
      },
      reset () {
        this.isSend = false
        this.sendBtnText = '发送邮箱验证码'
        if (this.timer) {
          clearInterval(this.timer)
          this.counter = 60
          this.timer = null
        }
      },
        submit() {
            // 表单的校验
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 传入表单数据
                    Register(this.register).then((data) => {
                        console.log(data);
                        if(data){
                            // 跳转到登录页面
                            this.$router.push('/login')
                            this.$message('注册成功');
                        }else{
                            // 验证失败的弹窗
                            this.$message('注册失败');
                        }
                    })
                }
            })
        },
        loginto(){
            this.$router.push('/login')
        }
    },
    mounted(){
        setTimeout(() => {
        //this.refreshCaptcha()
    },400)
}
}
</script>

<style lang="less" scoped>
.content{
        background-image: url(../../src/assets/LoginBack.jpg);
        background-size: cover;
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
.login{
    right: -70px;
}
</style>