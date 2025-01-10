<script lang="ts" setup>
// ts写法
const props = withDefaults(
  defineProps<{
    title: string;
  }>(),
  {
    title: '',
  },
);
const goBack = () => {
  uni.navigateBack({
    delta: 1,
  });
};
</script>
<template>
  <view class="titleCom">
    <view class="leftWrap" @click="goBack">
      <image class="leftImg" src="../static/images/jinrujiantouxiao@2x.png" />
    </view>
    <text class="tit" v-if="title">{{ title }}</text>
    <image
      class="titImg"
      v-if="!title"
      src="https://static.dstp.com.cn/img/wx/story_logo@2x.png"
    />
    <text></text>
  </view>
</template>
<style lang="less" scoped>
.titleCom {
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 92rpx 44rpx 0rpx;
  .leftWrap {
    padding: 15rpx;
    display: flex;
    align-items: center;
  }
  .leftImg {
    width: 34rpx;
    height: 32rpx;
  }
  .titImg {
    width: 446rpx;
    height: 106rpx;
  }
  .tit {
    font-size: 32rpx;
    color: #ffffff;
    line-height: 44rpx;
  }
}
</style>
