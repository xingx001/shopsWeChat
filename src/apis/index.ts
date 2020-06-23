import http from '@/utils/https';
import ApiMap from './apiMap';
type ApiMapType = typeof ApiMap;
type ReadType<T, U> = { readonly [P in keyof T]?: U extends Function ? (params?: any) => Promise<any>:U }
type API = ReadType<ApiMapType, Function>;
type URL = ReadType<ApiMapType, string>;
type APItypeURL = {
  API:API,
  URL:URL
}
const { keys } = Object;

function mapUrlObjToFuncObj (urlObj: ApiMapType):APItypeURL {
    const API = {};
    const URL = {};
    keys(urlObj).forEach((key) => {
        const item = urlObj[key];
        URL[key] = item.url
        API[key] = async function (params) {
            // eslint-disable-next-line no-return-await
            return await http[item.method.toLowerCase()](item.url, params)
        }
    });
    return { API ,URL };
}
const { API,URL} = mapUrlObjToFuncObj(ApiMap);

export { API,URL};
