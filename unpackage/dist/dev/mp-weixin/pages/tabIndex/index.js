"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const goBland = () => {
      window.location.href = "https://dstp.com/";
    };
    const goPg = () => {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    console.log("process.env.UNI_PLATFORM", "mp-weixin");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.router.push({
          path: "dataAcquisition"
        })),
        b: common_vendor.o(($event) => _ctx.router.push({
          path: "dataOperations"
        })),
        c: common_vendor.o(($event) => _ctx.router.push({
          path: "dataManage"
        })),
        d: common_vendor.o(($event) => _ctx.router.push({
          path: "dataIntegration"
        })),
        e: common_vendor.o(goPg),
        f: common_vendor.o(goBland),
        g: common_vendor.o(goBland)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4ff1ae1e"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/pages/tabIndex/index.vue"]]);
wx.createPage(MiniProgramPage);
