# jquery-ajax-cache
Ajax Cache plugin backed by localStorage or sessionStorage for jQuery

# 使用

## 全局配置
```javascript
$ajaxCache.config({
    cacheValid: function (res) {    //选填，配置全局的验证是否需要进行缓存的方法,“全局配置” 和 ”自定义“，至少有一处实现cacheValid方法
        return res.state === 'ok';
    },
    storageType: 'localStorage', //选填，‘localStorage’ or 'sessionStorage', 默认‘localStorage’
    timeOut: 60 * 60, //选填， 单位秒。默认1小时
});
```

## 简单使用
```javascript
$.ajax({
    ajaxCache: true     // “全局配置” 和 ”自定义“，至少有一处实现cacheValid方法
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
        cacheValid: function (res) { //选填，配置全局的验证是否需要进行缓存的方法, “全局配置” 和 ”自定义“，至少有一处实现cacheValid方法
            return res.state === 'ok' && res.code ==='200';
        },
        storageType: 'localStorage', //选填，‘localStorage’ or 'sessionStorage', 默认‘localStorage’
        timeOut: 60 * 60, //选填， 单位秒。默认1小时
    }
});
```
