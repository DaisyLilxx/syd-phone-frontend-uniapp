<script setup lang="ts">
// import wx from 'weixin-js-sdk-ts';
// import { useRoute, useRouter } from 'vue-router';
// import { dealParamFromWxWebView } from '@/utils/common';
import { useUserStore, useHeaderStore } from '@/stores/index';
import { onLoad } from '@dcloudio/uni-app';
// import { getJsSDKConfigApi } from '@/apis/api';
// import { initConfig, setShareInfo } from '@/hooks/useWxSDK';
// import Tabbar from '@/components/tabbar.vue';
// const route = useRoute();
// const router = useRouter();
const UserStore = useUserStore();
const HeaderStore = useHeaderStore();
console.log('UserStore', UserStore);
// const weixinChat = window.localStorage.getItem('weixinChat') == 'true';
let loginRes = '';
onLoad((options) => {
  loginRes = options.loginRes;
});
// dealParamFromWxWebView();
// let wechatToken = '',
//   UserStore = '';
// try {
//   wechatToken = uni.getStorageSync('wechat-token');
//   UserStore = uni.getStorageSync('userMess');
// } catch (e) {
//   console.log('eee', e);
// }
const goList = () => {
  console.log('goList');
  if (loginRes || HeaderStore.headers['wechat-token']) {
    uni.navigateTo({
      url: '/pages/resultList/resultList',
    });
  } else
    uni.navigateTo({
      url: '/pages/login/login?referPage=/my',
    });
};
const goLogin = () => {
  // if (weixinChat) {
  //   wx.miniProgram.navigateTo({ url: '/pages/login/login?referPage=/my' });
  // } else {
  //   router.push({ path: 'login', query: { referPage: '/my' } });
  // }
  uni.navigateTo({
    url: '/pages/login/login?referPage=/my',
  });
};
</script>
<template>
  <view class="pageBg my">
    <!-- 上传图片功能测试 -->
    <!-- <button @click="chooseImageFromMiniProgram()">测试选择图片</button> -->
    <view class="company">
      <image class="img" src="@/static/images/my/profile_touxiang@2x.png" />
      <view>
        <view
          class="name"
          v-if="UserStore && UserStore.userMess && UserStore.userMess.username"
        >
          {{ UserStore.userMess.username }}
        </view>
        <view class="name" v-else @click="goLogin">请登录</view>
        <!--     <view class="phone">{{ UserStore.userMess.username }}</view> -->
      </view>
    </view>
    <view class="cont">
      <view class="list">
        <uni-list>
          <uni-list-item
            :show-extra-icon="true"
            @click="goList"
            clickable
            showArrow
            title="测额记录"
          >
            <template v-slot:header>
              <view class="slot-box">
                <image
                  class="slot-image"
                  src="/static/images/my/icon_ceejilu@2x.png"
                  mode="widthFix"
                ></image>
              </view>
            </template>
          </uni-list-item>
          <uni-list-item
            :show-extra-icon="true"
            to="/pages/customerService/customerService"
            showArrow
            title="联系客服"
          >
            <template v-slot:header>
              <view class="slot-box">
                <image
                  class="slot-image"
                  src="/static/images/my/icon_ceejilu1@2x.png"
                  mode="widthFix"
                ></image>
              </view>
            </template>
          </uni-list-item>
        </uni-list>
        <!-- <van-cell title="测额记录" is-link @click="goList" :border="false">
          <template #icon>
            <span class="span span1"></span>
          </template>
          <template #right-icon>
            <span class="arrow"></span>
          </template>
        </van-cell>
        <van-cell title="联系客服" is-link to="customerService" :border="false">
          <template #icon>
            <span class="span span2"></span>
          </template>
          <template #right-icon>
            <span class="arrow"></span>
          </template>
        </van-cell> -->
      </view>
    </view>
    <!-- <Tabbar :active="2"></Tabbar> -->
  </view>
</template>
<style lang="less" scoped>
.my {
  background-color: #f6f9fc;
  min-height: 100vh;
  padding-top: 164rpx;
  padding-bottom: 60rpx;
  .company {
    display: flex;
    align-items: center;
    padding: 52rpx 72rpx 60rpx;
    color: #fff;
    .img {
      width: 128rpx;
      height: 128rpx;
      margin-right: 24rpx;
    }
    .name {
      font-weight: 600;
      font-size: 36rpx;
      line-height: 50rpx;
    }
    .phone {
      font-size: 28rpx;
      line-height: 40rpx;
    }
  }
  .cont {
    background: url(https://static.dstp.com.cn/img/wx/mybg02@2x.png) no-repeat;
    background-size: 100% 100%;
    width: 718rpx;
    height: 548rpx;
    margin: 0 auto;
    margin-bottom: 380rpx;
    .list {
      padding: 146rpx 78rpx 22rpx 76rpx;
    }
  }
  :deep(.uni-list) {
    position: unset;
    .uni-list-item {
      position: unset;
    }
    .uni-list-item__content-title {
      font-weight: 600;
      font-size: 30rpx;
      color: #2b2b2b;
      line-height: 42rpx;
    }
  }
  .slot-box {
    display: flex;
  }
  .slot-image {
    display: inline-block;
    width: 48rpx;
    height: 48rpx;
    margin-right: 20rpx;
  }
  .span {
    display: inline-block;
    width: 48rpx;
    height: 48rpx;
    margin-right: 20rpx;
    &.span1 {
      background: url(https://static.dstp.com.cn/img/wx/icon_ceejilu@2x.png)
        no-repeat;
      background-size: 100% 100%;
    }
    &.span2 {
      background: url(https://static.dstp.com.cn/img/wx/icon_ceejilu1@2x.png)
        no-repeat;
      background-size: 100% 100%;
    }
    &.span3 {
      background: url(https://static.dstp.com.cn/img/wx/icon_ceejilu3@2x.png)
        no-repeat;
      background-size: 100% 100%;
    }
  }
  .arrow {
    display: inline-block;
    width: 20rpx;
    height: 20rpx;
    background: url(https://static.dstp.com.cn/img/wx/personal_center_icon_forward03@2x.png)
      no-repeat;
    background-size: 100% 100%;
  }
  .loginBar {
    width: calc(100% - 56rpx);
    margin: 0 auto;
    border-radius: 32rpx;
    height: 120rpx;
    background: #ffffff;
    display: flex;
    padding-left: 64rpx;
    // :deep(.van-cell) {
    //   margin-bottom: 0;
    // }
  }
  // :deep(.van-cell) {
  //   align-items: center;
  //   padding: 0;
  //   margin-bottom: 48rpx;
  //   border-radius: 32rpx;
  // }
  // :deep(.van-cell__title) {
  //   font-weight: 600;
  //   font-size: 30rpx;
  //   color: #2b2b2b;
  //   line-height: 42rpx;
  // }
}
</style>
