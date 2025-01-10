import { useRoute, useRouter } from 'vue-router';
import { useHeaderStore, useUserStore } from '@/stores/index';
import type { Headers } from '@/types/index';
//带小数点的千分位分隔符处理
export function toThousandsWithSmallNum(num: number, type: number) {
  if (type) {
    if (num != 0 && !num) return num;
  }
  const absNumVal: number = Math.abs(num);
  let preStr = '',
    smallNum = '',
    result = '';
  if (num < 0) preStr = '-'; //负数
  let absNum: string = (absNumVal || 0).toString();
  if (absNum.indexOf('.') > -1) {
    //带小数
    smallNum = `.${absNum.split('.')[1]}`;
    absNum = absNum.split('.')[0];
  }
  while (absNum.length > 3) {
    result = ',' + absNum.slice(-3) + result;
    absNum = absNum.slice(0, absNum.length - 3);
  }
  if (absNum) {
    result = absNum + result;
  }
  return preStr + result + smallNum;
}
// 处理小程序内嵌H5地址，传递的参数 openid,loginres等
export function dealParamFromWxWebView() {
  const route = useRoute();
  const HeaderStore = useHeaderStore();
  const UserStore = useUserStore();
  const loginRes = route.query.loginRes as string;
  const openId = route.query.openId as string;
  if (loginRes) {
    const loginResObj = JSON.parse(decodeURIComponent(loginRes));
    UserStore.setUserMessStore(loginResObj.userinfo);
    HeaderStore.setHeaderStore({ 'wechat-token': loginResObj.token });
    console.log('route', loginResObj);
  }
  if (openId) {
    const openIdStr = decodeURIComponent(openId);
    const headParam: Headers = {
      openId: openIdStr,
      channelCode: route.query.channelCode as string,
    };
    HeaderStore.setHeaderStore(headParam);
  }
}
// 存储适配器
export const storage = function () {
  console.log(
    'process.env.UNI_PLATFORM',
    process.env.UNI_PLATFORM,
    process.env.UNI_PLATFORM === 'mp-weixin',
  );
  if (process.env.UNI_PLATFORM === 'mp-weixin') {
    // 微信小程序
    return {
      setItem: (key, value) => wx.setStorageSync(key, value),
      getItem: (key) => wx.getStorageSync(key),
      removeItem: (key) => wx.removeStorageSync(key),
    };
  } else {
    // H5
    return {
      setItem: (key, value) => localStorage.setItem(key, value),
      getItem: (key) => localStorage.getItem(key),
      removeItem: (key) => localStorage.removeItem(key),
    };
  }
};
