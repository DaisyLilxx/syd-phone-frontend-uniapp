"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "empty",
  props: {
    text: { default: "暂无数据" },
    hasEmptyBg: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.text),
        b: common_vendor.n(_ctx.hasEmptyBg ? "emptyBg" : "emptyNoBg")
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4ccfcf60"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/components/empty.vue"]]);
wx.createComponent(Component);
