// src/request.ts
import { useHeaderStore } from '@/stores/index';
interface RequestOptions {
  url: string;
  method?:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'get'
    | 'post'
    | 'put'
    | 'delete';
  data?: any;
  headers?: { [key: string]: string };
}

interface ApiResponse<T> {
  code: string;
  flag: string;
  data: T;
  traceId: string;
  message: string;
}

const BASE_URL = import.meta.env.VITE_APP_BASE_URL; // API 的基础 URL
console.log('BASE_URLBASE_URLBASE_URL', BASE_URL);
// 封装请求函数
export function request<T = any>(
  options: RequestOptions,
): Promise<ApiResponse<T>> {
  return new Promise((resolve, reject) => {
    const headersData = useHeaderStore();

    // 如果需要确保 headers 存在

    const openId = headersData.headers.openId ? headersData.headers.openId : '';
    const token = headersData.headers['wechat-token'];
    console.log('tokentoken', token);
    const headers = {
      'Content-Type': 'application/json',
      'Wechat-Token': token || '',
      ...(options.headers || {}),
    };

    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        ...(headers || {}),
      },
      success: (res) => {
        console.log('eeeee', res);
        if (res.statusCode === 200) {
          // resolve(res.data);
          resolve({
            data: res.data as T,
            statusCode: res.statusCode,
            errMsg: res.errMsg,
          });
        } else {
          reject(new Error(res.errMsg || 'Request failed'));
        }
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}
