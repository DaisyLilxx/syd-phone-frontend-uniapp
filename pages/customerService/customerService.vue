<script setup lang="ts">
import titleCom from '@/components/titleCom';
const goHelp = () => {
  window.open('https://www.dstp.com.cn/helpCenter-4341.html', '_blank');
};
</script>
<template>
  <view class="pageBg customerService">
    <titleCom></titleCom>
    <view class="block1">
      <view class="head">尊敬的用户</view>
      <view class="text bm10">
        请电脑登录全球数源中心：https://www.global-suyuan.com/，订阅融资数据集成服务。<text
          class="link"
          @click="goHelp"
          >订购指引>></text
        >
      </view>
      <view class="text"
        >系统已为您分配专属数字金融顾问，订购过程中有任何疑问，可随时与我们取得联系</view
      >
      <view class="codeWrap">
        <image class="img" src="https://static.dstp.com.cn/img/wx/chat.png" />
      </view>
    </view>
    <!-- <view class="block2">
      <view class="head">添加方法</view>
      <img src="@/static/images/customerService/danchuye_img02@2x.png" class="step" />
      <view class="cont">
        <view>
          <view>长按</view>
          <view>识别二维码</view>
        </view>
        <view>
          <view>打开</view>
          <view>企业微信名片</view>
        </view>
        <view>
          <view>添加</view>
          <view>到通讯录</view>
        </view>
      </view>
      <view class="botText">· 或截图本页面后使用微信扫一扫添加 ·</view>
    </view> -->
  </view>
</template>
<style lang="less" scoped>
.customerService {
  background-color: #f6f9fc;
  min-height: 100vh;
  padding-bottom: 214rpx;
  .block1 {
    background: url(https://static.dstp.com.cn/img/wx/danchuye_bg02@2x.png)
      no-repeat;
    background-size: 100% 100%;
    width: calc(100% - 32rpx);
    min-height: 770rpx;
    margin: 0 auto;
    text-align: center;
    padding: 80rpx 66rpx 60rpx;
    .head {
      font-weight: 600;
      font-size: 40rpx;
      line-height: 56rpx;
      margin-bottom: 20rpx;
    }
    .text {
      font-size: 28rpx;
      line-height: 40rpx;
      word-break: break-all;
      text-align: left;
      .link {
        color: #1451d1;
      }
      &.bm10 {
        margin-bottom: 15rpx;
      }
    }
    .codeWrap {
      margin: 0 auto;
      background: url(https://static.dstp.com.cn/img/wx/danchuye_img01@2x.png)
        no-repeat;
      background-size: 100%;
      width: 418rpx;
      height: 480rpx;
      padding: 108rpx 36rpx 36rpx 40rpx;
      .img {
        width: 341rpx;
        height: 336rpx;
      }
    }
  }
  .block2 {
    margin: 0 auto;
    width: 694rpx;
    height: 440rpx;
    background: #ffffff;
    box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(222, 222, 222, 0.5);
    border-radius: 32rpx;
    padding: 60rpx 37rpx 30rpx;
    text-align: center;
    .head {
      font-weight: 500;
      font-size: 32rpx;
      line-height: 44rpx;
      position: relative;
      margin-bottom: 60rpx;
      &::before {
        content: '';
        display: inline-block;
        width: 80rpx;
        height: 12rpx;
        position: absolute;
        left: 50%;
        top: 18rpx;
        margin-left: -5.5em;
        background: url(https://static.dstp.com.cn/img/wx/danchuye_sign01@2x.png)
          no-repeat;
        background-size: 100%;
      }
      &::after {
        content: '';
        display: inline-block;
        width: 80rpx;
        height: 12rpx;
        position: absolute;
        left: 50%;
        top: 18rpx;
        margin-left: 3em;
        background: url(https://static.dstp.com.cn/img/wx/danchuye_sign02@2x.png)
          no-repeat;
        background-size: 100%;
      }
    }
    .step {
      width: 532rpx;
      height: 28rpx;
      margin: 0 auto 16rpx;
    }
    .cont {
      font-size: 24rpx;
      line-height: 36rpx;
      display: flex;
      justify-content: space-between;
      text-align: center;
    }
    .botText {
      width: 100%;
      height: 60rpx;
      line-height: 60rpx;
      background: #f2f6ff;
      border-radius: 28rpx;
      margin-top: 70rpx;

      font-size: 24rpx;
      color: #575757;
    }
  }
}
</style>
