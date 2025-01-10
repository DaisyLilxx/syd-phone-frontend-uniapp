"use strict";
const common_vendor = require("../../common/vendor.js");
const useSerialNoStore = common_vendor.defineStore(
  "serialNo",
  () => {
    const serialNo = common_vendor.ref("");
    function setSerialNoStore(params) {
      serialNo.value = params;
    }
    function clearSerialNoStore() {
      serialNo.value = "";
    }
    return { serialNo, setSerialNoStore, clearSerialNoStore };
  },
  {
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
exports.useSerialNoStore = useSerialNoStore;
