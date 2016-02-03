/*!
 *     jquery-ajax-cache -- Ajax Cache plugin backed by localStorage or sessionStorage for jQuery
 *     Version 1.0.3
 *     https://github.com/WQTeam/jquery-ajax-cache
 *     (c) 2013-2016 WQTeam, MIT license
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
	        value: function genCacheKey(options, originalOptions) {
	            var dataOrigin = originalOptions.data || {};
	            var key, dataString;
	            try {
	                if (typeof dataString !== 'string') {
	                    dataString = JSON.stringify(dataOrigin);
	                }
	                key = originalOptions.ajaxCache.cacheKey || originalOptions.url.replace(/jQuery.*/, '') + options.type.toUpperCase() + (dataString || '') + (originalOptions.ajaxCache.version || _config.defaultDataVersion);
	                key = md5(key);
	            } catch (e) {
	                console.error(e);
	            }
	            return key;
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

	    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {

	        var cacheProxy = $ajaxCache.getCacheProxy();

	        var ajaxCacheOptions = options.ajaxCache;

	        if (ajaxCacheOptions) {
	            var storage = cacheProxy.getStorage(ajaxCacheOptions.storageType);

	            if (!storage.isSupported()) {
	                return;
	            }

	            try {
	                // var data = options.data;
	                var cacheKey = cacheProxy.genCacheKey(options, originalOptions);
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
	    $.ajaxTransport("+*", function (options, originalOptions, jqXHR) {
	        var cacheProxy = $ajaxCache.getCacheProxy();
	        var ajaxCacheOptions = options.ajaxCache;

	        if (ajaxCacheOptions) {
	            var storage = cacheProxy.getStorage(ajaxCacheOptions.storageType);

	            if (!storage.isSupported()) {
	                return;
	            }

	            var cacheKey = cacheProxy.genCacheKey(options, originalOptions),
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