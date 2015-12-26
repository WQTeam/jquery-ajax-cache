/*!
 *     jquery-ajax-cache -- Ajax Cache plugin backed by localStorage or sessionStorage for jQuery
 *     Version 0.0.7
 *     https://github.com/WQTeam/jquery-ajax-cache
 *     (c) 2013-2015 WQTeam, MIT license
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.$ajaxCache = undefined;

	var _AjaxCache = __webpack_require__(2);

	var _core = __webpack_require__(4);

	var _config = __webpack_require__(1);

	var $ajaxCache;
	if (window[_config.globalCachePluginName]) {
	    console.warn(_config.globalCachePluginName + ' has existed!');
	} else {
	    if (!window.$) {
	        console.error('can not find jQuery in global!!');
	    }
	    exports.$ajaxCache = $ajaxCache = new _AjaxCache.AjaxCache($);
	    (0, _core.addFilterToJquery)($ajaxCache);
	}

	exports.$ajaxCache = $ajaxCache;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.defaultCacheValidate = defaultCacheValidate;
	var defaultTimeout = exports.defaultTimeout = 60 * 60;
	var defaultStorageType = exports.defaultStorageType = 'localStorage';
	var defaultDataVersion = exports.defaultDataVersion = '1.0.0';
	function defaultCacheValidate(response) {
	    console.warn('There is no cacheValidate function!!');
	    return false;
	}
	var globalCachePluginName = exports.globalCachePluginName = '$ajaxCache';

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AjaxCache = undefined;

	var _CacheProxy = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AjaxCache = exports.AjaxCache = (function () {
	    function AjaxCache($) {
	        _classCallCheck(this, AjaxCache);

	        this.$ = $;
	        this.cacheProxy = new _CacheProxy.CacheProxy();
	    }

	    _createClass(AjaxCache, [{
	        key: 'config',
	        value: function config(options) {
	            this.cacheProxy = new _CacheProxy.CacheProxy(options);
	        }
	    }, {
	        key: 'getCacheProxy',
	        value: function getCacheProxy() {
	            return this.cacheProxy;
	        }
	    }, {
	        key: 'deleteAllExpires',
	        value: function deleteAllExpires() {
	            this.cacheProxy.deleteAllExpires();
	        }
	    }]);

	    return AjaxCache;
	})();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CacheProxy = undefined;

	var _config = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WebStorageCache = __webpack_require__(5);

	function extend(obj, props) {
	    for (var key in props) {
	        obj[key] = props[key];
	    }return obj;
	}

	var CacheProxy = exports.CacheProxy = (function () {
	    function CacheProxy(options) {
	        _classCallCheck(this, CacheProxy);

	        var defaults = {
	            timeout: _config.defaultTimeout,
	            storageType: _config.defaultStorageType,
	            dataVersion: _config.defaultDataVersion,
	            cacheValidate: _config.defaultCacheValidate
	        };

	        var opt = extend(defaults, options);

	        this.defaultTimeout = opt.timeout;
	        this.storageType = opt.storageType;
	        this.dataVersion = opt.dataVersion;
	        this.cacheValidate = opt.cacheValidate;

	        this.storageMap = {
	            sessionStorage: new WebStorageCache({
	                storage: 'sessionStorage'
	            }),
	            localStorage: new WebStorageCache({
	                storage: 'localStorage'
	            })
	        };
	        // 清除已过期数据
	        this.deleteAllExpires();
	    }

	    _createClass(CacheProxy, [{
	        key: 'genCacheKey',
	        value: function genCacheKey(AjaxOptions) {
	            var dataString = AjaxOptions.data;
	            try {
	                dataString = JSON.stringify(AjaxOptions.data);
	            } catch (e) {
	                console.error(e);
	            }
	            return AjaxOptions.ajaxCache.cacheKey || AjaxOptions.url.replace(/jQuery.*/, '') + AjaxOptions.type.toUpperCase() + (dataString || '') + (AjaxOptions.ajaxCache.version || this.defaultDataVersion);
	        }
	    }, {
	        key: 'getStorage',
	        value: function getStorage(type) {
	            return this.storageMap[type] || this.storageMap[this.storageType] || this.storageMap['localStorage'];
	        }
	    }, {
	        key: 'getCacheValidateFun',
	        value: function getCacheValidateFun() {
	            return this.cacheValidate;
	        }
	    }, {
	        key: 'deleteAllExpires',
	        value: function deleteAllExpires() {
	            this.storageMap.sessionStorage.deleteAllExpires();
	            this.storageMap.localStorage.deleteAllExpires();
	        }
	    }]);

	    return CacheProxy;
	})();

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addFilterToJquery = addFilterToJquery;
	function addFilterToJquery($ajaxCache) {

	    var $ = $ajaxCache.$;

	    $.ajaxPrefilter(function (options) {

	        var cacheProxy = $ajaxCache.getCacheProxy();

	        var ajaxCacheOptions = options.ajaxCache;

	        if (ajaxCacheOptions) {
	            var storage = cacheProxy.getStorage(ajaxCacheOptions.storageType);

	            if (!storage.isSupported()) {
	                return;
	            }

	            try {
	                var data = options.data && JSON.parse(options.data);
	                var cacheKey = cacheProxy.genCacheKey(options);
	                var value = storage.get(cacheKey);

	                if (!value) {
	                    // If it not in the cache, we store the data, add success callback - normal callback will proceed
	                    if (options.success) {
	                        options.realsuccess = options.success;
	                    }
	                    options.success = function (data) {

	                        var exp = cacheProxy.defaultTimeout;
	                        if (typeof ajaxCacheOptions.timeout === 'number') {
	                            exp = ajaxCacheOptions.timeout;
	                        }
	                        try {
	                            var cacheValidateFun = ajaxCacheOptions.cacheValidate || cacheProxy.getCacheValidateFun();
	                            if (typeof cacheValidateFun === 'function') {
	                                if (cacheValidateFun.call(null, data, options)) {
	                                    // 业务逻辑的判断这个请求是否真正成功的请求。
	                                    storage.set(cacheKey, data, { exp: exp });
	                                }
	                            } else {
	                                console.error('cacheValidate must be a Function');
	                            }
	                        } catch (e) {
	                            console.error(e);
	                        }
	                        if (options.realsuccess) options.realsuccess(data);
	                    };
	                }
	            } catch (e) {
	                console.error(e);
	            }
	        } else {
	            return;
	        }
	    });

	    /**
	    * This function performs the fetch from cache portion of the functionality needed to cache ajax
	    * calls and still fulfill the jqXHR Deferred Promise interface.
	    * See also $.ajaxPrefilter
	    * @method $.ajaxTransport
	    * @params options {Object} Options for the ajax call, modified with ajax standard settings
	    */
	    $.ajaxTransport("+*", function (options) {
	        var cacheProxy = $ajaxCache.getCacheProxy();
	        var ajaxCacheOptions = options.ajaxCache;

	        if (ajaxCacheOptions) {
	            var storage = cacheProxy.getStorage(ajaxCacheOptions.storageType);

	            if (!storage.isSupported()) {
	                return;
	            }

	            var cacheKey = cacheProxy.genCacheKey(options),
	                value = storage.get(cacheKey);

	            if (value) {
	                console.log('read from localStorage cacahe!!');
	                return {
	                    send: function send(headers, completeCallback) {
	                        var response = {};
	                        response['json'] = value;
	                        completeCallback(200, 'success', response, '');
	                    },
	                    abort: function abort() {
	                        console.log("Aborted ajax transport for json cache.");
	                    }
	                };
	            }
	        }
	    });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	    web-storage-cache -- Added `expires` attribute and serialize data with `JSON.parse` for the localStorage and sessionStorage.
	    Version 0.0.3
	    https://github.com/WQTeam/web-storage-cache
	    (c) 2013-2015 WQTeam, MIT license
	*/
	!function(a,b){ true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (b), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=b():a.WebStorageCache=b()}(this,function(){"use strict";function a(a,b){for(var c in b)a[c]=b[c];return a}function b(a){var b=!1;if(a&&a.setItem){b=!0;var c="__"+Math.round(1e7*Math.random());try{a.setItem(c,c),a.removeItem(c)}catch(d){b=!1}}return b}function c(a){var b=typeof a;return"string"===b?window[a]:a}function d(a){return"[object Date]"===Object.prototype.toString.call(a)&&!isNaN(a.getTime())}function e(a,b){if(b=b||new Date,"number"==typeof a?a=a===1/0?l:new Date(b.getTime()+1e3*a):"string"==typeof a&&(a=new Date(a)),a&&!d(a))throw new Error("`expires` parameter cannot be converted to a valid Date instance");return a}function f(a){var b=!1;if(a)if(a.code)switch(a.code){case 22:b=!0;break;case 1014:"NS_ERROR_DOM_QUOTA_REACHED"===a.name&&(b=!0)}else-2147024882===a.number&&(b=!0);return b}function g(a,b){this.c=(new Date).getTime(),b=b||l;var c=e(b);this.e=c.getTime(),this.v=a}function h(a){return a&&"c"in a&&"e"in a&&"v"in a?!0:!1}function i(a){var b=(new Date).getTime();return b<a.e}function j(a){return"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a)),a}function k(d){var e={storage:"localStorage",exp:1/0},f=a(e,d),g=c(f.storage),h=b(g);this.isSupported=function(){return h},h?(this.storage=g,this.quotaExceedHandler=function(a,b,c){if(console.warn("Quota exceeded!"),c&&c.force===!0){var d=this.deleteAllExpires();console.warn("delete all expires CacheItem : ["+d+"] and try execute `set` method again!");try{c.force=!1,this.set(a,b,c)}catch(e){console.warn(e)}}}):a(this,n)}var l=new Date("Fri, 31 Dec 9999 23:59:59 UTC"),m={serialize:function(a){return JSON.stringify(a)},deserialize:function(a){return a&&JSON.parse(a)}},n={set:function(){},get:function(){},"delete":function(){},deleteAllExpires:function(){},clear:function(){},add:function(){},replace:function(){},touch:function(){}},o={set:function(b,c,d){if(b=j(b),d=a({force:!0},d),void 0===c)return this["delete"](b);var e=m.serialize(c),h=new g(e,d.exp);try{this.storage.setItem(b,m.serialize(h))}catch(i){f(i)?this.quotaExceedHandler(b,e,d,i):console.error(i)}return c},get:function(a){a=j(a);var b=(this.storage.getItem(a),null);try{b=m.deserialize(this.storage.getItem(a))}catch(c){return null}if(h(b)){if(i(b)){var d=b.v;return m.deserialize(d)}this["delete"](a)}return null},"delete":function(a){return a=j(a),this.storage.removeItem(a),a},deleteAllExpires:function(){for(var a=this.storage.length,b=[],c=this,d=0;a>d;d++){var e=this.storage.key(d),f=null;try{f=m.deserialize(this.storage.getItem(e))}catch(g){}if(null!==f&&void 0!==f.e){var h=(new Date).getTime();h>=f.e&&b.push(e)}}return b.forEach(function(a){c["delete"](a)}),b},clear:function(){this.storage.clear()},add:function(b,c,d){b=j(b),d=a({force:!0},d);try{var e=m.deserialize(this.storage.getItem(b));if(!h(e)||!i(e))return this.set(b,c,d),!0}catch(f){return this.set(b,c,d),!0}return!1},replace:function(a,b,c){a=j(a);var d=null;try{d=m.deserialize(this.storage.getItem(a))}catch(e){return!1}if(h(d)){if(i(d))return this.set(a,b,c),!0;this["delete"](a)}return!1},touch:function(a,b){a=j(a);var c=(this.storage.getItem(a),null);try{c=m.deserialize(this.storage.getItem(a))}catch(d){return!1}if(h(c)){if(i(c))return this.set(a,this.get(a),{exp:b}),!0;this["delete"](a)}return!1}};return k.prototype=o,k});

/***/ }
/******/ ])
});
;