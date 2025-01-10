"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_common = require("../../../utils/common.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "card",
  props: {
    isBig: { type: Boolean },
    data: {}
  },
  setup(__props) {
    const props = __props;
    let imgUrlPre = "https://dstp-dev.dstp.com.cn";
    console.log("props", props);
    return (_ctx, _cache) => {
      return {
        a: `${common_vendor.unref(imgUrlPre)}/dstp-op/rest/api/app/financial/picture/preview?path=${props.data.bankIconUrl}`,
        b: common_vendor.t(props.data.bank),
        c: common_vendor.t(props.data.productName),
        d: common_vendor.t(props.data.currency),
        e: common_vendor.t(common_vendor.unref(utils_common.toThousandsWithSmallNum)(props.data.creditAmount)),
        f: common_vendor.t(props.data.interestRateDescribe),
        g: _ctx.isBig ? 1 : ""
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4fe11e3f"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/pages/result/components/card.vue"]]);
wx.createComponent(Component);
