var WebStorageCache = require('web-storage-cache');
var md5 = require('../node_modules/blueimp-md5/js/md5.js');

import {
    defaultTimeout,
    defaultStorageType,
    defaultDataVersion,
    defaultCacheValidate,
    defaultPreGenCacheKey
} from './config'

function extend (obj, props) {
    for (var key in props) obj[key] = props[key];
    return obj;
}

export class CacheProxy {
    constructor(options) {
        let defaults = {
            timeout: defaultTimeout,
            storageType: defaultStorageType,
            cacheValidate: defaultCacheValidate,
            preGenCacheKey: defaultPreGenCacheKey,
            forceRefresh: false
        };

        let opt = extend(defaults, options);

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
        }
        // 清除已过期数据
        this.deleteAllExpires();
    }
    genCacheKey (options, originalOptions, customPreGenCacheKey) {

        var fun = this.preGenCacheKey;
        if (typeof customPreGenCacheKey === 'function') {
            fun = customPreGenCacheKey;
        }

        return md5(fun(options, originalOptions));
    }
    getStorage (type) {
        return this.storageMap[type] || this.storageMap[this.storageType] || this.storageMap['localStorage'];
    }
    getCacheValidateFun() {
        return this.cacheValidate;
    }
    deleteAllExpires () {
        this.storageMap.sessionStorage.deleteAllExpires();
        this.storageMap.localStorage.deleteAllExpires();
    }
}
