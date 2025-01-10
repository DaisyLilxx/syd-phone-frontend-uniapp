"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    console.log(
      "process.env.UNI_PLATFORM-hhhh",
      "mp-weixin",
      true
    );
    const active = common_vendor.ref(0);
    const demoList = [
      {
        menu: "外贸企业",
        tit: "广州DB物流供应链有限公司",
        subTit: "李总",
        cont: "DSTP使我们能够运用自身及上下游企业发布在全球数源中心的报关、采购、销售、库存等确权数据，放大信用价值，成功申请到交通银行的信用证融资产品，获得了5000万元的信用证额度，为我们的外综服、跨境品牌经销等业务提供了强大助力，还有效降低了交易风险。",
        icon: ""
      },
      {
        menu: "品牌经销商",
        tit: "XC商贸有限公司",
        subTit: "萧总",
        cont: "我们一直从事品牌经销生意，今年加入了全球数源中心，凭采购、销售等确权数据获得了平安银行数字贷产品上百万元的授信额度批复，这笔资金让我们进一步铺设了经销业务网，更好、更稳定地加强与品牌方的合作关系。",
        icon: ""
      },
      {
        menu: "电商企业",
        tit: "健T有限公司",
        subTit: "*总",
        cont: "DSTP让我们库存数据、商品数据等资产焕发活力，信用价值倍增，轻松斩获1.2亿港币融资。这笔资金如同及时雨，极大地促进了公司资金的流转与运用，为跨境电商业务的稳健经营与全球扩张提供了高效支持。",
        icon: ""
      },
      {
        menu: "科技型企业",
        tit: "广州XTW信息科技有限公司",
        subTit: "孙总",
        cont: "在DSTP的帮助下，我们运用发布在全球数源中心的企业经营纳税信息、专利信息等确权数据，极大地降低了融资的准入门槛，成功获得浦发银行的近百万元贷款额度批复，高效满足资金周转需求，这无疑也是对我们科技创新能力和市场潜力的肯定。",
        icon: ""
      },
      {
        menu: "个体工商户",
        tit: "MP快餐店",
        subTit: "吴老板",
        cont: "DSTP帮助我们利用门店流量数据、税务数据，获得招商银行的五十万元的贷款额度批复，年化利率才3.5%，成本很低，这解决了我们近期的燃眉之急，让我们不愁进货问题，还能多搞点促销吸引顾客，生意越做越顺心了。",
        icon: ""
      }
    ];
    const goTest = () => {
      common_vendor.index.navigateTo({
        url: "/pages/limitCalculationEdit/limitCalculationEdit"
      });
    };
    const onClickItem = (e) => {
      console.log("onClickItem", e);
      if (active.value != e) {
        active.value = e;
      }
    };
    const swiperChange = (event) => {
      console.log("swiperChange", event.detail.current);
      active.value = event.detail.current;
    };
    common_vendor.onLoad(() => {
      console.log("lllllload");
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_vendor.o(goTest),
        d: common_vendor.f(demoList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.menu),
            b: common_vendor.n(active.value == index ? "select" : ""),
            c: index,
            d: common_vendor.o(($event) => onClickItem(index), index),
            e: index
          };
        }),
        e: common_vendor.f(demoList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.tit),
            b: common_vendor.t(item.cont),
            c: index
          };
        }),
        f: common_assets._imports_2,
        g: active.value,
        h: common_vendor.o(swiperChange)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
