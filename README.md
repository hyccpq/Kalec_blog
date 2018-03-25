
## 博客ssr渲染测试
### 前端地址----[冰空的作品展示](https://www.kalecgos.top)

#### 简介:通过vue.js框架与koa2框架分别搭建前后端，纯手工完成服务端ssr渲染。


##### 1. 开发环境
```
node.js 7.6+
mognodb 3.0+
```
##### 2. 依赖于mongodb数据库
       先安装 [mongodb](https://www.mongodb.com/) 数据库，安装完成后运行数据库，开启27017（默认）端口
##### 3. 克隆到本地，安装依赖，运行
```
> 配置安装好MongoDB
> mongod运行MongoDB
> git clone 
> cd kalec_blog
> npm install 
> npm run build
> npm start
```
### 简要概述

#### 1. 全部使用ES6语法，aysnc+await结构
#### 2. 通过mongoose模块+promise模块操作mongodb数据库
#### 3. 由jsonwebtoken模块完成权限控制
#### 4. 默认使用http2需要ssl证书和密钥
#### 5. koa-multer模块协助完成静态文件上传



### License
MIT
