export const defaultTimeout = 60 * 60;
export const defaultStorageType = 'localStorage';
export const defaultDataVersion = '1.0.0';
export function defaultCacheValidate(response) {
    console.warn('There is no cacheValidate function!!');
    return false;
}
export const globalCachePluginName = '$ajaxCache';
