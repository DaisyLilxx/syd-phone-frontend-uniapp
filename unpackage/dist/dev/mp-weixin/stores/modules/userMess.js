"use strict";
const common_vendor = require("../../common/vendor.js");
const useUserStore = common_vendor.defineStore(
  "userMess",
  () => {
    const userMess = common_vendor.ref({});
    function setUserMessStore(params) {
      userMess.value = params;
    }
    function clearUserMessStore() {
      userMess.value = {};
    }
    return { userMess, setUserMessStore, clearUserMessStore };
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
exports.useUserStore = useUserStore;
