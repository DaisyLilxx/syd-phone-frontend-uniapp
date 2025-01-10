"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
require("../../stores/index.js");
const stores_modules_serialNo = require("../../stores/modules/serialNo.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (common_vendor.unref(titleCom) + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const titleCom = () => "../../components/titleCom.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "completeMess",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const SerialNoStore = stores_modules_serialNo.useSerialNoStore();
    const isShow1018 = common_vendor.ref(false);
    const isShow1017 = common_vendor.ref(false);
    const isShow1016 = common_vendor.ref(false);
    const isShow1001 = common_vendor.ref(false);
    const contactData = common_vendor.ref({});
    const valiForm = common_vendor.ref();
    const formData = common_vendor.ref({
      averageMonthlyReceivableB2B: "",
      averageMonthlyReceivableB2C: "",
      distributorMonthlyPurchaseAmount: "",
      entName: "",
      enterpriseLoanBalance: "",
      governmentBiddingContractAmount: "",
      lastYearImportExportTradeAmount: "",
      lastYearNetProfit: "",
      lastYearOperatingIncome: "",
      purchaseToPaymentTime: "",
      serialNo: ""
    });
    let countTime = null;
    const time = common_vendor.ref(10);
    const submitAct = () => {
      valiForm.value.validate().then((res) => {
        onSubmitCall(formData.value);
      }).catch((err) => {
        console.log("err", err);
      });
    };
    const onSubmitCall = (values) => {
      console.log("submit", values);
      formData.value.serialNo = SerialNoStore.serialNo;
      isLoading.value = true;
      if (countTime)
        return;
      countTime = setInterval(function() {
        time.value--;
        if (time.value == 0) {
          clearInterval(countTime);
        }
      }, 1e3);
      utils_api.calculateResult(formData.value).then((res) => {
        if (res.data.flag == "SUCCESS") {
          if (countTime)
            clearInterval(countTime);
          common_vendor.index.navigateTo({
            url: "/pages/result/result"
          });
        }
      });
    };
    common_vendor.onMounted(() => {
      utils_api.getItemValue({ serialNo: SerialNoStore.serialNo }).then((res) => {
        contactData.value = res.data.data;
        console.log("contactData.value", contactData.value);
        if (contactData.value["MV1018"])
          isShow1018.value = true;
        if (contactData.value["MV1017"])
          isShow1017.value = true;
        if (contactData.value["MV1016"])
          isShow1016.value = true;
        if (contactData.value["MV1001"])
          isShow1001.value = true;
      });
    });
    const onInput = (e, key) => {
      console.log("onInput", e);
      let val = e;
      const regex = /^\d{1,12}(\.\d{1,2})?$/;
      console.log("aaa", regex.test(val));
      if (regex.test(val)) {
        formData.value[key] = val;
      } else {
        val = val.replace(/[^0-9.]/g, "").replace(/^0+(\d)/, "$1").replace(/(\..*)\./g, "$1").replace(/^(\d{12})\d+/, "$1").replace(/(\.\d{2})\d+/, "$1");
        formData.value[key] = val;
      }
    };
    common_vendor.onBeforeUnmount(() => {
      if (countTime)
        clearInterval(countTime);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isLoading.value
      }, !isLoading.value ? common_vendor.e({
        b: common_vendor.p({
          title: "额度预测"
        }),
        c: common_vendor.o(($event) => formData.value.entName = $event),
        d: common_vendor.p({
          placeholder: "请填入企业名称",
          maxlength: "32",
          modelValue: formData.value.entName
        }),
        e: common_vendor.p({
          label: "企业名称",
          required: true,
          name: "entName",
          rules: [{
            required: true,
            errorMessage: "请填入企业名称"
          }]
        }),
        f: common_vendor.o((e) => onInput(e, "lastYearOperatingIncome")),
        g: common_vendor.o(($event) => formData.value.lastYearOperatingIncome = $event),
        h: common_vendor.p({
          type: "number",
          placeholder: "请填入企业名称",
          modelValue: formData.value.lastYearOperatingIncome
        }),
        i: common_vendor.p({
          label: "上一自然年营业收入",
          required: true,
          name: "lastYearOperatingIncome",
          rules: [{
            required: true,
            errorMessage: "请填入上一自然年营业收入"
          }]
        }),
        j: common_vendor.o((e) => onInput(e, "lastYearNetProfit")),
        k: common_vendor.o(($event) => formData.value.lastYearNetProfit = $event),
        l: common_vendor.p({
          type: "text",
          placeholder: "请填入上一自然年净利润",
          modelValue: formData.value.lastYearNetProfit
        }),
        m: common_vendor.p({
          label: "上一自然年净利润",
          required: true,
          name: "lastYearNetProfit",
          rules: [{
            required: true,
            errorMessage: "请填入上一自然年净利润"
          }]
        }),
        n: common_vendor.o((e) => onInput(e, "enterpriseLoanBalance")),
        o: common_vendor.o(($event) => formData.value.enterpriseLoanBalance = $event),
        p: common_vendor.p({
          type: "number",
          placeholder: "请填入企业借款余额",
          modelValue: formData.value.enterpriseLoanBalance
        }),
        q: common_vendor.p({
          label: "企业借款余额",
          required: true,
          name: "enterpriseLoanBalance",
          rules: [{
            required: true,
            errorMessage: "请填入企业借款余额"
          }]
        }),
        r: isShow1018.value
      }, isShow1018.value ? {
        s: common_vendor.o((e) => onInput(e, "governmentBiddingContractAmount")),
        t: common_vendor.o(($event) => formData.value.governmentBiddingContractAmount = $event),
        v: common_vendor.p({
          type: "number",
          placeholder: "请填入政府招标项目合同金额",
          modelValue: formData.value.governmentBiddingContractAmount
        }),
        w: common_vendor.p({
          label: "政府招标项目合同金额",
          required: true,
          name: "governmentBiddingContractAmount",
          rules: [{
            required: true,
            errorMessage: "请填入政府招标项目合同金额"
          }]
        })
      } : {}, {
        x: isShow1017.value && contactData.value["MV1017"] == "涉及进出口贸易"
      }, isShow1017.value && contactData.value["MV1017"] == "涉及进出口贸易" ? {
        y: common_vendor.o((e) => onInput(e, "lastYearImportExportTradeAmount")),
        z: common_vendor.o(($event) => formData.value.lastYearImportExportTradeAmount = $event),
        A: common_vendor.p({
          type: "number",
          placeholder: "请填入政府招标项目合同金额",
          modelValue: formData.value.lastYearImportExportTradeAmount
        }),
        B: common_vendor.p({
          label: "上一自然年进出口贸易额",
          required: true,
          name: "lastYearImportExportTradeAmount",
          rules: [{
            required: true,
            errorMessage: "请填入上一自然年进出口贸易额"
          }]
        })
      } : {}, {
        C: isShow1016.value && contactData.value["MV1016"] == "有品牌经销权"
      }, isShow1016.value && contactData.value["MV1016"] == "有品牌经销权" ? {
        D: common_vendor.o((e) => onInput(e, "distributorMonthlyPurchaseAmount")),
        E: common_vendor.o(($event) => formData.value.distributorMonthlyPurchaseAmount = $event),
        F: common_vendor.p({
          type: "number",
          placeholder: "请填入品牌经销商月均采购金额",
          modelValue: formData.value.distributorMonthlyPurchaseAmount
        }),
        G: common_vendor.p({
          label: "品牌经销商月均采购金额",
          required: true,
          name: "distributorMonthlyPurchaseAmount",
          rules: [{
            required: true,
            errorMessage: "请填入品牌经销商月均采购金额"
          }]
        })
      } : {}, {
        H: isShow1016.value && contactData.value["MV1016"] == "有品牌经销权"
      }, isShow1016.value && contactData.value["MV1016"] == "有品牌经销权" ? {
        I: common_vendor.o((e) => onInput(e, "purchaseToPaymentTime")),
        J: common_vendor.o(($event) => formData.value.purchaseToPaymentTime = $event),
        K: common_vendor.p({
          maxlength: "3",
          type: "number",
          placeholder: "填入从采购到回款耗时多少天",
          modelValue: formData.value.purchaseToPaymentTime
        }),
        L: common_vendor.p({
          label: "从采购到回款耗时多少天",
          required: true,
          name: "purchaseToPaymentTime",
          maxlength: "3",
          rules: [{
            required: true,
            errorMessage: "填入从采购到回款耗时多少天"
          }]
        })
      } : {}, {
        M: isShow1001.value && contactData.value["MV1001"] == "线上电商平台销售"
      }, isShow1001.value && contactData.value["MV1001"] == "线上电商平台销售" ? {
        N: common_vendor.o((e) => onInput(e, "averageMonthlyReceivableB2B")),
        O: common_vendor.o(($event) => formData.value.averageMonthlyReceivableB2B = $event),
        P: common_vendor.p({
          type: "number",
          placeholder: "请填入电商平台月均应收账款余额",
          modelValue: formData.value.averageMonthlyReceivableB2B
        }),
        Q: common_vendor.p({
          label: "电商平台月均应收账款余额（B2B）",
          required: true,
          name: "averageMonthlyReceivableB2B",
          rules: [{
            required: true,
            errorMessage: "请填入电商平台月均应收账款余额"
          }]
        })
      } : {}, {
        R: isShow1001.value && contactData.value["MV1001"] == "线上电商平台销售"
      }, isShow1001.value && contactData.value["MV1001"] == "线上电商平台销售" ? {
        S: common_vendor.o((e) => onInput(e, "averageMonthlyReceivableB2C")),
        T: common_vendor.o(($event) => formData.value.averageMonthlyReceivableB2C = $event),
        U: common_vendor.p({
          type: "number",
          placeholder: "请填入电商平台月均应收账款余额",
          modelValue: formData.value.averageMonthlyReceivableB2C
        }),
        V: common_vendor.p({
          label: "电商平台月均应收账款余额（B2C）",
          required: true,
          name: "averageMonthlyReceivableB2C",
          rules: [{
            required: true,
            errorMessage: "请填入电商平台月均应收账款余额"
          }]
        })
      } : {}, {
        W: common_vendor.o(submitAct),
        X: common_vendor.sr(valiForm, "1251a8f2-1", {
          "k": "valiForm"
        }),
        Y: common_vendor.p({
          modelValue: formData.value,
          ["label-position"]: "top",
          ["label-width"]: "300"
        })
      }) : {}, {
        Z: isLoading.value
      }, isLoading.value ? {
        aa: common_vendor.p({
          title: "额度预测"
        }),
        ab: common_vendor.t(time.value)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1251a8f2"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/pages/completeMess/completeMess.vue"]]);
wx.createPage(MiniProgramPage);
