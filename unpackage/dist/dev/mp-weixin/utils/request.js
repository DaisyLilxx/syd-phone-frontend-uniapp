"use strict";
const common_vendor = require("../common/vendor.js");
require("../stores/index.js");
const stores_modules_header = require("../stores/modules/header.js");
const BASE_URL = "https://dstp-dev.dstp.com.cn";
function request(options) {
  return new Promise((resolve, reject) => {
    const headersData = stores_modules_header.useHeaderStore();
    headersData.headers.openId ? headersData.headers.openId : "";
    const token = headersData.headers["wechat-token"];
    console.log("tokentoken", token);
    const headers = {
      "Content-Type": "application/json",
      "Wechat-Token": token || "",
      ...options.headers || {}
    };
    common_vendor.index.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        "Content-Type": "application/json",
        ...headers || {}
      },
      success: (res) => {
        console.log("eeeee", res);
        if (res.statusCode === 200) {
          resolve({
            data: res.data,
            statusCode: res.statusCode,
            errMsg: res.errMsg
          });
        } else {
          reject(new Error(res.errMsg || "Request failed"));
        }
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
}
exports.request = request;
