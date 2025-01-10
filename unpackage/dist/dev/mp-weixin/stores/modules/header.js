"use strict";
const common_vendor = require("../../common/vendor.js");
const useHeaderStore = common_vendor.defineStore(
  "headerStore",
  () => {
    const headers = common_vendor.ref({ openId: "", channelCode: "" });
    function setHeaderStore(params) {
      headers.value = { ...headers.value, ...params };
    }
    function clearHeaderStore() {
      headers.value = { openId: "", channelCode: "" };
    }
    return { headers, setHeaderStore, clearHeaderStore };
  },
  {
    // 配置持久化
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          common_vendor.index.setStorageSync(key, value);
        },
        getItem(key) {
          return common_vendor.index.getStorageSync(key);
        }
      }
    }
  }
);
exports.useHeaderStore = useHeaderStore;
