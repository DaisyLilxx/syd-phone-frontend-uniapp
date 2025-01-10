<script setup lang="ts">
// import Tabbar from '@/components/tabbar.vue';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
// import { useRouter } from 'vue-router';
// import { dealParamFromWxWebView } from '@/utils/common';
// const router = useRouter();
console.log(
  'process.env.UNI_PLATFORM-hhhh',
  process.env.UNI_PLATFORM,
  process.env.UNI_PLATFORM === 'mp-weixin',
);
const active = ref(0);
const demoTitList = [
  '外贸企业',
  '品牌经销商',
  '电商企业',
  '科技型企业',
  '个体工商户',
];
const demoList = [
  {
    menu: '外贸企业',
    tit: '广州DB物流供应链有限公司',
    subTit: '李总',
    cont: 'DSTP使我们能够运用自身及上下游企业发布在全球数源中心的报关、采购、销售、库存等确权数据，放大信用价值，成功申请到交通银行的信用证融资产品，获得了5000万元的信用证额度，为我们的外综服、跨境品牌经销等业务提供了强大助力，还有效降低了交易风险。',
    icon: '',
  },
  {
    menu: '品牌经销商',
    tit: 'XC商贸有限公司',
    subTit: '萧总',
    cont: '我们一直从事品牌经销生意，今年加入了全球数源中心，凭采购、销售等确权数据获得了平安银行数字贷产品上百万元的授信额度批复，这笔资金让我们进一步铺设了经销业务网，更好、更稳定地加强与品牌方的合作关系。',
    icon: '',
  },
  {
    menu: '电商企业',
    tit: '健T有限公司',
    subTit: '*总',
    cont: 'DSTP让我们库存数据、商品数据等资产焕发活力，信用价值倍增，轻松斩获1.2亿港币融资。这笔资金如同及时雨，极大地促进了公司资金的流转与运用，为跨境电商业务的稳健经营与全球扩张提供了高效支持。',
    icon: '',
  },
  {
    menu: '科技型企业',
    tit: '广州XTW信息科技有限公司',
    subTit: '孙总',
    cont: '在DSTP的帮助下，我们运用发布在全球数源中心的企业经营纳税信息、专利信息等确权数据，极大地降低了融资的准入门槛，成功获得浦发银行的近百万元贷款额度批复，高效满足资金周转需求，这无疑也是对我们科技创新能力和市场潜力的肯定。',
    icon: '',
  },
  {
    menu: '个体工商户',
    tit: 'MP快餐店',
    subTit: '吴老板',
    cont: 'DSTP帮助我们利用门店流量数据、税务数据，获得招商银行的五十万元的贷款额度批复，年化利率才3.5%，成本很低，这解决了我们近期的燃眉之急，让我们不愁进货问题，还能多搞点促销吸引顾客，生意越做越顺心了。',
    icon: '',
  },
];
const goTest = () => {
  uni.navigateTo({
    url: '/pages/limitCalculationEdit/limitCalculationEdit',
  });
};
const onClickItem = (e) => {
  console.log('onClickItem', e);
  if (active.value != e) {
    active.value = e;
  }
};
const swiperChange = (event) => {
  console.log('swiperChange', event.detail.current);
  active.value = event.detail.current;
};
onLoad(() => {
  console.log('lllllload');
  //   // dealParamFromWxWebView();
});
</script>
<template>
  <view class="index pageBg">
    <view class="top">
      <image src="~@/static/images/index/font.png" class="logo" />
      <view class="head">数据要素 x 金融服务</view>
      <view class="p">
        依托全球数源中心的数据规则，DSTP数源贷模型帮助您将数据资产转化为信用价值，智能推荐众多银行的数字金融产品，助您获得更优的融资体验。
      </view>
    </view>
    <view class="block2">
      <view class="p">您知道吗?您的数据有无限潜力</view>
      <view class="map">
        <text class="span span1">经营及纳税数据</text>
        <text class="span span2">物流数据</text>
        <text class="span span3">报关数据</text>
        <text class="span span4">电商数据</text>
        <text class="span span5">采销数据</text>
        <text class="span span6">门店流量数据</text>
        <text class="span span7">库存数据</text>
        <text class="span span8">专利数据</text>
        <image
          src="~@/static/images/index/home_tableview@2x.png"
          class="mapImg"
        />
      </view>
      <view class="goTestBtn" @click="goTest">立即测算</view>
      <view class="orangeFont">数据信用额度高至 100000000元</view>
    </view>
    <view class="block3">
      <view class="comhead">客户案例</view>
      <scroll-view class="scrollTit" :scroll-x="true" enable-flex>
        <view
          class="scrollItem"
          :class="active == index ? 'select' : ''"
          :data-current="index"
          @click="onClickItem(index)"
          v-for="(item, index) in demoList"
          :key="index"
          >{{ item.menu }}
        </view>
      </scroll-view>
      <swiper class="swiper" circular :current="active" @change="swiperChange">
        <swiper-item
          v-for="(item, index) in demoList"
          :key="index"
          class="tabTit"
        >
          <view class="tabCont">
            <image src="~@/static/images/index/company.png" class="img" />
            <view class="tit">{{ item.tit }}</view>
            <view class="subTit"></view>
            <view class="text">{{ item.cont }}</view>
          </view>
        </swiper-item>
      </swiper>
      <!--  <view class="tabTit">
        <view class="tabCont">
          <image src="~@/static/images/index/company.png" class="img" />
          <view class="tit">{{ demoList[active].tit }}</view>
          <view class="subTit"></view>
          <view class="text">{{ demoList[active].cont }}</view>
        </view>
      </view> -->
      <!--  <van-tabs
        v-model:active="active"
        swipeable
        animated
        :ellipsis="false"
        title-inactive-color="#2B2B2B"
        title-active-color="#1F66FB"
      >
        <van-tab
          v-for="(item, index) in demoList"
          :title="item.menu"
          :key="index"
          title-class="tabTit"
        >
          <view class="tabCont">
            <image src="~@/static/images/index/company.png" class="img" />
            <view class="tit">{{ item.tit }}</view>
            <view class="subTit"></view>
            <view class="text">{{ item.cont }}</view>
          </view>
        </van-tab>
      </van-tabs> -->
    </view>
    <view class="block4">
      <view class="comhead">全球数源中心金融服务共建方</view>
      <view class="ul">
        <view class="li"
          ><image src="https://static.dstp.com.cn/img/wx/icon_1.png"
        /></view>
        <view class="li"
          ><image src="https://static.dstp.com.cn/img/wx/icon_6.png"
        /></view>
        <view class="li"
          ><image src="https://static.dstp.com.cn/img/wx/icon_2.png"
        /></view>
        <view class="li"
          ><image src="https://static.dstp.com.cn/img/wx/icon_3.png"
        /></view>
        <view class="li"
          ><image src="https://static.dstp.com.cn/img/wx/icon_4.png"
        /></view>
        <view class="li"
          ><image src="https://static.dstp.com.cn/img/wx/icon_5.png"
        /></view>
      </view>
    </view>
    <view class="footer">
      <view class="p">融资服务由银行提供</view>
      <view class="p">数据发布、确权与管理由企业依托全球数源中心自主控制</view>
      <view class="p">
        数源贷模型版权所有
        <text>©粤港澳国际供应链（广州）有限公司</text>
      </view>
    </view>
    <!--   <Tabbar :active="1"></Tabbar> -->
  </view>
</template>
<style lang="less" scoped>
.index {
  background-color: #f6f9fc;
  width: 100%;
  height: auto;
  padding-top: 204rpx;
  .top {
    width: 100%;
    padding: 0 60rpx 32rpx;
    .logo {
      width: 382rpx;
      height: 46rpx;
      margin: 0 auto;
      margin-bottom: 18rpx;
    }
    .head {
      width: 286rpx;
      height: 46rpx;
      background: radial-gradient(0% 0% at 0% 0%, #e6eeff 0%, #fefeff 100%);
      border-radius: 22rpx 22rpx 22rpx 22rpx;
      border: 3rpx solid #ffffff;
      text-align: center;
      padding: 0rpx 17rpx;
      font-size: 27rpx;
      color: #1f66fb;
      line-height: 46rpx;
      margin: 0 auto;
      margin-bottom: 36rpx;
    }
    .p {
      font-family: 'Source Han Sans Light';
      font-size: 24rpx;
      color: #ffffff;
      line-height: 36rpx;
    }
  }

  .block2 {
    background: url(https://static.dstp.com.cn/img/wx/home_bg02@2x.png)
      no-repeat;
    background-size: 100% 882rpx;
    height: 882rpx;
    margin: 0 16rpx;
    text-align: center;
    .head1 {
      font-weight: 550;
      padding-top: 48rpx;
      padding-bottom: 16rpx;
      font-size: 32rpx;
      line-height: 44rpx;
    }
    .head2 {
      font-weight: bold;
      font-size: 92rpx;
      line-height: 106rpx;
      margin-bottom: 56rpx;
    }
    .p {
      font-weight: 600;
      font-size: 32rpx;
      color: #ffffff;
      line-height: 44rpx;
      padding-top: 72rpx;
    }
    .map {
      width: 324rpx;
      height: 324rpx;
      margin: 0 auto;
      margin-top: 94rpx;
      position: relative;
      margin-bottom: 124rpx;
      .span {
        position: absolute;
        font-size: 20rpx;
        line-height: 28rpx;
        &.span1 {
          top: -40rpx;
          left: 50%;
          margin-left: -3.5em;
        }
        &.span2 {
          top: 30rpx;
          right: -2.5em;
        }
        &.span3 {
          top: 50%;
          margin-top: -0.5em;
          right: -5em;
        }
        &.span4 {
          bottom: 30rpx;
          right: -2.5em;
        }
        &.span5 {
          bottom: -40rpx;
          left: 50%;
          margin-left: -2em;
        }
        &.span6 {
          bottom: 4vw;
          left: -4.5em;
        }
        &.span7 {
          top: 50%;
          margin-top: -0.5em;
          left: -5em;
        }
        &.span8 {
          top: 30rpx;
          left: -2.5em;
        }
      }
      .mapImg {
        width: 324rpx;
        height: 324rpx;
      }
    }
    .goTestBtn {
      cursor: pointer;
      background: url(https://static.dstp.com.cn/img/wx/home_btn_default@2x.png)
        no-repeat;
      background-size: 100%;
      font-size: 36rpx;
      color: #ffffff;
      line-height: 50rpx;
      width: 480rpx;
      height: 112rpx;
      margin: 0 auto;
      padding-top: 20rpx;
    }
    .orangeFont {
      font-size: 24rpx;
      color: #ff7e00;
      line-height: 36rpx;
    }
  }
  .block3 {
    margin-top: 44rpx;
    margin-bottom: 100rpx;
    .comhead {
      margin-bottom: 42rpx;
    }
    .scrollTit {
      white-space: nowrap;
      width: 100%;
      .scrollItem {
        display: inline-block;
        position: relative;
        //#ifdef MP-WEIXIN
        font-size: 28rpx;
        padding: 0 15rpx;
        line-height: 40rpx;
        padding-bottom: 34rpx;
        background: #f6f9fc;
        //#endif
        &.select {
          ccolor: rgb(31, 102, 251);
          &::before {
            content: '';
            display: inline-block;
            position: absolute;
            bottom: 20rpx;
            left: 15rpx;
            right: 15rpx;
            height: 2rpx;
            background-color: #1f66fb;
          }
        }
      }
    }
    :deep(.uni-scroll-view-content) {
      display: flex;
      .scrollItem {
        font-size: 28rpx;
        padding: 0 15rpx;
        line-height: 40rpx;
        padding-bottom: 34rpx;
        background: #f6f9fc;
      }
    }

    // :deep(.van-tabs__line) {
    //   bottom: 20rpx;
    //   width: 56rpx;
    //   height: 6rpx;
    //   background-color: #1f66fb;
    // }
    // :deep(.van-tab.tabTit) {
    //   font-size: 28rpx;
    //   padding: 0 40rpx;
    //   line-height: 40rpx;
    // }
    uni-swiper,
    .swiper {
      min-height: 680rpx;
    }
    .tabCont {
      background: url(https://static.dstp.com.cn/img/wx/home_bg03@2x.png)
        no-repeat;
      background-size: 100% 680rpx;
      width: calc(100% - 56rpx);
      margin: 0 auto;
      text-align: center;
      padding: 50rpx 63rpx 46rpx;
      min-height: 680rpx;
      .img {
        width: 130rpx;
        height: 130rpx;
        margin: 0 auto;
        margin-bottom: 20rpx;
      }
      .tit {
        font-size: 32rpx;
        color: #ffffff;
        line-height: 44rpx;
        margin-bottom: 8rpx;
      }
      .subTit {
        font-size: 24rpx;
        color: #ffffff;
        line-height: 34rpx;
        margin-bottom: 106rpx;
      }
      .text {
        font-size: 28rpx;
        color: #2b2b2b;
        line-height: 40rpx;
        text-align: left;
      }
    }
  }
  .block4 {
    .ul {
      margin-top: 30rpx;
      width: 100%;
      padding: 0 78rpx;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .li {
        margin-bottom: 24rpx;
        image {
          width: 158rpx;
          height: 64rpx;
        }
      }
    }
  }
  .footer {
    text-align: center;
    color: #8c8c8c;
    font-size: 20rpx;
    line-height: 28rpx;
    padding-top: 16rpx;
    padding-bottom: 40rpx;
    text {
      color: #1f66fb;
    }
  }
  .comhead {
    font-weight: 500;
    font-size: 32rpx;
    color: #2b2b2b;
    line-height: 44rpx;
    text-align: center;
    &::before {
      display: inline-block;
      content: '';
      background: url(https://static.dstp.com.cn/img/wx/home_sign01@2x.png)
        no-repeat;
      background-size: 100%;
      width: 80rpx;
      height: 12rpx;
      margin-right: 36rpx;
    }
    &::after {
      display: inline-block;
      content: '';
      background: url(https://static.dstp.com.cn/img/wx/home_sign02@2x.png)
        no-repeat;
      background-size: 100%;
      width: 80rpx;
      height: 12rpx;
      margin-left: 36rpx;
    }
  }
}
</style>
