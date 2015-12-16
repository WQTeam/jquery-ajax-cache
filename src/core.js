export function addFilterToJquery($ajaxCache) {

    let $ = $ajaxCache.$;

    $.ajaxPrefilter(function(options) {

        let cacheProxy = $ajaxCache.getCacheProxy();

        let ajaxCacheOptions = options.ajaxCache;

        if(ajaxCacheOptions) {
            var storage = cacheProxy.getStorage(ajaxCacheOptions.storageType);

            if(!storage.isSupported()) {
                return;
            }

            try {
                var data = options.data && JSON.parse(options.data);
                var cacheKey = cacheProxy.genCacheKey(options);
                var value = storage.get(cacheKey);

                if (!value){
                    // If it not in the cache, we store the data, add success callback - normal callback will proceed
                    if (options.success) {
                        options.realsuccess = options.success;
                    }
                    options.success = function(data) {

                        var exp = defaultExpires;
                        if(typeof ajaxCacheOptions.timeout === 'number') {
                            exp = ajaxCacheOptions.timeout;
                        }
                        try {
                            let cacheValidateFun = ajaxCacheOptions.cacheValidate || cacheProxy.getCacheValidateFun();
                            if(typeof cacheValidateFun === 'function') {
                                if(cacheValidateFun.call()) {
                                    // 业务逻辑的判断这个请求是否真正成功的请求。
                                    storage.set(cacheKey, data, {exp: exp});
                                }
                            }
                            else {
                                console.error('cacheValidate must be a Function');
                            }
                        } catch(e){
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
    $.ajaxTransport("+*", function(options){
        let cacheProxy = $ajaxCache.getCacheProxy();
        let ajaxCacheOptions = options.ajaxCache;

        if (ajaxCacheOptions) {
            var storage = cacheProxy.getStorage(ajaxCacheOptions.storageType);

            if(!storage.isSupported()) {
                return;
            }

            var cacheKey = cacheProxy.genCacheKey(options),
            value = storage.get(cacheKey);

            if (value){
                console.log('read from localStorage cacahe!!');
                return {
                    send: function(headers, completeCallback) {
                        var response = {};
                        response['json'] = value;
                        completeCallback(200, 'success', response, '');
                    },
                    abort: function() {
                        console.log("Aborted ajax transport for json cache.");
                    }
                };
            }
        }
    });
}
