"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
require("../../stores/index.js");
const stores_modules_userMess = require("../../stores/modules/userMess.js");
const stores_modules_header = require("../../stores/modules/header.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my",
  setup(__props) {
    const UserStore = stores_modules_userMess.useUserStore();
    const HeaderStore = stores_modules_header.useHeaderStore();
    console.log("UserStore", UserStore);
    let loginRes = "";
    common_vendor.onLoad((options) => {
      loginRes = options.loginRes;
    });
    const goList = () => {
      console.log("goList");
      if (loginRes || HeaderStore.headers["wechat-token"]) {
        common_vendor.index.navigateTo({
          url: "/pages/resultList/resultList"
        });
      } else
        common_vendor.index.navigateTo({
          url: "/pages/login/login?referPage=/my"
        });
    };
    const goLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login?referPage=/my"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.unref(UserStore) && common_vendor.unref(UserStore).userMess && common_vendor.unref(UserStore).userMess.username
      }, common_vendor.unref(UserStore) && common_vendor.unref(UserStore).userMess && common_vendor.unref(UserStore).userMess.username ? {
        c: common_vendor.t(common_vendor.unref(UserStore).userMess.username)
      } : {
        d: common_vendor.o(goLogin)
      }, {
        e: common_vendor.o(goList),
        f: common_vendor.p({
          ["show-extra-icon"]: true,
          clickable: true,
          showArrow: true,
          title: "测额记录"
        }),
        g: common_vendor.p({
          ["show-extra-icon"]: true,
          to: "/pages/customerService/customerService",
          showArrow: true,
          title: "联系客服"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
