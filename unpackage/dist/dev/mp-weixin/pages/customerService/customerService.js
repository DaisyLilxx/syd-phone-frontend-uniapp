"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(titleCom)();
}
const titleCom = () => "../../components/titleCom.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "customerService",
  setup(__props) {
    const goHelp = () => {
      window.open("https://www.dstp.com.cn/helpCenter-4341.html", "_blank");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goHelp)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bc0db00a"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/pages/customerService/customerService.vue"]]);
wx.createPage(MiniProgramPage);
