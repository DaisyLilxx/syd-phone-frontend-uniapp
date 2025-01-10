"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_api = require("../../utils/api.js");
require("../../stores/index.js");
const stores_modules_header = require("../../stores/modules/header.js");
const stores_modules_userMess = require("../../stores/modules/userMess.js");
var define_import_meta_env_default = { VITE_APP_BASE_URL: "https://dstp-dev.dstp.com.cn", VITE_CJS_IGNORE_WARNING: "true", VITE_ROOT_DIR: "C:/workspace/syd-phone-frontend-uniapp", VITE_USER_NODE_ENV: "development", BASE_URL: "/", MODE: "development", DEV: true, PROD: false, SSR: false };
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (common_vendor.unref(titleCom) + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_forms + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const titleCom = () => "../../components/titleCom.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    let countInterval = null;
    const HeaderStore = stores_modules_header.useHeaderStore();
    const UserStore = stores_modules_userMess.useUserStore();
    let queryParams = {};
    console.log("import.meta.env ", define_import_meta_env_default);
    common_vendor.onLoad((options) => {
      queryParams = options;
      console.log("onLoad", options);
    });
    const onChangeWx = (event) => {
      console.log("onChangeWxwwww", event);
      wxChecked.value = event.detail.value.length ? true : false;
    };
    const rules = {
      username: {
        rules: [
          {
            required: true,
            errorMessage: "请输入手机号"
          }
        ]
      },
      authCode: {
        rules: [
          {
            required: true,
            errorMessage: "请输入验证码"
          }
        ]
      },
      checked: {
        rules: [{ required: true, message: "请勾选协议" }]
      }
    };
    const dialogClose = () => {
    };
    const valiFormData = common_vendor.ref({
      username: "",
      authCode: "",
      checked: []
    });
    const formRef = common_vendor.ref();
    console.log("formRef", formRef.value);
    const submit = (ref2) => {
      if (!valiFormData.value.checked.length) {
        return;
      }
      formRef.value.validate().then((res) => {
        loginCall();
      }).catch((err) => {
        console.log("err", err);
      });
    };
    const loginCall = () => {
      utils_api.login(valiFormData.value).then((res) => {
        const { data } = res;
        if (data.flag == "SUCCESS" || data.token) {
          let dataStr = JSON.stringify(data);
          common_vendor.index.setStorage({
            key: "loginRes",
            data: encodeURIComponent(dataStr)
          });
          UserStore.setUserMessStore(data.userinfo);
          HeaderStore.setHeaderStore({ "wechat-token": data.token });
          loginCallBack();
          console.log("success", res);
          common_vendor.index.showToast({
            title: `登录成功`
          });
        }
      }).catch((e) => {
        console.log(e);
      });
    };
    const hasSendCode = common_vendor.ref(false);
    const countText = common_vendor.ref("获取验证码");
    const isShowYhxy = common_vendor.ref(false);
    const isShowYsxy = common_vendor.ref(false);
    const wxChecked = common_vendor.ref(false);
    const isWxLogin = common_vendor.ref(false);
    isWxLogin.value = true;
    const getCode = () => {
      var _a;
      if (hasSendCode.value)
        return;
      console.log("formRef.value", formRef.value);
      (_a = formRef.value) == null ? void 0 : _a.validateField("username").then(() => {
        console.log("验证码已发送");
        utils_api.sendMobileCode({ mobile: valiFormData.value.username }).then((res) => {
          hasSendCode.value = true;
          let time = 60;
          countText.value = `${time}s后重发`;
          countInterval = setInterval(() => {
            if (time == 1) {
              hasSendCode.value = false;
              clearInterval(countInterval);
              countText.value = `获取验证码 `;
            } else {
              time--;
              countText.value = `${time}s后重发`;
            }
          }, 1e3);
          console.log(res.data);
        });
      }).catch((error) => {
        console.log("error", error);
      });
    };
    const showYhxy = () => {
      isShowYhxy.value = true;
    };
    const showYsxy = () => {
      isShowYsxy.value = true;
    };
    const showPhoneLogin = () => {
      isWxLogin.value = false;
    };
    const goWxlogin = () => {
      isWxLogin.value = true;
    };
    const range = [{ value: 1, text: "已阅读并同意" }];
    const change = () => {
      console.log("change", valiFormData.value);
    };
    const alertDialog = common_vendor.ref(null);
    const getPhoneNumber = (e) => {
      console.log("getPhoneNumber-e", e);
      console.log(e.detail.code);
      console.log(e.detail.errMsg);
      console.log(e.detail.errno);
      if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
        console.log("用户拒绝");
        alertDialog.value.open();
      } else if (e.detail.errMsg == "getPhoneNumber:ok") {
        console.log(e.detail.code);
        utils_api.getUserMobile({ code: e.detail.code }).then(
          (res) => utils_api.loginWx({ username: res.data.data }, { "login-strategy": "20" })
        ).then((resUser) => {
          console.log("resUser", resUser);
          common_vendor.index.showToast({
            title: "登录成功",
            duration: 2e3
          });
          if (resUser.data) {
            const loginResObj = resUser.data;
            UserStore.setUserMessStore(loginResObj.userinfo);
            HeaderStore.setHeaderStore({ "wechat-token": loginResObj.token });
            console.log("route", loginResObj);
          }
          let data = JSON.stringify(resUser.data);
          common_vendor.index.setStorage({
            key: "loginRes",
            data: encodeURIComponent(data)
          });
          setTimeout(() => {
            loginCallBack();
          }, 800);
        }).catch((error) => {
          console.error("Error:", error);
        });
      }
    };
    const loginCallBack = () => {
      if (queryParams.referPage) {
        if (queryParams.referPage == "/my") {
          common_vendor.index.switchTab({
            url: "/pages/my/my"
          });
        } else if (queryParams.referPage == "/completeMess") {
          common_vendor.index.redirectTo({
            url: "/pages/completeMess/completeMess"
          });
        }
      }
    };
    const goPhoneLogin = () => {
      alertDialog.value.close();
      isWxLogin.value = false;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "登录"
        }),
        b: common_assets._imports_0$2,
        c: !isWxLogin.value
      }, !isWxLogin.value ? {
        d: common_vendor.o(($event) => valiFormData.value.username = $event),
        e: common_vendor.p({
          placeholder: "请输入手机号",
          type: "number",
          modelValue: valiFormData.value.username
        }),
        f: common_vendor.p({
          label: "",
          name: "username"
        }),
        g: common_vendor.t(countText.value),
        h: common_vendor.n(hasSendCode.value ? "disableBtn" : ""),
        i: hasSendCode.value,
        j: common_vendor.o(getCode),
        k: common_vendor.o(($event) => valiFormData.value.authCode = $event),
        l: common_vendor.p({
          placeholder: "请输入验证码",
          type: "tel",
          modelValue: valiFormData.value.authCode
        }),
        m: common_vendor.p({
          label: "",
          name: "authCode"
        }),
        n: common_vendor.o(change),
        o: common_vendor.o(($event) => valiFormData.value.checked = $event),
        p: common_vendor.p({
          multiple: true,
          localdata: range,
          modelValue: valiFormData.value.checked
        }),
        q: common_vendor.o(showYhxy),
        r: common_vendor.o(showYsxy),
        s: common_vendor.p({
          label: "",
          name: "checked"
        }),
        t: common_vendor.o(($event) => submit()),
        v: common_vendor.n(valiFormData.value.checked.length ? "" : "comNormalSubBtnDisabled"),
        w: common_vendor.o(goWxlogin),
        x: common_vendor.sr(formRef, "e4e4508d-1", {
          "k": "formRef"
        }),
        y: common_vendor.p({
          rules,
          modelValue: valiFormData.value
        })
      } : {}, {
        z: isWxLogin.value
      }, isWxLogin.value ? {
        A: !wxChecked.value,
        B: common_vendor.o(getPhoneNumber),
        C: common_vendor.n(wxChecked.value ? "" : "comNormalSubBtnDisabled"),
        D: wxChecked.value,
        E: common_vendor.o(onChangeWx),
        F: common_vendor.o(showYhxy),
        G: common_vendor.o(showYsxy),
        H: common_vendor.o(showPhoneLogin)
      } : {}, {
        I: common_vendor.o(goPhoneLogin),
        J: common_vendor.o(dialogClose),
        K: common_vendor.p({
          type: "info",
          cancelText: "知道了",
          confirmText: "确定",
          title: "授权失败",
          content: "您已拒绝获取绑定手机号登录授权，可使用其他手机号验证登录"
        }),
        L: common_vendor.sr(alertDialog, "e4e4508d-8", {
          "k": "alertDialog"
        }),
        M: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
