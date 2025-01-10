<script setup lang="ts">
import titleCom from '@/components/titleCom';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getProductDetail } from '@/utils/api';
import fixBottom from '../productList/components/fixBottom.vue';
// const route = useRoute();
const resData = ref({});
onLoad((options) => {
  getProductDetail(options.id).then((res) => {
    resData.value = res.data.data!;
  });
});
</script>
<template>
  <view class="pageBg productDetail">
    <titleCom></titleCom>
    <view class="main">
      <view class="block">
        <text class="text text1"></text>
        <view class="cont">
          <view class="name">适用客户</view>
          <view class="texts">{{ resData.applicableCustomer }}</view>
        </view>
      </view>
      <view class="block">
        <text class="text text2"></text>
        <view class="cont">
          <view class="name">
            {{
              resData.productName == '信用证融资' ? '开证服务费' : '年化利率'
            }}
          </view>
          <view class="texts">{{ resData.interestRate }}</view>
        </view>
      </view>
      <view class="block">
        <text class="text text3"></text>
        <view class="cont">
          <view class="name">授信额度({{ resData.currency }})</view>
          <view class="texts">{{ resData.limitAmount }}</view>
        </view>
      </view>
      <view class="block">
        <text class="text text4"></text>
        <view class="cont">
          <view class="name">还款方式</view>
          <view class="texts">{{ resData.repaymentMode }}</view>
        </view>
      </view>
      <view class="block">
        <text class="text text5"></text>
        <view class="cont noBor">
          <view class="name">还款期限</view>
          <view class="texts">{{ resData.repaymentPeriod }}</view>
        </view>
      </view>
    </view>
    <view class="tipText">
      各数字金融产品为对应资金方所有，资金方承担贷款审核、放款的责任。展示额度和利率仅供参考，最终利率和额度请以资金方审批为准。
    </view>
    <fixBottom />
  </view>
</template>
<style lang="less" scoped>
.productDetail {
  padding-top: 32rpx;
  background-color: #f6f9fc;
  .main {
    background: url(https://static.dstp.com.cn/img/wx/bg02@2x.png) no-repeat;
    background-size: cover;
    min-height: 738rpx;
    padding: 62rpx 62rpx 32rpx 80rpx;
    .block {
      display: flex;
      margin-bottom: 24rpx;
      .text {
        display: inline-block;
        width: 32rpx;
        height: 32rpx;
        margin-right: 12rpx;
        &.text1 {
          background: url(https://static.dstp.com.cn/img/wx/icon_name1@2x.png)
            no-repeat;
          background-size: 32rpx 32rpx;
        }
        &.text2 {
          background: url(https://static.dstp.com.cn/img/wx/icon_name2@2x.png)
            no-repeat;
          background-size: 32rpx 32rpx;
        }
        &.text3 {
          background: url(https://static.dstp.com.cn/img/wx/icon_name3@2x.png)
            no-repeat;
          background-size: 32rpx 32rpx;
        }
        &.text4 {
          background: url(https://static.dstp.com.cn/img/wx/icon_name4@2x.png)
            no-repeat;
          background-size: 32rpx 32rpx;
        }
        &.text5 {
          background: url(https://static.dstp.com.cn/img/wx/icon_name5@2x.png)
            no-repeat;
          background-size: 32rpx 32rpx;
        }
      }
      .cont {
        padding-bottom: 22rpx;
        border-bottom: 2rpx solid #dee4f1;
        width: calc(100% - 44rpx);
        &.noBor {
          border-bottom: none;
        }
        .name {
          font-weight: 600;
          font-size: 24rpx;
          color: #1451d1;
          line-height: 34rpx;
          margin-bottom: 12rpx;
        }
        .texts {
          font-size: 28rpx;
          color: #2b2b2b;
          line-height: 40rpx;
        }
      }
    }
  }
  .tipText {
    margin: 10rpx 29rpx 29rpx;
    font-size: 24rpx;
    color: #8b8b8b;
    line-height: 32rpx;
  }
}
</style>
