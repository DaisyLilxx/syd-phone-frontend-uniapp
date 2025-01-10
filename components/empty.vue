<script setup lang="ts">
// ts写法
const props = withDefaults(
  defineProps<{
    text: string;
    hasEmptyBg: boolean;
  }>(),
  {
    text: '暂无数据',
    hasEmptyBg: true,
  },
);
</script>
<template>
  <!-- emptyBg :带有背景和高度的暂无数据样式 -->
  <!-- emptyNoBg：无背景，无设置高度的暂无数据样式 -->
  <view :class="hasEmptyBg ? 'emptyBg' : 'emptyNoBg'">
    <view class="contWrap">
      <view class="robot"
        ><image src="https://static.dstp.com.cn/img/wx/robot.png" class="img"
      /></view>
      <view class="text">{{ props.text }}</view>
    </view>
  </view>
</template>
<style lang="less" scoped>
.emptyBg {
  width: 694rpx;
  height: 1398rpx;
  background: #ffffff;
  box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(222, 222, 222, 0.5);
  border-radius: 32rpx;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 0 60rpx;
  text-align: center;
}
.contWrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.emptyNoBg {
  width: 694rpx;

  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 60rpx;
  padding-top: 300rpx;
  text-align: center;
}
.robot {
  width: 287rpx;
  height: 248rpx;
  margin-bottom: 54rpx;
  margin-left: 113rpx;
  .img {
    width: 100%;
    height: 100%;
  }
}
.text {
  font-weight: 600;
  font-size: 32rpx;
  color: #2b2b2b;
  line-height: 60rpx;
}
</style>
