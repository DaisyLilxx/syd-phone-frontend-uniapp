"use strict";
const common_vendor = require("../common/vendor.js");
require("./modules/header.js");
require("./modules/serialNo.js");
require("./modules/userMess.js");
const pinia = common_vendor.createPinia();
pinia.use(common_vendor.src_default);
exports.pinia = pinia;
