<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4" class="left">
                <div class="grid-content bg-purple">
                    <img src="../../assets/logo.png" alt="無法顯示圖片">
                </div>
            </el-col>
            <el-col :span="18" class="middle">
                <div class="grid-content bg-purple-light">
                    <h3>電商後台管理系統</h3>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <a class="loginout" @click.prevent="handleSingout" href="#">退出</a>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside class="aside" width="200px">
            <el-menu :router="true" :unique-opened="true">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用戶管理</span>
                    </template>
                    <el-menu-item index="users">
                        <i class="el-icon-success"></i>
                        <span>用戶列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>權限管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>角色列表</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>權限列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>商品列表</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>分類參數</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>商品分類</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>訂單管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>选项1</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>數據統計</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                        <span>选项1</span>
                    </el-menu-item>
                </el-submenu>

            </el-menu>
        </el-aside>
        <el-main class="main">
            <router-view>

            </router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {

    beforeCreate() {
        const token = localStorage.getItem('token')

        if (!token) {
            this.$router.push({
                name: 'login'
            })
        }
    },

    methods: {
        handleSingout() {
            localStorage.clear()
            this.$message.success('退出成功')
            this.$router.push({
                name: 'login'
            })
        }
    },
}
</script>

<style>
.container {
    height: 100%;
}

.header {
    background-color: #b3c0d1;
}

.aside {
    background-color: #d3dce6;
}

.main {
    background-color: #e9eef3;
}

.left img {
    height: 60px;
}

.middle {
    text-align: center;
}

.loginout {
    text-decoration: none;
    line-height: 60px;
}
</style>
