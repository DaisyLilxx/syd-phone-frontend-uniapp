"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../stores/index.js");
const utils_api = require("../../utils/api.js");
const stores_modules_serialNo = require("../../stores/modules/serialNo.js");
if (!Math) {
  (common_vendor.unref(titleCom) + skeleton + empty + cardCom)();
}
const titleCom = () => "../../components/titleCom.js";
const cardCom = () => "./components/card.js";
const empty = () => "../../components/empty.js";
const skeleton = () => "./components/skeleton.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "result",
  setup(__props) {
    const SerialNoStore = stores_modules_serialNo.useSerialNoStore();
    const List = common_vendor.ref([]);
    const loading = common_vendor.ref(true);
    const goCustomer = () => {
      common_vendor.index.navigateTo({
        url: "/pages/customerService/customerService"
      });
    };
    common_vendor.onMounted(() => {
      utils_api.getCalculateResult({ serialNo: SerialNoStore.serialNo }).then((res) => {
        console.log("res", res);
        List.value = res.data.data;
        console.log("List.valueList.value", List.value);
        loading.value = false;
        console.log(" List.value", List.value);
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {} : {}, {
        b: !loading.value && !List.value.length
      }, !loading.value && !List.value.length ? {
        c: common_vendor.p({
          text: "不满足授信条件，暂无法评估您的授信额度。",
          hasEmptyBg: false
        })
      } : {}, {
        d: !loading.value && List.value.length
      }, !loading.value && List.value.length ? {
        e: common_vendor.f(List.value, (item, index, i0) => {
          return {
            a: common_vendor.o(goCustomer, index),
            b: common_vendor.t(item.promotionLabel),
            c: index,
            d: "b615976f-3-" + i0,
            e: common_vendor.p({
              isBig: true,
              data: item
            })
          };
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b615976f"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/pages/result/result.vue"]]);
wx.createPage(MiniProgramPage);
