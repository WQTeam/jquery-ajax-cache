# jquery-ajax-cache
[![Build Status](https://travis-ci.org/WQTeam/jquery-ajax-cache.svg)](https://travis-ci.org/WQTeam/jquery-ajax-cache)
[![Circle CI](https://circleci.com/gh/WQTeam/jquery-ajax-cache.svg?style=svg)](https://circleci.com/gh/WQTeam/jquery-ajax-cache)
[![npm](https://img.shields.io/npm/dt/jquery-ajax-cache.svg)](https://www.npmjs.com/package/jquery-ajax-cache)

Ajax Cache plugin backed by localStorage or sessionStorage for jQuery  


# Why jquery-ajax-cache？
    优点：  
        1、使用简单！
        2、还是使用简单！
        3、重要事情3遍，简单！
        4、最大可能的清除过期数据，避免溢出

# 下载
[下载](https://github.com/WQTeam/jquery-ajax-cache/releases) 最新 jquery-ajax-cache

bower
```javascript
bower install jquery-ajax-cache
```
npm
```javascript
npm install jquery-ajax-cache --save-dev
```


# 引入
```html
<script src="../node_modules/jquery/dist/jquery.js"></script>
<script src='../dist/jquery-ajax-cache.js'></script>
```

# 使用

## 全局配置
```javascript
$ajaxCache.config({
    // 业务逻辑判断请求是否缓存， res为ajax返回结果
    cacheValidate: function (res) {    //选填，配置全局的验证是否需要进行缓存的方法,“全局配置” 和 ”自定义“，至少有一处实现cacheValidate方法
        return res.state === 'ok';
    },
    storageType: 'localStorage', //选填，‘localStorage’ or 'sessionStorage', 默认‘localStorage’
    timeout: 60 * 60, //选填， 单位秒。默认1小时
});
```

## 简单使用
```javascript
$.ajax({
    // 使用时 只要增加给ajax请求增加一行属性   ajaxCache: true
    ajaxCache: true     // “全局配置” 和 ”自定义“，至少有一处实现cacheValidate方法
    /*
     others...
    */
});
```

## 自定义
```javascript
$.ajax(
    // 此处的参数会覆盖‘全局配置’中的设置
    ajaxCache: {
        // 业务逻辑判断请求是否缓存， res为ajax返回结果
        cacheValidate: function (res) { //选填，配置全局的验证是否需要进行缓存的方法, “全局配置” 和 ”自定义“，至少有一处实现cacheValidate方法
            return res.state === 'ok' && res.code ==='200';
        },
        storageType: 'localStorage', //选填，‘localStorage’ or 'sessionStorage', 默认‘localStorage’
        timeout: 60 * 60, //选填， 单位秒。默认1小时
    }
});
```
