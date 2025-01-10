"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../stores/index.js");
const stores_modules_header = require("../../../stores/modules/header.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "fixBottom",
  props: {},
  setup(__props) {
    const HeaderStore = stores_modules_header.useHeaderStore();
    const goCompleteMess = () => {
      if (HeaderStore.headers["wechat-token"])
        common_vendor.index.navigateTo({ url: "/pages/completeMess/completeMess" });
      else {
        common_vendor.index.navigateTo({ url: "/pages/login/login?referPage=/completeMess" });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goCompleteMess)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ed4fef3e"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/pages/productList/components/fixBottom.vue"]]);
wx.createComponent(Component);
