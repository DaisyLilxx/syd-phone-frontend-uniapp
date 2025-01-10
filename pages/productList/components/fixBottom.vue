<script setup lang="ts">
// import { useRouter } from 'vue-router';
import { useHeaderStore } from '@/stores/index';
// import wx from 'weixin-js-sdk-ts';
// const router = useRouter();
const props = defineProps({});
const HeaderStore = useHeaderStore();
// const weixinChat = window.localStorage.getItem('weixinChat') == 'true';
const goCompleteMess = () => {
  if (HeaderStore.headers['wechat-token'])
    uni.navigateTo({ url: '/pages/completeMess/completeMess' });
  else {
    uni.navigateTo({ url: '/pages/login/login?referPage=/completeMess' });
    // if (weixinChat) {
    //   wx.miniProgram.navigateTo({
    //     url: '/pages/login/login?referPage=/completeMess',
    //   });
    // } else {
    //   router.push({ path: '/login', query: { referPage: '/completeMess' } });
    // }
  }
};
</script>
<template>
  <view class="fixBottom">
    <view class="botCont">
      <view class="cont">
        <view class="tit">精准测额还差一步</view>
        <view class="text">马上完善资料，即可获取精准额度</view>
        <view class="step">
          <view class="progress"></view>
          <text>60%</text>
        </view>
      </view>
      <view class="comSubBtn" @click="goCompleteMess">去测额</view>
    </view>
  </view>
</template>
<style lang="less" scoped>
.fixBottom {
  height: 514rpx;
  .botCont {
    position: fixed;
    bottom: -16rpx;
    left: -12rpx;
    height: 514rpx;
    background: url(https://static.dstp.com.cn/img/wx/img04@2x.png) no-repeat;
    background-size: cover;
    width: calc(100% + 24rpx);
    .cont {
      padding: 140rpx 91rpx 60rpx;
      .tit {
        font-weight: 600;
        font-size: 36rpx;
        line-height: 48rpx;
      }
      .text {
        color: #575757;
        font-size: 28rpx;
        margin-bottom: 40rpx;
        line-height: 48rpx;
      }
      .step {
        width: 594rpx;
        height: 12rpx;
        background: #d2e5f1;
        border-radius: 20rpx;
        position: relative;
        .progress {
          width: 372rpx;
          height: 12rpx;
          background: linear-gradient(
            270deg,
            #ff228e 0%,
            #5e22ff 30%,
            #3bcdff 87%,
            #1ef1e6 100%
          );
          border-radius: 20rpx;
        }
        span {
          position: absolute;
          left: 336rpx;
          width: 76rpx;
          height: 36rpx;
          background: #1f66fb;
          border-radius: 20rpx;
          border: 2rpx solid #ffffff;
          font-weight: 600;
          font-size: 24rpx;
          color: #ffffff;
          line-height: 34rpx;
          text-align: center;
          top: -15rpx;
        }
      }
    }
  }
}
</style>
