<script setup lang="ts">
import titleCom from '@/components/titleCom';
import { onMounted, ref } from 'vue';
import skeleton from './components/skeleton.vue';
import { onLoad } from '@dcloudio/uni-app';
// import { useRouter, useRoute } from 'vue-router';
import { getProductList } from '@/utils/api';
import { useSerialNoStore } from '@/stores/index';
import type { MatchProduct } from '@/types/index';
import fixBottom from './components/fixBottom.vue';
import empty from '@/components/empty.vue';
// const router = useRouter();
// const route = useRoute();
const loading = ref(true);
const serialNoStore = useSerialNoStore();
const goDetail = (id: number) => {
  uni.navigateTo({ url: '/pages/productDetail/productDetail?id=' + id });
};
let imgUrlPre = import.meta.env.VITE_APP_BASE_URL;
const dataList = ref<MatchProduct[]>([]);
onLoad((options) => {
  getProductList({ serialNo: serialNoStore.serialNo }).then((res) => {
    dataList.value = res.data.data!;
    loading.value = false;
  });
});
</script>
<template>
  <view class="productList">
    <titleCom title="产品列表"></titleCom>
    <view class="mainWrap">
      <view class="main">
        <view class="tip">为您匹配到以下金融产品</view>
        <!-- #ifdef H5-->
        <uni-load-more iconType="circle" status="loading" v-if="loading" />
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <skeleton v-if="loading" />
        <!-- #endif -->
        <!--  <van-loading class="comLoading" v-if="loading" /> -->
        <empty
          text="暂无符合您条件的金融产品"
          :hasEmptyBg="false"
          v-if="!loading && !dataList.length"
        />
        <view class="list" v-if="!loading && dataList.length">
          <view
            class="li"
            :class="index % 2 == 0 ? 'orange' : 'pruple'"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <image
              :src="`${imgUrlPre}/dstp-op/rest/api/app/financial/picture/preview?path=${item.bankIconUrl}`"
              class="bankImg"
            />
            <view class="rightCont">
              <view class="head">
                <text class="name"
                  >{{ item.bank }}｜{{ item.productName }}</text
                >
                <view class="detail" @click="goDetail(item.productId)">
                  <text class="search_icon"></text>详情
                </view>
              </view>
              <view class="moneyCont">
                <view class="div">
                  <view class="name">额度({{ item.currency }}）</view>
                  <view class="money">{{ item.limitAmount }}</view>
                </view>
                <view class="div">
                  <view class="name">
                    {{
                      item.productName == '信用证融资' ? '开证服务费' : '利率'
                    }}
                  </view>
                  <!-- <view class="money">2.95%<text class="small">起</text></view> -->
                  <view class="money">{{ item.interestRate }}</view>
                </view>
              </view>
            </view>
          </view>
          <!-- <view class="pruple">
            <img src="~@/static/images/productList/icon_banklogo@2x.png" class="bankImg" />
            <view class="rightCont">
              <view class="head">
                <text class="name">中国银行｜科技通宝</text>
                <view class="detail" @click="goDetail"><text class="search_icon"></text>详情</view>
              </view>
              <view class="moneyCont">
                <view>
                  <view class="name">额度(元）</view>
                  <view class="money">20～400w</view>
                </view>
                <view>
                  <view class="name">利率</view>
                  <view class="money">2.95%<text class="small">起</text></view>
                </view>
              </view>
            </view>
          </view> -->
        </view>
      </view>
    </view>
    <fixBottom v-if="dataList.length" />
  </view>
</template>
<style lang="less" scoped>
.productList {
  background: url(https://static.dstp.com.cn/img/wx/home_bg01@2x.png) no-repeat;
  background-size: 100% 866rpx;
  background-color: #fff;
  width: 100%;
  padding-top: 46rpx;
  .comSubBtn {
    width: calc(100% - 84rpx);
    margin: 0 42rpx 46rpx;
  }
  .mainWrap {
    overflow-x: hidden;
    height: auto;
  }
  .main {
    background: url(https://static.dstp.com.cn/img/wx/img01@2x.png) no-repeat;
    background-position: 0 0;
    background-size: 100%;
    padding: 10rpx 27rpx;
    margin: 0;
    margin-left: -12rpx;
    margin-bottom: 40rpx;
    width: calc(100% + 24rpx);
    min-height: 100vh;
    height: 100%;
    .tip {
      padding: 40rpx 0 0 60rpx;
      font-weight: 600;
      font-size: 32rpx;
      color: #ffffff;
      line-height: 44rpx;
      margin-bottom: 80rpx;
    }
    .list {
      .li {
        width: 100%;
        min-height: 290rpx;
        display: flex;
        padding: 42rpx 52rpx 42rpx 54rpx;
        &.orange {
          background: url(https://static.dstp.com.cn/img/wx/img02@2x.png)
            no-repeat;
          background-size: 100% 100%;
        }
        &.pruple {
          background: url(https://static.dstp.com.cn/img/wx/img03@2x.png)
            no-repeat;
          background-size: 100% 100%;
        }
        .bankImg {
          width: 52rpx;
          height: 52rpx;
          margin-right: 20rpx;
          border-radius: 26rpx;
        }
        .rightCont {
          width: calc(100% - 72rpx);
          .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 20rpx;
            border-bottom: 2rpx solid #f1f1f1;
            .name {
              font-weight: 500;
              font-size: 30rpx;
              line-height: 42rpx;
              flex-shrink: 0;
              width: calc(100% - 140rpx);
            }
            .detail {
              min-width: 100rpx;
              height: 40rpx;
              background: #e9f3ff;
              border-radius: 32rpx;
              display: flex;
              align-items: center;
              padding: 10rpx 18rpx;
              color: #1f66fb;
              font-size: 20rpx;
              .search_icon {
                display: inline-block;
                margin-right: 4rpx;
                width: 20rpx;
                height: 20rpx;
                background: url(@/static/images/productList/icon_chakanxiangqing@2x.png)
                  no-repeat;
                background-size: cover;
              }
            }
          }
          .moneyCont {
            display: flex;
            padding-top: 26rpx;
            .div {
              width: 50%;
            }
            .name {
              font-size: 28rpx;
              color: #6b6b6b;
              line-height: 40rpx;
              margin-bottom: 6rpx;
            }
            .money {
              font-weight: bold;
              font-size: 44rpx;
              color: #2b2b2b;
              line-height: 56rpx;
              .small {
                font-size: 32rpx;
              }
            }
          }
        }
      }
    }
  }
}
</style>