<script setup lang="ts">
import { toThousandsWithSmallNum } from '@/utils/common.ts';
const props = defineProps<{
  isBig: boolean;
  data: object;
}>();
let imgUrlPre = import.meta.env.VITE_APP_BASE_URL;
console.log('props', props);
</script>
<template>
  <view class="card" :class="{ bigCrad: isBig }">
    <view class="head">
      <image
        class="img"
        :src="`${imgUrlPre}/dstp-op/rest/api/app/financial/picture/preview?path=${props.data.bankIconUrl}`"
      /><text>{{ props.data.bank }}｜{{ props.data.productName }}</text>
    </view>
    <view class="text1">预测可借贷额度({{ props.data.currency }})</view>
    <view class="text2">{{
      toThousandsWithSmallNum(props.data.creditAmount)
    }}</view>
    <view class="text3">{{ props.data.interestRateDescribe }}</view>
    <slot name="action"></slot>
  </view>
</template>
<style lang="less" scoped>
.card {
  padding: 34rpx 52rpx 74rpx;
  width: calc(100% - 32rpx);
  margin: 0 auto;
  height: 384rpx;
  color: #ffffff;
  :deep(uni-button:after) {
    border: none;
  }
  &:nth-child(odd) {
    background: url(https://static.dstp.com.cn/img/wx/jieguoye_img01@2x.png)
      no-repeat;
    background-size: 100%;
  }
  &:nth-child(even) {
    background: url(https://static.dstp.com.cn/img/wx/jieguoye_img02@2x.png)
      no-repeat;
    background-size: 100%;
  }
  &.bigCrad {
    &:nth-child(odd) {
      background: url(https://static.dstp.com.cn/img/wx/1.png) no-repeat;
      background-size: 100%;
      height: 490rpx;
    }
    &:nth-child(even) {
      background: url(https://static.dstp.com.cn/img/wx/2.png) no-repeat;
      background-size: 100%;
      height: 490rpx;
    }
  }
  .head {
    display: flex;
    align-items: center;
    font-size: 36rpx;
    line-height: 42rpx;
    margin-bottom: 44rpx;
    .img {
      width: 52rpx;
      height: 52rpx;
      margin-right: 20rpx;
      border-radius: 26rpx;
    }
  }
  .text1 {
    font-size: 28rpx;
    line-height: 40rpx;
    margin-bottom: 6rpx;
  }
  .text2 {
    font-weight: bold;
    font-size: 72rpx;
    line-height: 84rpx;
    margin-bottom: 10rpx;
  }
  .text3 {
    font-weight: 500;
    font-size: 28rpx;
    line-height: 40rpx;
  }
}
</style>
