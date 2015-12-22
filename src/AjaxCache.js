import {CacheProxy} from './CacheProxy'

export class AjaxCache {
    constructor($) {
        this.$ = $;
        this.cacheProxy = new CacheProxy();
    }
    config (options) {
        this.cacheProxy = new CacheProxy(options);
    }
    getCacheProxy () {
        return this.cacheProxy;
    }
    deleteAllExpires () {
        this.cacheProxy.deleteAllExpires();
    }
}
