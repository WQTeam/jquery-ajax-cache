var WebStorageCache = require('../node_modules/web-storage-cache/dist/web-storage-cache.min.js');

export default class CacheProxy {
    constructor(options) {
        this.defaultExpires = 60 * 60;
        this.defaultStorageType = 'localStorage';
        this.storageMap = {
            sessionStorage: new WebStorageCache({
                storage: 'sessionStorage'
            }),
            localStorage: new WebStorageCache({
                storage: 'localStorage'
            })
        }
    }
    genCacheKey (AjaxOptions) {
        var dataString = AjaxOptions.data;
        try {
            dataString = JSON.stringify(AjaxOptions.data);
        } catch (e) {
            console.error(e);
        }
        return AjaxOptions.wsCache.cacheKey || AjaxOptions.url.replace(/jQuery.*/,'') + AjaxOptions.type.toUpperCase() + (dataString || '') + (AjaxOptions.wsCache.version || '1.0.0');
    };
}
