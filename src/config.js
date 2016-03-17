export const defaultTimeout = 60 * 60; // 1 hour
export const defaultStorageType = 'localStorage';
export function defaultCacheValidate(response) {
    console.warn('There is no cacheValidate function!!');
    return false;
}
export function defaultPreGenCacheKey(ajaxOptions, originalOptions) {
    var dataOrigin = originalOptions.data || {};
    var key,dataString;
    try {
        if (typeof dataString !== 'string') {
            dataString = JSON.stringify(dataOrigin);
        }
        key = originalOptions.url.replace(/jQuery.*/,'') + ajaxOptions.type.toUpperCase() + (dataString || '')
    } catch (e) {
        console.error(e);
    }
    return key;
}
