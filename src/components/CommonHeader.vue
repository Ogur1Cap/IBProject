<template>
    <div class="header-container">
        <div class="l-content">
            <el-tooltip class="item" effect="dark" content="折叠侧边栏" placement="bottom">
            <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="可视化前台" placement="bottom">
                <el-button @click="jump" icon="el-icon-s-platform" size="mini"></el-button>
            </el-tooltip>
         <!--   <el-tooltip class="item" effect="dark" content="VR看图" placement="bottom">
                <el-button @click="VR" icon="el-icon-view" size="mini"></el-button>
            </el-tooltip>
            -->
            <div style="position: absolute; right:80px;">
            <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
                <el-button @click="Fullscreen" icon="el-icon-full-screen" size="mini"></el-button>
            </el-tooltip>
            </div>
            <div style="position: absolute; right:140px;">
            <el-tooltip class="item" effect="dark" content="信息" placement="bottom">
                <el-badge :value="alertMessages.length">
                    <!--   <el-badge :value="alertMessages.length">  -->
                <el-button @click="showAlertDrawer" icon="el-icon-message" size="mini"></el-button>
                </el-badge>
            </el-tooltip>
                    <el-drawer
                    title="预警信息"
                    :visible="drawerVisible"
                    :append-to-body="true"
                    @close="closeDrawer"
                    >
                        <el-alert
                        v-for="(message, index) in alertMessages"
                        :key="index"
                        :title="''"
                        :description="message.information"
                        type="warning"
                        center
                        closable
                        @close="dismissAlert(index)"
                        ></el-alert>
                    </el-drawer>
            </div>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/user.jpg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userdate">个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
import { Warnning } from '../api/index'
import { deletewarning } from '../api/index'
export default {
    data(){
        return{
        drawerVisible: false,
        alertMessages: [],
        badgeCount: 0,
        newAlertMessage: ''
        }
    },
    methods: {
        Fullscreen(){
            if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen(); // 标准浏览器
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen(); // Firefox
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen(); // Chrome、Safari和Opera
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen(); // IE/Edge
  }
        },
        handleMenu() {
            // 相当于调用这个方法
            this.$store.commit('CollapseMenu')
        },
        handleClick(command) {
            if (command === 'logout') {
                Cookie.remove('token')
                this.$router.push('/login')
            }
            if (command === 'userdate') {
                if (this.$route.path !== '/userdate') {
                this.$router.push('/userdate')
            }
            const item = {
                            path: '/userdate',
                            name: 'userdate',
                            label: '个人信息',
                            icon: 'tickets',
                            url: 'UserDate.vue'
                        }
            // 面包屑
            this.$store.commit('SelectMenu', item)
            }
        },
        jump(){
            this.$router.push('/bigdata')
        },
        VR(){
            this.$router.push('/viewvr')
        },
        ////////---------------------------------
        closeDrawer() {
      this.drawerVisible = false;
    },
        dismissAlert(index) {
            console.log(index,'delete')
        // 删除当前预警信息
        deletewarning({params:{ id: index }}).then(()=>{
            console.log(index.id,'delete')
            this.fetchAlertMessages()
        })      
    },
    fetchAlertMessages() {
       Warnning().then((data)=>{
            console.log(data.data.data,'data')
            this.alertMessages = data.data.data
            this.alertMessages = this.alertMessages.sort((a, b) => a.id - b.id);
        })
    }, 
    showAlertDrawer() {
        this.fetchAlertMessages()
      /*  var rstring = 'wasdwasdawadd'
        var rstrae = 'sadwasdawa'
        var rstraeee = 'sadwawdsdawa'
        var rstraee = 'sadwasdwdwdawa'
        const xingxi = [rstring,rstrae,rstraee,rstraeee]
        const alertMessagesWithData = xingxi.map(item => {
                // 为每个元素添加timestamp属性，可以使用Date.now()获取当前时间戳
            return { ...item, timestamp: Date.now() };
            });
            console.log(alertMessagesWithData);
      // 模拟接收到预警信息
      this.alertMessages = xingxi
            */
      // 在这里触发显示预警信息的抽屉
      this.drawerVisible = true;
    }
    },
    mounted(){
        this.fetchAlertMessages()
    },
        created() {
    this.badgeCount = this.alertMessages.length; // 初始化badgeCount为alertMessages的长度
    },

}
</script>

<style lang="less" scoped>
.header-container {
    //原来的颜色background-color: #333;
    background-color: #4395ad;
    height: 60px;

    // 让按钮和头像居中
    display: flex;
    justify-content: space-between;
    align-items: center;
    // 不要紧贴边框
    padding: 0 20px;

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;

        .user {
            width: 40px;
            height: 40px;
            // 50%变圆形
            border-radius: 20%;
        }
    }
}

.l-content {
    display: flex;
    // 上下居中
    align-items: center;

    .el-breadcrumb {
        margin-left: 15px;

        // deep 强制生效
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                &.is-link {
                    color: #666;
                }
            }

            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }
        }
    }
}
</style>