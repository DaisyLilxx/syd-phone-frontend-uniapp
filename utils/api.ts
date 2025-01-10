import { request } from './request.ts';
import type {
  MatchProductParam,
  MobileParam,
  LoginParam,
  ItemValueParam,
  CalculateResultParam,
  BaseRes,
  Item,
  SubItem,
  MatchProductRes,
  MatchProduct,
  resultRes,
  objectType,
} from '@/types/index';
// 用于处理将提交的参数拼接在地址栏上
function buildUrlWithParams(
  url: string,
  params: { [key: string]: string | number },
) {
  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');
  return `${url}?${queryString}`;
}

// 验证码发送
export const sendMobileCode = (data: MobileParam) => {
  return request({
    url: '/dstp-auth/account/app/sendMobileCode',
    method: 'get',
    data,
  });
};
// 小程序验证码登录接口
export const login = (data: LoginParam) => {
  // 使用封装好的函数
  const urlWithParams = buildUrlWithParams(
    '/dstp-auth/wechat/authCode/login',
    data,
  );
  return request({
    url: urlWithParams,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'login-strategy': '10',
    },
  });
};
// 小程序下拉查询
export const selection = () => {
  return request<Item[]>({
    url: '/dstp-op/rest/api/app/financial/selection',
    method: 'get',
  });
};
// 获取匹配产品
export const matchProduct = (data: MatchProductParam) => {
  return request<MatchProductRes>({
    url: `/dstp-op/rest/api/app/financial/match/product`,
    method: 'post',
    data,
  });
};

// 获取额度测算提交的动态指标
export const getItemValue = (data: ItemValueParam) => {
  return request<object>({
    url: `/dstp-op/rest/api/app/financial/calculate/itemValue`,
    method: 'get',
    data,
  });
};
// 提交并获取额度测算结果
export const calculateResult = (data: CalculateResultParam) => {
  return request<resultRes>({
    url: `/dstp-op/rest/api/app/financial/calculate/result`,
    method: 'post',
    data,
  });
};
// 获取额度测算结果
export const getCalculateResult = (data: ItemValueParam) => {
  return request<resultRes>({
    url: `/dstp-op/rest/api/app/financial/calculate/result`,
    method: 'get',
    data,
  });
};

// 获取额度测算详情查询接口
export const getCalculateResultDetail = (id: number) => {
  return request<resultRes>({
    url: `/dstp-op/rest/api/app/financial/calculate/result/${id}`,
    method: 'get',
  });
};
// 获取推荐匹配产品 查询接口
export const getProductList = (data: ItemValueParam) => {
  return request<objectType[]>({
    url: `/dstp-op/rest/api/app/financial/match/product`,
    method: 'get',
    data,
  });
};
// 获取推荐匹配产品详情 查询接口
export const getProductDetail = (id: string) => {
  return request<objectType>({
    url: `/dstp-op/rest/api/app/financial/match/product/${id}`,
    method: 'get',
  });
};
// 测额记录
export const getHistory = () => {
  return request({
    url: `/dstp-op/rest/api/app/financial/calculate/result/history`,
    method: 'get',
  });
};

export const loginWx = (data, header = {}) => {
  return request({
    url: '/dstp-auth/wechat/authCode/login',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...header,
    },
  });
};
//微信小程序授权手机号获取接口
export const getUserMobile = (data) => {
  return request({
    url: `/dstp-op/rest/api/app/financial/userMobile`,
    method: 'get',
    data,
  });
};
