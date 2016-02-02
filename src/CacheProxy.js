var WebStorageCache = require('../node_modules/web-storage-cache/dist/web-storage-cache.min.js');
var md5 = require('../node_modules/blueimp-md5/js/md5.js');
import {
    defaultTimeout,
    defaultStorageType,
    defaultDataVersion,
    defaultCacheValidate
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
            dataVersion: defaultDataVersion,
            cacheValidate: defaultCacheValidate
        };

        let opt = extend(defaults, options);

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
        }
        // 清除已过期数据
        this.deleteAllExpires();
    }
    genCacheKey (options, originalOptions) {
        var dataOrigin = originalOptions.data || {};
        var key,dataString;
        try {
            if (typeof dataString !== 'string') {
                dataString = JSON.stringify(dataOrigin);
            }
            key = (originalOptions.ajaxCache.cacheKey || originalOptions.url.replace(/jQuery.*/,'') + options.type.toUpperCase() + (dataString || '') + (originalOptions.ajaxCache.version || defaultDataVersion))
            console.log(key);
            key = md5(key);
        } catch (e) {
            console.error(e);
        }
        console.log(key)
        return key;
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
