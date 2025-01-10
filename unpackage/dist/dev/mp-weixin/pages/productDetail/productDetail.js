"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
if (!Math) {
  (common_vendor.unref(titleCom) + fixBottom)();
}
const titleCom = () => "../../components/titleCom.js";
const fixBottom = () => "../productList/components/fixBottom.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "productDetail",
  setup(__props) {
    const resData = common_vendor.ref({});
    common_vendor.onLoad((options) => {
      utils_api.getProductDetail(options.id).then((res) => {
        resData.value = res.data.data;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(resData.value.applicableCustomer),
        b: common_vendor.t(resData.value.productName == "信用证融资" ? "开证服务费" : "年化利率"),
        c: common_vendor.t(resData.value.interestRate),
        d: common_vendor.t(resData.value.currency),
        e: common_vendor.t(resData.value.limitAmount),
        f: common_vendor.t(resData.value.repaymentMode),
        g: common_vendor.t(resData.value.repaymentPeriod)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-be4f4aac"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/pages/productDetail/productDetail.vue"]]);
wx.createPage(MiniProgramPage);
