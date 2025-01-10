<script setup lang="ts">
// import wx from 'weixin-js-sdk-ts'
// import Tabbar from '@/components/tabbar.vue'
// import { useRouter } from 'vue-router'
// import { dealParamFromWxWebView } from '@/utils/common'
// const router = useRouter()
const goBland = () => {
  // window.location.href = 'https://book.yunzhan365.com/hyokc/csci/mobile/index.html'
  window.location.href = 'https://dstp.com/'
}
const goPg = () => {
  // if (window.localStorage.getItem('weixinChat') == 'true') {
  //   wx.miniProgram.redirectTo({ url: '/pages/index/index' })
  // } else router.push({ path: '/' })
  uni.switchTab({
  	url: '/pages/index/index'
  });
}
console.log("process.env.UNI_PLATFORM",process.env.UNI_PLATFORM)
// dealParamFromWxWebView()
</script>
<template>
  <view class="tabIndex">
    <view class="head">激活数据资产，开启数据价值变现之旅</view>
    <view class="stepWrap">
      <view class="stepUl">
        <view class="li">
          <image class="img" src="https://static.dstp.com.cn/img/wx/tabIndex_4.png" />
          <view class="p">加入数源</view>
        </view>
        <view class="li"><text class="van-icon-arrow" name="arrow" /></view>
        <view class="li">
          <image class="img" src="https://static.dstp.com.cn/img/wx/tabIndex_7.png" />
          <view class="p">数据发布</view>
        </view>
        <view class="li"><text class="van-icon-arrow" name="arrow" /></view>
        <view class="li">
          <image class="img" src="https://static.dstp.com.cn/img/wx/tabIndex_8.png" />
          <view class="p">数据管理</view>
        </view>
        <view class="li"><text class="van-icon-arrow" name="arrow" /></view>
        <view class="li">
          <image class="img" src="https://static.dstp.com.cn/img/wx/tabIndex_12.png" />
          <view class="p">数据应用</view>
        </view>
      </view>
    </view>
    <view class="blockList">
      <view @click="router.push({ path: 'dataAcquisition' })">
        <image src="https://static.dstp.com.cn/img/wx/tabIndex_6.png" />
        <view class="p">数据采集工具</view>
      </view>
      <view @click="router.push({ path: 'dataOperations' })">
        <image src="https://static.dstp.com.cn/img/wx/tabIndex_10.png" />
        <view class="p">数据控制塔</view>
      </view>
      <view @click="router.push({ path: 'dataManage' })">
        <image src="https://static.dstp.com.cn/img/wx/tabIndex_9.png" />
        <view class="p">数据可视链</view>
      </view>
      <view @click="router.push({ path: 'dataIntegration' })">
        <image src="https://static.dstp.com.cn/img/wx/tabIndex_5.png" />
        <view class="p">融资数据集成</view>
      </view>
    </view>
    <view class="cardBlue">
      <view class="p">快速测算数据信用额度</view>
      <image class="img" src="https://static.dstp.com.cn/img/wx/tabIndex_13.png" />
	  <view>
		  <button class="pgBtn" @click="goPg">立即评估</button>
	  </view>
      
    </view>
    <view class="cardGray">
      <view @click="goBland" class="h3">DSTP，释放数据价值，开拓数据新视界</view @click="goBland">
      <view @click="goBland" class="p">品牌故事>></view>
    </view>
    <!-- <Tabbar :active="0"></Tabbar> -->
  </view>
</template>
<style lang="less" scoped>
.tabIndex {
  //background: url(https://static.dstp.com.cn/img/tabIndex_bg.png?v=1.1) no-repeat;
  background: url(https://static.dstp.com.cn/img/wx/tabIndex_bg.png) no-repeat;
  background-size: 100% 452rpx;
  background-color: #f5f5f5;
  width: 100%;
  padding-top: 104rpx;
  height: 100%;
  min-height: 100vh;
  .head {
    font-size: 36rpx;
    color: #ffffff;
    line-height: 36rpx;
    text-align: center;
    margin-bottom: 92rpx;
  }
}
.stepWrap {
  width: calc(100% - 60rpx);
  margin: 0 auto;
  margin-top: 192rpx;
  background: #ffffff;
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  padding-top: 35rpx;
  padding-bottom: 55rpx;
  display: flex;
  justify-content: center;
  .stepUl {
    display: flex;
    font-family: 'Source Han Sans Medium';
    .li {
			text-align:center;
      .img {
        width: 70rpx;
        height: 70rpx;
        margin: 0 auto;
        margin-bottom: 17rpx;
      }
      .p {
        font-size: 24rpx;
        line-height: 30rpx;
      }
      .van-icon-arrow {
        margin: 21rpx 24rpx 21rpx 34rpx;
				width:15rpx;
        color: #3979fd;
        font-size: 24rpx;
      }
    }
  }
}
.blockList {
  width: calc(100% - 56rpx);
  margin: 65rpx auto 89rpx;
  display: flex;
  justify-content: space-between;
  font-family: 'Source Han Sans Medium';
  > view {
    cursor: pointer;
		text-align:center;
  }
  image {
    width: 80rpx;
    height: 80rpx;
    margin: 0 auto;
  }
  .p {
    font-size: 26rpx;
    text-align: center;
    margin-top: 18rpx;
  }
}
.cardBlue {
  width: calc(100% - 60rpx);
  height: 273rpx;
  margin: 0 auto;
  background: url(https://static.dstp.com.cn/img/wx/tab2.png) no-repeat;
  background-size: 100%;
  padding: 68rpx 43rpx;
  margin-bottom: 53rpx;
  .p {
    font-size: 30rpx;
    color: #ffffff;
    margin-bottom: 11rpx;
  }
  .img {
    width: 298rpx;
    height: 29rpx;
    margin-bottom: 31rpx;
  }
  .pgBtn {
	  min-width: 134rpx;
    width: auto;
    height: 37rpx;
	display:inline-block;
	padding:0 23rpx;
		line-height: 37rpx;
    background: #ffffff;
    border-radius: 17rpx 17rpx 17rpx 17rpx;
    font-size: 22rpx;
    color: #1550dd;
		margin-left:0;
  }
}
.cardGray {
  width: calc(100% - 60rpx);
  height: 201rpx;
  padding: 66rpx 0 0;
  margin: 0 auto 10rpx;
  background: url(https://static.dstp.com.cn/img/wx/tab1.png) no-repeat;
  background-size: 100%;
  text-align: center;
  .h3 {
    font-family: 'Source Han Sans Medium';
    font-size: 30rpx;
    line-height: 30rpx;
    margin-bottom: 16rpx;
  }
  .p {
    font-size: 24rpx;
    line-height: 24rpx;
  }
}
</style>
