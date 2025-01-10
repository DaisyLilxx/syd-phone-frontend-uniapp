"use strict";
const utils_request = require("./request.js");
function buildUrlWithParams(url, params) {
  const queryString = Object.entries(params).map(
    ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  ).join("&");
  return `${url}?${queryString}`;
}
const sendMobileCode = (data) => {
  return utils_request.request({
    url: "/dstp-auth/account/app/sendMobileCode",
    method: "get",
    data
  });
};
const login = (data) => {
  const urlWithParams = buildUrlWithParams(
    "/dstp-auth/wechat/authCode/login",
    data
  );
  return utils_request.request({
    url: urlWithParams,
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "login-strategy": "10"
    }
  });
};
const selection = () => {
  return utils_request.request({
    url: "/dstp-op/rest/api/app/financial/selection",
    method: "get"
  });
};
const matchProduct = (data) => {
  return utils_request.request({
    url: `/dstp-op/rest/api/app/financial/match/product`,
    method: "post",
    data
  });
};
const getItemValue = (data) => {
  return utils_request.request({
    url: `/dstp-op/rest/api/app/financial/calculate/itemValue`,
    method: "get",
    data
  });
};
const calculateResult = (data) => {
  return utils_request.request({
    url: `/dstp-op/rest/api/app/financial/calculate/result`,
    method: "post",
    data
  });
};
const getCalculateResult = (data) => {
  return utils_request.request({
    url: `/dstp-op/rest/api/app/financial/calculate/result`,
    method: "get",
    data
  });
};
const getProductList = (data) => {
  return utils_request.request({
    url: `/dstp-op/rest/api/app/financial/match/product`,
    method: "get",
    data
  });
};
const getProductDetail = (id) => {
  return utils_request.request({
    url: `/dstp-op/rest/api/app/financial/match/product/${id}`,
    method: "get"
  });
};
const getHistory = () => {
  return utils_request.request({
    url: `/dstp-op/rest/api/app/financial/calculate/result/history`,
    method: "get"
  });
};
const loginWx = (data, header = {}) => {
  return utils_request.request({
    url: "/dstp-auth/wechat/authCode/login",
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...header
    }
  });
};
const getUserMobile = (data) => {
  return utils_request.request({
    url: `/dstp-op/rest/api/app/financial/userMobile`,
    method: "get",
    data
  });
};
exports.calculateResult = calculateResult;
exports.getCalculateResult = getCalculateResult;
exports.getHistory = getHistory;
exports.getItemValue = getItemValue;
exports.getProductDetail = getProductDetail;
exports.getProductList = getProductList;
exports.getUserMobile = getUserMobile;
exports.login = login;
exports.loginWx = loginWx;
exports.matchProduct = matchProduct;
exports.selection = selection;
exports.sendMobileCode = sendMobileCode;
