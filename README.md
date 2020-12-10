co-admin-vue 响应式管理后台
===============

## 配合项目[co-admin-api](https://github.com/kekodmc/co-admin-api)一起使用
===============

> 基于 vue 2.0+ <br/>
> UI基于 [vuetifyjs] (https://github.com/vuetifyjs/vuetify) <br/>
> 富文本基于 [tinymce5] (https://github.com/tinymce/tinymce) <br/>

## 安装 Project setup
```
yarn install
```
## 配置 Config
```
配置 .env.dev 和 .env.prod 文件的 VUE_APP_BASE_URL 参数为您的请求地址
```
### history 路由模式需要配置 nginx
```
location / {
		        try_files $uri $uri/ /index.html;
		        expires 30s;
}
```

## 使用 How To Use

### 开发环境 Compiles and hot-reloads for development
```
yarn serve
```

### 打包 Compiles and minifies for production
```
yarn build
```
## 演示 demo

查看<a href="http://co-admin.kekodmc.com" target="_blank">演示网址 DEMO</a>

### 主题更换

![主题更换](https://raw.githubusercontent.com/kekodmc/co-admin-vue/master/public/theme.gif)

### 响应式UI

![响应式UI](https://raw.githubusercontent.com/kekodmc/co-admin-vue/master/public/responsive.gif)

### 富文本框 

![富文本框](https://raw.githubusercontent.com/kekodmc/co-admin-vue/master/public/tinymce.gif)

## 支持作者 Support

![支持作者](http://co-admin.kekodmc.com/support1.png)
