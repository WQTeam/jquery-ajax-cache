# jquery-ajax-cache
[![Build Status](https://travis-ci.org/WQTeam/jquery-ajax-cache.svg)](https://travis-ci.org/WQTeam/jquery-ajax-cache)
[![npm](https://img.shields.io/npm/dt/jquery-ajax-cache.svg)](https://www.npmjs.com/package/jquery-ajax-cache)

<b>jquery-ajax-cache plugin</b> extends `$.ajax` of jQuery and it supplies a convenient method to cache the request of ajax to 'localStorage' or 'sessionStorage'. The only thing you need to do is implement `cacheValidate` method and validate that return result whether it needs cache or not. This plugin will automatically clean the expired data during the page loading and the data reading and writing for avoiding the data over stack. Also you can invoke `$ajaxCache.deleteAllExpires()` to clean the expired data by yourself.

# Why jquery-ajax-cache？
### Advantage  

1、EASY USAGE！  
2、EASY USAGE！！  
3、EASY USAGE！！！  
4、Clean the expired data as much as possible.  

# Download
[Download](https://github.com/WQTeam/jquery-ajax-cache/releases) the latest jquery-ajax-cache

bower
```javascript
bower install jquery-ajax-cache
```
npm
```javascript
npm install jquery-ajax-cache --save-dev
```


# Insert to HTML file
```html
<script src="../node_modules/jquery/dist/jquery.js"></script>
<script src='../dist/jquery-ajax-cache.min.js'></script>
```

# Usage
In practiced usage, the server maybe return back the successful response info or the failed response info, so we usually only need to cache the successful response info. jquery-ajax-cache plugin give a method `cacheValidate` to the user to judge the request whether it is successful or failed.  

### setup global `cacheValidate`
```javascript
$ajaxCache.config({
    // the business logic judges if the request needs cache or not. res is returned by ajax. options is the params of $.ajax
    cacheValidate: function (res, options) {   //Optional. Setup the global validation that if it needs cache ajax request.
                                               //Note: There must be at less one method that need implement the property cacheValidate. Either global setting or manual setting.

        return true;  // all requests will be cached

        // return res.state === 'ok'; // ajax request will be cached if the request fulfil the condition you require

        // return false; // no ajax will be cached
    },
    storageType: 'localStorage', //Optional. ‘localStorage’ or 'sessionStorage', default value is ‘localStorage’
    timeout: 60 * 60, //Optional. the unit is second. default value is 1 hour
});

$.ajax({
    // the only thing you need to do is plus ajaxCache property while you invoke $.ajax request.
    ajaxCache: true     // Note: There must be at less one method that need implement the property cacheValidate. Either global setting or manual setting.
    /*
     others...
    */
});

```

### manual request setup `cacheValidate`
```javascript
$.ajax(
    // the params below will cover the global params
    ajaxCache: {
      // the business logic judges if the request needs cache or not. res is returned by ajax. options is the params of $.ajax
        cacheValidate: function (res, options) { //Optional. Setup the global validation that if it needs cache ajax request.
                                                 //Note: There must be at less one method that need implement the property cacheValidate. Either global setting or manual setting.

            return true;  // all requests will be cached

            // return res.state === 'ok'; //  ajax request will be cached if the request fulfil the condition you require

            // return false; // no ajax will be cached
        },
        storageType: 'localStorage', //Optional. ‘localStorage’ or 'sessionStorage', default value is ‘localStorage’
        timeout: 60 * 60, //Optional. the unit is second. default value is 1 hour
        forceRefresh: false //Optional. default value is false.
                            //if it need force refresh the request. (if the value is true, the request will get the data from server but not from the cache and it will refresh the cache if the request succeed. For example: the business logic of pull-down to refresh)
    }
});
```
### clean the expired data
If you do not have any special case to clean the expired data, you do not need to invoke this function. The plugin can automatically clean the expired data by itself.

```javascript
$ajaxCache.deleteAllExpires();
```
