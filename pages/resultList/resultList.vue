<script setup lang="ts">
import titleCom from '@/components/titleCom';
import { ref, onMounted } from 'vue';
import cardCom from '../result/components/card.vue';
import { getHistory } from '@/utils/api';
import empty from '@/components/empty.vue';
import skeleton from './components/skeleton.vue';
import type { objectType } from '@/types/index';
const List = ref<objectType[]>([]);
const loading = ref(true);
onMounted(() => {
  getHistory().then((res) => {
    console.log('res', res);
    List.value = res.data.data!;
    loading.value = false;
    console.log(' List.value', List.value);
  });
});
</script>
<template>
  <view class="result">
    <titleCom title="测额记录"></titleCom>
    <!-- #ifdef H5-->
    <uni-load-more iconType="circle" status="loading" v-if="loading" />
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <skeleton v-if="loading" />
    <!-- #endif -->
    <!--  <van-loading class="comLoading" v-if="loading" /> -->
    <empty text="暂无测额记录" v-if="!loading && !List.length" />
    <template v-if="!loading && List.length">
      <view v-for="(item, index) in List" :key="index">
        <view class="head">
          <text>测额时间：</text><text>{{ item.dateTime }}</text>
        </view>
        <cardCom
          :data="subitem"
          v-for="(subitem, subindex) in item.data"
          :key="subindex"
        >
        </cardCom>
      </view>
    </template>
  </view>
</template>
<style lang="less" scoped>
.result {
  background: url(https://static.dstp.com.cn/img/wx/jieguoye_bg01@2x.png)
    no-repeat;
  background-size: 100% 672rpx;

  padding-top: 32rpx;
  padding-bottom: 32rpx;
  height: auto;
  .head {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 32rpx;
    line-height: 44rpx;
    padding: 0 40rpx 0 44rpx;
    margin-bottom: 12rpx;
  }
}
</style>
