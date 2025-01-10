"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_index = require("./stores/index.js");
if (!Math) {
  "./pages/tabIndex/index.js";
  "./pages/index/index.js";
  "./pages/my/my.js";
  "./pages/login/login.js";
  "./pages/limitCalculationEdit/limitCalculationEdit.js";
  "./pages/resultList/resultList.js";
  "./pages/customerService/customerService.js";
  "./pages/productList/productList.js";
  "./pages/completeMess/completeMess.js";
  "./pages/productDetail/productDetail.js";
  "./pages/result/result.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/workspace/syd-phone-frontend-uniapp/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(stores_index.pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
