import http from '@/utils/https';
import ApiMap from './apiMap';

const combineApi = Object.assign({}, ApiMap);
type ApiMapType = typeof combineApi;
type ReadType<T, U> = { readonly [P in keyof T]?: U extends Function ? (params?: any) => Promise<any>:U }
type API = ReadType<ApiMapType, Function>;
type URL = ReadType<ApiMapType, string>;

const { keys } = Object;
function mapUrlObjToFuncObj (urlObj: ApiMapType) {
    const API = {};
    keys(urlObj).forEach((key) => {
        const item = urlObj[key];
        API[key] = async function (params) {
            // eslint-disable-next-line no-return-await
            return await http[item.method.toLowerCase()](item.url, params)
        }
    });
    return API;
}
function mapUrlObjToStrObj (urlObj: ApiMapType) {
    const Url = {};
    keys(urlObj).forEach((key) => {
        const item = urlObj[key]
        Url[key] = item.url
    });
    return Url;
}
export const API: API = mapUrlObjToFuncObj(combineApi);
export const URL: URL = mapUrlObjToStrObj(combineApi);
