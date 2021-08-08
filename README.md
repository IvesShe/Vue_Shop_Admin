# Vue 電商後台

電商後台建構

(開發中)


# 前置工作

這是一個前後端的完整項目

前端使用Vue開發

後端使用node.js開發

這邊先關注在Vue開發的部分

後端的部分有時間再開專案建立學習資料

## 使用mysql

先使用phpstudy開啟mysql

(這玩意真的很方便，但儘限學習使用)

![image](./images/20210808120505.png)

## 使用sqlyog

連接mysql並創建mydb數據庫


![image](./images/20210808163806.png)

## 執行sql

![image](./images/20210808120545.png)
## 啟動node服務器

```
node app.js
```

![image](./images/20210808120647.png)

# 新建專案

詳細內容可參考之前文檔

https://github.com/IvesShe/Vue_SuperMall


```bash
vue init webpack vue_shop_admin
```

![image](./images/20210808122246.png)

![image](./images/20210808122309.png)

創建完成的項目結構

![image](./images/20210808122404.png)

運行

```bash
npm run dev
```

![image](./images/20210808122646.png)

![image](./images/20210808122512.png)

# 新增eslint --fix

package.json


增加這行

```json
"scripts": {
    "lintfix": "eslint --ext .js,.vue src --fix",
  },
```

若eslint有報錯，可以執行

```bash
npm run lintfix
```

作自動修復

# 新增--open

增加這行，執行npm run dev時會自動打開瀏覽器

```json
"scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --open",
  },
```

# 如果要關閉eslint

註解掉這行即可

build/webpack.base.conf.js

```js
module: {
    rules: [
      //...(config.dev.useEslint ? [createLintingRule()] : []),      
    ]
  },
```

# ElementUI官網

https://element.eleme.cn/#/zh-CN

![image](./images/20210808145424.png)

## 安裝

按照官網教學安裝並引用

```bash
npm i element-ui -S
```

![image](./images/20210808150020.png)

## main.js

vue_shop_admin\src\main.js

```js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```

# 新增reset.css

vue_shop_admin\src\assets\css\reset.css

```css
html,
body {
    height: 100%;
    padding: 0;
    margin: 0;
}
```

## main.js引入

vue_shop_admin\src\main.js

```js
import '@/assets/css/reset.css'
```

# axios

安裝axios

```
npm i axios
```

![image](./images/20210808155300.png)

## 參考官網插件的部分

https://cn.vuejs.org/v2/guide/plugins.html#ad

![image](./images/20210808171401.png)

## http.js

vue_shop_admin\src\plugins\http.js

```js
import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
  Vue.prototype.$http = axios
}

export default MyHttpServer

```

## main.js

vue_shop_admin\src\main.js

```js
import MyHttpServer from '@/plugins/http.js'

Vue.use(MyHttpServer)
```

# Login模塊

## Login.vue
vue_shop_admin\src\components\login\Login.vue

```js
<template>
  <div class="login-wrap">
    <el-form
    class="login-form"
    label-position="top"
    label-width="80px"
    :model="formdata">
      <h2>用戶登入</h2>
      <el-form-item label="用戶名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密碼">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button 
      @click.prevent="handleLogin()"
      class="login-btn" type="primary">登入</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('login', this.formdata);
    	console.log(res)
		const {
			data,
			meta: {msg,status}
		} = res.data

		if(status == 200){
			this.$router.push({name:'home'})
			this.$message.success(msg)
		}else{
			this.$message.error(msg)
		}
	}
  }
}

</script>

<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}

.login-wrap .login-btn {
  width: 100%;
}
</style>

```

## index.js

vue_shop_admin\src\router\index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
  ]
})
```

## Home.vue

vue_shop_admin\src\components\home\Home.vue

```js
<template>
  <div>home</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
```

## Login模塊 運行畫面


![image](./images/20210808172154.png)

錯誤提示

![image](./images/20210808172202.png)

輸入正確，轉向home模塊

![image](./images/20210808172211.png)

服務器回傳的信息

![image](./images/20210808172223.png)






