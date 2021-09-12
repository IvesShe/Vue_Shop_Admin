<template>
<el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item>用戶管理</el-breadcrumb-item>
        <el-breadcrumb-item>用戶列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="searchRow">
        <el-col>
            <el-input 
            @clear="loadUserList()"
            clearable
            placeholder="请输入内容" 
            v-model="query" 
            class="inputSearch">

                <el-button 
                @click="searchUser()"
                slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success">添加用戶</el-button>
        </el-col>
    </el-row>

    <el-table :data="userlist" style="width: 100%">
        <el-table-column 
        type="index"
            label="#" 
            width="60">
        </el-table-column>
        <el-table-column 
            prop="username" 
            label="姓名" 
            width="80">
        </el-table-column>
        <el-table-column 
            prop="email" 
            label="郵箱">
        </el-table-column>
        <el-table-column 
            prop="mobile" 
            label="電話">
        </el-table-column>

        <el-table-column 
            prop="create_time" 
            label="創建時間">
            <template slot-scope="scope">
                {{scope.row.screate_time | fmtdate}}
            </template>
        </el-table-column>

        <el-table-column 
            label="用戶狀態">
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.mg_state"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column 
            prop="address" 
            label="操作">
            <template slot-scope="scope">                
                <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>                               
                <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
                <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            pagenum: 1,
            pagesize: 2,
            userlist: [],
            total: -1,
        }
    },

    created() {
        this.getUserList()
    },

    methods: {

        async getUserList() {
            const AUTH_TOKEN = localStorage.getItem('token')
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;

            const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            console.log(res)
            const {
                meta:{status,msg},
                data:{users,total}
                } = res.data

            if(status == 200){
                this.userlist = users
                this.total = total
                this.$message.success(msg)
                
            }else{
                this.$message.warning(msg)
            }
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val
            // this.pagenum = 1
            this.getUserList()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val
            this.getUserList()
        },
        searchUser() {
            this.getUserList()
        },
        loadUserList() {
            this.getUserList()
        }
    },
}
</script>

<style>
.box-card {
    height: 100%;
}

.inputSearch {
    width: 300px;
}

.inputSearch {
    margin-top: 20px;
}
</style>
