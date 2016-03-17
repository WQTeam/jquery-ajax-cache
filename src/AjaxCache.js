import {CacheProxy} from './CacheProxy';
import {addFilterToJquery} from './core';

export class AjaxCache {
    constructor() {
    }
    config (options = {}) {
        this.cacheProxy = new CacheProxy(options);
        this.$ = options.$ || window.$;
        if (this.$ == null) {
            console.error('AjaxCache Config Fail!!! can not find jQuery in `global` or `options`!!');
            return;
        }
        addFilterToJquery(this);
    }
    getCacheProxy () {
        return this.cacheProxy;
    }
    deleteAllExpires () {
        this.cacheProxy.deleteAllExpires();
    }
}
