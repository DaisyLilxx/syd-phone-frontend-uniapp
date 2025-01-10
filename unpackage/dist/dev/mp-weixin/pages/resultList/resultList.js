"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
if (!Math) {
  (common_vendor.unref(titleCom) + skeleton + empty + cardCom)();
}
const titleCom = () => "../../components/titleCom.js";
const cardCom = () => "../result/components/card.js";
const empty = () => "../../components/empty.js";
const skeleton = () => "./components/skeleton.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "resultList",
  setup(__props) {
    const List = common_vendor.ref([]);
    const loading = common_vendor.ref(true);
    common_vendor.onMounted(() => {
      utils_api.getHistory().then((res) => {
        console.log("res", res);
        List.value = res.data.data;
        loading.value = false;
        console.log(" List.value", List.value);
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "测额记录"
        }),
        b: loading.value
      }, loading.value ? {} : {}, {
        c: !loading.value && !List.value.length
      }, !loading.value && !List.value.length ? {
        d: common_vendor.p({
          text: "暂无测额记录"
        })
      } : {}, {
        e: !loading.value && List.value.length
      }, !loading.value && List.value.length ? {
        f: common_vendor.f(List.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.dateTime),
            b: common_vendor.f(item.data, (subitem, subindex, i1) => {
              return {
                a: subindex,
                b: "e17d58b8-3-" + i0 + "-" + i1,
                c: common_vendor.p({
                  data: subitem
                })
              };
            }),
            c: index
          };
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e17d58b8"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/pages/resultList/resultList.vue"]]);
wx.createPage(MiniProgramPage);
