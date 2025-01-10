<script setup lang="ts">
import titleCom from '@/components/titleCom';
import { ref, onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import cardCom from './components/card.vue';
import { useSerialNoStore } from '@/stores/index';
import { getCalculateResult } from '@/utils/api';
import empty from '@/components/empty.vue';
import skeleton from './components/skeleton.vue';
const SerialNoStore = useSerialNoStore();
const List = ref([]);
const loading = ref(true);
// const router = useRouter();
const goCustomer = () => {
  uni.navigateTo({
    url: '/pages/customerService/customerService',
  });
};
onMounted(() => {
  // 测试流水号 'CE202409181142190019'
  getCalculateResult({ serialNo: SerialNoStore.serialNo }).then((res) => {
    console.log('res', res);
    List.value = res.data.data!;
    console.log('List.valueList.value', List.value);
    loading.value = false;
    console.log(' List.value', List.value);
  });
});
</script>
<template>
  <view class="result">
    <titleCom></titleCom>
    <!-- <van-loading class="comLoading" /> -->
    <!-- #ifdef H5-->
    <uni-load-more iconType="circle" status="loading" v-if="loading" />
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <skeleton v-if="loading" />
    <!-- #endif -->
    <empty
      text="不满足授信条件，暂无法评估您的授信额度。"
      :hasEmptyBg="false"
      v-if="!loading && !List.length"
    />

    <template v-if="!loading && List.length">
      <cardCom
        :isBig="true"
        :data="item"
        v-for="(item, index) in List"
        :key="index"
      >
        <template #action>
          <view class="whiteWrap">
            <button class="comWhiteBtn" @click="goCustomer" type="button">
              立即申请
            </button>
            <view class="comRightIcon">{{ item.promotionLabel }}</view>
          </view>
        </template>
      </cardCom>
    </template>
  </view>
</template>
<style lang="less" scoped>
.result {
  background: url(https://static.dstp.com.cn/img/wx/jieguoye_bg01@2x.png)
    no-repeat;
  background-size: 100% 672rpx;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 32rpx;
}
</style>
