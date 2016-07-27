/*!
 *     jquery-ajax-cache -- Ajax Cache plugin backed by localStorage or sessionStorage for jQuery
 *     Version 2.0.1
 *     https://github.com/WQTeam/jquery-ajax-cache
 *     (c) 2013-2016 WQTeam, MIT license
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["$ajaxCache"] = factory();
	else
		root["$ajaxCache"] = factory();
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

	var _AjaxCache = __webpack_require__(1);

	module.exports = new _AjaxCache.AjaxCache();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AjaxCache = undefined;

	var _CacheProxy = __webpack_require__(2);

	var _core = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AjaxCache = exports.AjaxCache = (function () {
	    function AjaxCache() {
	        _classCallCheck(this, AjaxCache);
	    }

	    _createClass(AjaxCache, [{
	        key: 'config',
	        value: function config() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            this.cacheProxy = new _CacheProxy.CacheProxy(options);
	            this.$ = options.$ || window.$;
	            if (this.$ == null) {
	                console.error('AjaxCache Config Fail!!! can not find jQuery in `global` or `options`!!');
	                return;
	            }
	            (0, _core.addFilterToJquery)(this);
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CacheProxy = undefined;

	var _config = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WebStorageCache = __webpack_require__(6);
	var md5 = __webpack_require__(5);

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
	            cacheValidate: _config.defaultCacheValidate,
	            preGenCacheKey: _config.defaultPreGenCacheKey,
	            forceRefresh: false
	        };

	        var opt = extend(defaults, options);

	        this.defaultTimeout = opt.timeout;
	        this.storageType = opt.storageType;
	        this.cacheValidate = opt.cacheValidate;
	        this.preGenCacheKey = opt.preGenCacheKey;
	        this.forceRefresh = opt.forceRefresh;

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
	        value: function genCacheKey(options, originalOptions, customPreGenCacheKey) {

	            var fun = this.preGenCacheKey;
	            if (typeof customPreGenCacheKey === 'function') {
	                fun = customPreGenCacheKey;
	            }

	            return md5(fun(options, originalOptions));
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
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.defaultCacheValidate = defaultCacheValidate;
	exports.defaultPreGenCacheKey = defaultPreGenCacheKey;
	var defaultTimeout = exports.defaultTimeout = 60 * 60; // 1 hour
	var defaultStorageType = exports.defaultStorageType = 'localStorage';
	function defaultCacheValidate(response) {
	    console.warn('There is no cacheValidate function!!');
	    return false;
	}
	function defaultPreGenCacheKey(ajaxOptions, originalOptions) {
	    var dataOrigin = originalOptions.data || {};
	    var key, dataString;
	    try {
	        if (typeof dataString !== 'string') {
	            dataString = JSON.stringify(dataOrigin);
	        }
	        key = originalOptions.url.replace(/jQuery.*/, '') + ajaxOptions.type.toUpperCase() + (dataString || '');
	    } catch (e) {
	        console.error(e);
	    }
	    return key;
	}

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

	    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {

	        var cacheProxy = $ajaxCache.getCacheProxy();

	        var ajaxCacheOptions = options.ajaxCache;

	        if (ajaxCacheOptions) {
	            var storage = cacheProxy.getStorage(ajaxCacheOptions.storageType);

	            if (!storage.isSupported()) {
	                return;
	            }

	            try {
	                var cacheKey = cacheProxy.genCacheKey(options, originalOptions, ajaxCacheOptions.preGenCacheKey);
	                var value = storage.get(cacheKey);

	                // force reflash cache
	                if (ajaxCacheOptions.forceRefresh === true) {
	                    storage.delete(cacheKey);
	                    value = null;
	                }

	                if (!value) {
	                    // If it not in the cache, we store the data, add success callback - normal callback will proceed
	                    var realsuccess;
	                    if (options.success) {
	                        realsuccess = options.success;
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
	                        if (realsuccess) realsuccess(data);
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
	    $.ajaxTransport("+*", function (options, originalOptions, jqXHR) {
	        var cacheProxy = $ajaxCache.getCacheProxy();
	        var ajaxCacheOptions = options.ajaxCache;

	        if (ajaxCacheOptions) {
	            var storage = cacheProxy.getStorage(ajaxCacheOptions.storageType);

	            if (!storage.isSupported()) {
	                return;
	            }

	            var cacheKey = cacheProxy.genCacheKey(options, originalOptions, ajaxCacheOptions.preGenCacheKey),
	                value = storage.get(cacheKey);

	            if (value && ajaxCacheOptions.forceRefresh !== true) {
	                console.info('read from $ajaxCache:', value);
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

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * JavaScript MD5
	 * https://github.com/blueimp/JavaScript-MD5
	 *
	 * Copyright 2011, Sebastian Tschan
	 * https://blueimp.net
	 *
	 * Licensed under the MIT license:
	 * http://www.opensource.org/licenses/MIT
	 *
	 * Based on
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */

	/*jslint bitwise: true */
	/*global unescape, define, module */

	(function ($) {
	    'use strict';

	    /*
	    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	    * to work around bugs in some JS interpreters.
	    */
	    function safe_add(x, y) {
	        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
	            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	        return (msw << 16) | (lsw & 0xFFFF);
	    }

	    /*
	    * Bitwise rotate a 32-bit number to the left.
	    */
	    function bit_rol(num, cnt) {
	        return (num << cnt) | (num >>> (32 - cnt));
	    }

	    /*
	    * These functions implement the four basic operations the algorithm uses.
	    */
	    function md5_cmn(q, a, b, x, s, t) {
	        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	    }
	    function md5_ff(a, b, c, d, x, s, t) {
	        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	    }
	    function md5_gg(a, b, c, d, x, s, t) {
	        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	    }
	    function md5_hh(a, b, c, d, x, s, t) {
	        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	    }
	    function md5_ii(a, b, c, d, x, s, t) {
	        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	    }

	    /*
	    * Calculate the MD5 of an array of little-endian words, and a bit length.
	    */
	    function binl_md5(x, len) {
	        /* append padding */
	        x[len >> 5] |= 0x80 << (len % 32);
	        x[(((len + 64) >>> 9) << 4) + 14] = len;

	        var i, olda, oldb, oldc, oldd,
	            a =  1732584193,
	            b = -271733879,
	            c = -1732584194,
	            d =  271733878;

	        for (i = 0; i < x.length; i += 16) {
	            olda = a;
	            oldb = b;
	            oldc = c;
	            oldd = d;

	            a = md5_ff(a, b, c, d, x[i],       7, -680876936);
	            d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
	            c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
	            b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
	            a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
	            d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
	            c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
	            b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
	            a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
	            d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
	            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
	            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
	            a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
	            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
	            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
	            b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

	            a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
	            d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
	            c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
	            b = md5_gg(b, c, d, a, x[i],      20, -373897302);
	            a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
	            d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
	            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
	            b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
	            a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
	            d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
	            c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
	            b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
	            a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
	            d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
	            c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
	            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

	            a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
	            d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
	            c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
	            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
	            a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
	            d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
	            c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
	            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
	            a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
	            d = md5_hh(d, a, b, c, x[i],      11, -358537222);
	            c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
	            b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
	            a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
	            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
	            c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
	            b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

	            a = md5_ii(a, b, c, d, x[i],       6, -198630844);
	            d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
	            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
	            b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
	            a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
	            d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
	            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
	            b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
	            a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
	            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
	            c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
	            b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
	            a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
	            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
	            c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
	            b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

	            a = safe_add(a, olda);
	            b = safe_add(b, oldb);
	            c = safe_add(c, oldc);
	            d = safe_add(d, oldd);
	        }
	        return [a, b, c, d];
	    }

	    /*
	    * Convert an array of little-endian words to a string
	    */
	    function binl2rstr(input) {
	        var i,
	            output = '';
	        for (i = 0; i < input.length * 32; i += 8) {
	            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
	        }
	        return output;
	    }

	    /*
	    * Convert a raw string to an array of little-endian words
	    * Characters >255 have their high-byte silently ignored.
	    */
	    function rstr2binl(input) {
	        var i,
	            output = [];
	        output[(input.length >> 2) - 1] = undefined;
	        for (i = 0; i < output.length; i += 1) {
	            output[i] = 0;
	        }
	        for (i = 0; i < input.length * 8; i += 8) {
	            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
	        }
	        return output;
	    }

	    /*
	    * Calculate the MD5 of a raw string
	    */
	    function rstr_md5(s) {
	        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
	    }

	    /*
	    * Calculate the HMAC-MD5, of a key and some data (raw strings)
	    */
	    function rstr_hmac_md5(key, data) {
	        var i,
	            bkey = rstr2binl(key),
	            ipad = [],
	            opad = [],
	            hash;
	        ipad[15] = opad[15] = undefined;
	        if (bkey.length > 16) {
	            bkey = binl_md5(bkey, key.length * 8);
	        }
	        for (i = 0; i < 16; i += 1) {
	            ipad[i] = bkey[i] ^ 0x36363636;
	            opad[i] = bkey[i] ^ 0x5C5C5C5C;
	        }
	        hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
	        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
	    }

	    /*
	    * Convert a raw string to a hex string
	    */
	    function rstr2hex(input) {
	        var hex_tab = '0123456789abcdef',
	            output = '',
	            x,
	            i;
	        for (i = 0; i < input.length; i += 1) {
	            x = input.charCodeAt(i);
	            output += hex_tab.charAt((x >>> 4) & 0x0F) +
	                hex_tab.charAt(x & 0x0F);
	        }
	        return output;
	    }

	    /*
	    * Encode a string as utf-8
	    */
	    function str2rstr_utf8(input) {
	        return unescape(encodeURIComponent(input));
	    }

	    /*
	    * Take string arguments and return either raw or hex encoded strings
	    */
	    function raw_md5(s) {
	        return rstr_md5(str2rstr_utf8(s));
	    }
	    function hex_md5(s) {
	        return rstr2hex(raw_md5(s));
	    }
	    function raw_hmac_md5(k, d) {
	        return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
	    }
	    function hex_hmac_md5(k, d) {
	        return rstr2hex(raw_hmac_md5(k, d));
	    }

	    function md5(string, key, raw) {
	        if (!key) {
	            if (!raw) {
	                return hex_md5(string);
	            }
	            return raw_md5(string);
	        }
	        if (!raw) {
	            return hex_hmac_md5(key, string);
	        }
	        return raw_hmac_md5(key, string);
	    }

	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return md5;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module === 'object' && module.exports) {
	        module.exports = md5;
	    } else {
	        $.md5 = md5;
	    }
	}(this));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	* WebStorageCache - 0.0.3
	* https://github.com/WQTeam/web-storage-cache
	*
	* This is free and unencumbered software released into the public domain.
	*/
	(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.WebStorageCache = factory();
	    }
	}(this, function () {
	    "use strict";

	    var _maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');

	    // https://github.com/jeromegn/Backbone.localStorage/blob/master/backbone.localStorage.js#L63
	    var defaultSerializer = {
	        serialize: function (item) {
	            return JSON.stringify(item);
	        },
	        // fix for "illegal access" error on Android when JSON.parse is
	        // passed null
	        deserialize: function (data) {
	            return data && JSON.parse(data);
	        }
	    };

	    function _extend (obj, props) {
	        for (var key in props) obj[key] = props[key];
	        return obj;
	    }

	    /**
	    * https://github.com/gsklee/ngStorage/blob/master/ngStorage.js#L52
	    *
	    * When Safari (OS X or iOS) is in private browsing mode, it appears as
	    * though localStorage is available, but trying to call .setItem throws an
	    * exception below: "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was
	    * made to add something to storage that exceeded the quota."
	    */
	    function _isStorageSupported (storage) {
	        var supported = false;
	        if (storage && storage.setItem ) {
	            supported = true;
	            var key = '__' + Math.round(Math.random() * 1e7);
	            try {
	                storage.setItem(key, key);
	                storage.removeItem(key);
	            } catch (err) {
	                supported = false;
	            }
	        }
	        return supported;
	    }

	    // get storage instance
	    function _getStorageInstance (storage) {
	        var type = typeof storage;
	        if (type === 'string' && window[storage] instanceof Storage) {
	            return window[storage];
	        }
	        return storage;
	    }

	    function _isValidDate (date) {
	        return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
	    }

	    function _getExpiresDate (expires, now) {
	        now = now || new Date();

	        if (typeof expires === 'number') {
	            expires = expires === Infinity ?
	            _maxExpireDate : new Date(now.getTime() + expires * 1000);
	        } else if (typeof expires === 'string') {
	            expires = new Date(expires);
	        }

	        if (expires && !_isValidDate(expires)) {
	            throw new Error('`expires` parameter cannot be converted to a valid Date instance');
	        }

	        return expires;
	    }

	    // http://crocodillon.com/blog/always-catch-localstorage-security-and-quota-exceeded-errors
	    function _isQuotaExceeded(e) {
	        var quotaExceeded = false;
	        if (e) {
	            if (e.code) {
	                switch (e.code) {
	                    case 22:
	                    quotaExceeded = true;
	                    break;
	                    case 1014:
	                    // Firefox
	                    if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
	                        quotaExceeded = true;
	                    }
	                    break;
	                }
	            } else if (e.number === -2147024882) {
	                // Internet Explorer 8
	                quotaExceeded = true;
	            }
	        }
	        return quotaExceeded;
	    }

	    // cache item constructor
	    function CacheItemConstructor (value, exp) {
	        // createTime
	        this.c = (new Date()).getTime();
	        exp = exp || _maxExpireDate;
	        var expires = _getExpiresDate(exp);
	        // expiresTime
	        this.e = expires.getTime();
	        this.v = value;
	    }

	    function _isCacheItem(item) {
	        if (typeof item !== 'object') {
	            return false;
	        }
	        if(item) {
	            if('c' in item && 'e' in item && 'v' in item) {
	                return true;
	            }
	        }
	        return false;
	    }

	    // check cacheItem If effective
	    function _checkCacheItemIfEffective(cacheItem) {
	        var timeNow = (new Date()).getTime();
	        return timeNow < cacheItem.e;
	    }

	    function _checkAndWrapKeyAsString(key) {
	        if (typeof key !== 'string') {
	            console.warn(key + ' used as a key, but it is not a string.');
	            key = String(key);
	        }
	        return key;
	    }

	    // cache api
	    var CacheAPI = {

	        set: function (key, value, options) {},

	        get: function (key) {},

	        delete: function (key) {},
	        // Try the best to clean All expires CacheItem.
	        deleteAllExpires: function() {},
	        // Clear all keys
	        clear: function () {},
	        // Add key-value item to memcached, success only when the key is not exists in memcached.
	        add: function (key, options) {},
	        // Replace the key's data item in cache, success only when the key's data item is exists in cache.
	        replace: function (key, value, options) {},
	        // Set a new options for an existing key.
	        touch: function (key, exp) {}
	    };

	    // cache api
	    var CacheAPIImpl = {

	        set: function(key, val, options) {

	            key = _checkAndWrapKeyAsString(key);

	            options = _extend({force: true}, options);

	            if (val === undefined) {
	                return this.delete(key);
	            }

	            var value = defaultSerializer.serialize(val);

	            var cacheItem = new CacheItemConstructor(value, options.exp);
	            try {
	                this.storage.setItem(key, defaultSerializer.serialize(cacheItem));
	            } catch (e) {
	                if (_isQuotaExceeded(e)) { //data wasn't successfully saved due to quota exceed so throw an error
	                this.quotaExceedHandler(key, value, options, e);
	            } else {
	                console.error(e);
	            }
	        }

	        return val;
	    },
	    get: function (key) {
	        key = _checkAndWrapKeyAsString(key);
	        var cacheItem = null;
	        try{
	            cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
	        }catch(e){
	            return null;
	        }
	        if(_isCacheItem(cacheItem)){
	            if(_checkCacheItemIfEffective(cacheItem)) {
	                var value = cacheItem.v;
	                return defaultSerializer.deserialize(value);
	            } else {
	                this.delete(key);
	            }
	        }
	        return null;
	    },

	    delete: function (key) {
	        key = _checkAndWrapKeyAsString(key);
	        this.storage.removeItem(key);
	        return key;
	    },

	    deleteAllExpires: function() {
	        var length = this.storage.length;
	        var deleteKeys = [];
	        var _this = this;
	        for (var i = 0; i < length; i++) {
	            var key = this.storage.key(i);
	            var cacheItem = null;
	            try {
	                cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
	            } catch (e) {}

	            if(cacheItem !== null && cacheItem.e !== undefined) {
	                var timeNow = (new Date()).getTime();
	                if(timeNow >= cacheItem.e) {
	                    deleteKeys.push(key);
	                }
	            }
	        }
	        deleteKeys.forEach(function(key) {
	            _this.delete(key);
	        });
	        return deleteKeys;
	    },

	    clear: function () {
	        this.storage.clear();
	    },

	    add: function (key, value, options) {
	        key = _checkAndWrapKeyAsString(key);
	        options = _extend({force: true}, options);
	        try {
	            var cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
	            if (!_isCacheItem(cacheItem) || !_checkCacheItemIfEffective(cacheItem)) {
	                this.set(key, value, options);
	                return true;
	            }
	        } catch (e) {
	            this.set(key, value, options);
	            return true;
	        }
	        return false;
	    },

	    replace: function (key, value, options) {
	        key = _checkAndWrapKeyAsString(key);
	        var cacheItem = null;
	        try{
	            cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
	        }catch(e){
	            return false;
	        }
	        if(_isCacheItem(cacheItem)){
	            if(_checkCacheItemIfEffective(cacheItem)) {
	                this.set(key, value, options);
	                return true;
	            } else {
	                this.delete(key);
	            }
	        }
	        return false;
	    },

	    touch: function (key, exp) {
	        key = _checkAndWrapKeyAsString(key);
	        var cacheItem = null;
	        try{
	            cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
	        }catch(e){
	            return false;
	        }
	        if(_isCacheItem(cacheItem)){
	            if(_checkCacheItemIfEffective(cacheItem)) {
	                this.set(key, this.get(key), {exp: exp});
	                return true;
	            } else {
	                this.delete(key);
	            }
	        }
	        return false;
	    }
	};

	/**
	* Cache Constructor
	*/
	function CacheConstructor (options) {

	    // default options
	    var defaults = {
	        storage: 'localStorage',
	        exp: Infinity  //An expiration time, in seconds. default never .
	    };

	    var opt = _extend(defaults, options);

	    var storage = _getStorageInstance(opt.storage);

	    var isSupported = _isStorageSupported(storage);

	    this.isSupported = function () {
	        return isSupported;
	    };

	    if (isSupported) {

	        this.storage = storage;

	        this.quotaExceedHandler = function (key, val, options, e) {
	            console.warn('Quota exceeded!');
	            if (options && options.force === true) {
	                var deleteKeys = this.deleteAllExpires();
	                console.warn('delete all expires CacheItem : [' + deleteKeys + '] and try execute `set` method again!');
	                try {
	                    options.force = false;
	                    this.set(key, val, options);
	                } catch (err) {
	                    console.warn(err);
	                }
	            }
	        };

	    } else {  // if not support, rewrite all functions without doing anything
	        _extend(this, CacheAPI);
	    }

	}

	CacheConstructor.prototype = CacheAPIImpl;

	return CacheConstructor;

	}));


/***/ }
/******/ ])
});
;