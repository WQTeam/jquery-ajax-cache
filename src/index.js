import {AjaxCache} from './AjaxCache'
import {addFilterToJquery} from './core'
import {globalCachePluginName} from './config'

var $ajaxCache;
if (window[globalCachePluginName]) {
    console.warn(globalCachePluginName + ' has existed!');
} else {
    if (!window.$) {
        console.error('can not find jQuery in global!!');
    }
    $ajaxCache =  new AjaxCache($);
    addFilterToJquery($ajaxCache);
}

export {$ajaxCache}
