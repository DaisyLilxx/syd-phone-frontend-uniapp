"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "titleCom",
  props: {
    title: { default: "" }
  },
  setup(__props) {
    const goBack = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goBack),
        b: _ctx.title
      }, _ctx.title ? {
        c: common_vendor.t(_ctx.title)
      } : {}, {
        d: !_ctx.title
      }, !_ctx.title ? {} : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-84139ba5"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/components/titleCom.vue"]]);
wx.createComponent(Component);
