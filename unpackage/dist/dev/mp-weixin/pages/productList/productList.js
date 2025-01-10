"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
require("../../stores/index.js");
const stores_modules_serialNo = require("../../stores/modules/serialNo.js");
if (!Math) {
  (common_vendor.unref(titleCom) + skeleton + empty + fixBottom)();
}
const titleCom = () => "../../components/titleCom.js";
const skeleton = () => "./components/skeleton.js";
const fixBottom = () => "./components/fixBottom.js";
const empty = () => "../../components/empty.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "productList",
  setup(__props) {
    const loading = common_vendor.ref(true);
    const serialNoStore = stores_modules_serialNo.useSerialNoStore();
    const goDetail = (id) => {
      common_vendor.index.navigateTo({ url: "/pages/productDetail/productDetail?id=" + id });
    };
    let imgUrlPre = "https://dstp-dev.dstp.com.cn";
    const dataList = common_vendor.ref([]);
    common_vendor.onLoad((options) => {
      utils_api.getProductList({ serialNo: serialNoStore.serialNo }).then((res) => {
        dataList.value = res.data.data;
        loading.value = false;
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "产品列表"
        }),
        b: loading.value
      }, loading.value ? {} : {}, {
        c: !loading.value && !dataList.value.length
      }, !loading.value && !dataList.value.length ? {
        d: common_vendor.p({
          text: "暂无符合您条件的金融产品",
          hasEmptyBg: false
        })
      } : {}, {
        e: !loading.value && dataList.value.length
      }, !loading.value && dataList.value.length ? {
        f: common_vendor.f(dataList.value, (item, index, i0) => {
          return {
            a: `${common_vendor.unref(imgUrlPre)}/dstp-op/rest/api/app/financial/picture/preview?path=${item.bankIconUrl}`,
            b: common_vendor.t(item.bank),
            c: common_vendor.t(item.productName),
            d: common_vendor.o(($event) => goDetail(item.productId), index),
            e: common_vendor.t(item.currency),
            f: common_vendor.t(item.limitAmount),
            g: common_vendor.t(item.productName == "信用证融资" ? "开证服务费" : "利率"),
            h: common_vendor.t(item.interestRate),
            i: common_vendor.n(index % 2 == 0 ? "orange" : "pruple"),
            j: index
          };
        })
      } : {}, {
        g: dataList.value.length
      }, dataList.value.length ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2bc95148"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/pages/productList/productList.vue"]]);
wx.createPage(MiniProgramPage);
