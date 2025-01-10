"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_api = require("../../utils/api.js");
require("../../stores/index.js");
const stores_modules_serialNo = require("../../stores/modules/serialNo.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_popup2)();
}
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (common_vendor.unref(titleCom) + skeleton + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_popup)();
}
const skeleton = () => "./components/skeleton.js";
const titleCom = () => "../../components/titleCom.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "limitCalculationEdit",
  setup(__props) {
    const popupRef = common_vendor.ref(null);
    const valiForm = common_vendor.ref();
    const serialNoStore = stores_modules_serialNo.useSerialNoStore();
    const personDisable = common_vendor.ref(true);
    const selectionObj = common_vendor.ref({});
    const isLoading = common_vendor.ref(false);
    const isGetDataLoading = common_vendor.ref(false);
    const getData = async () => {
      let res = await utils_api.selection();
      res.data.data.map((item, index) => {
        var _a;
        if (item.itemNo == "MV1001" && item.values.length) {
          revenueSources.value = (_a = item == null ? void 0 : item.values[0]) == null ? void 0 : _a.value;
          chooseSourceUl(0, item == null ? void 0 : item.values[0]);
        }
        selectionObj.value[item.itemNo] = item;
      });
      isGetDataLoading.value = false;
    };
    common_vendor.onLoad(() => {
      isGetDataLoading.value = true;
      getData();
    });
    const revenueSources = common_vendor.ref("");
    const establishmentYear = common_vendor.ref("");
    const registrationLocation = common_vendor.ref("");
    const brandManagement = common_vendor.ref("");
    const involvingImportExportTrade = common_vendor.ref("");
    const projectType = common_vendor.ref("");
    const establishmentYear_text = common_vendor.ref("");
    const registrationLocation_text = common_vendor.ref("");
    const brandManagement_text = common_vendor.ref("");
    const involvingImportExportTrade_text = common_vendor.ref("");
    const projectType_text = common_vendor.ref("");
    const chooseLi = common_vendor.ref(0);
    const isShow1016 = common_vendor.ref(false);
    const isShow1017 = common_vendor.ref(false);
    const isShow1018 = common_vendor.ref(false);
    const setChooseLi = (index) => {
      chooseLi.value = index;
    };
    const sourceUlActive = common_vendor.ref(0);
    const chooseSourceUl = (index, item) => {
      sourceUlActive.value = index;
      revenueSources.value = item.value;
      let show1016Arr = [1, 2, 3];
      let show1017Arr = [1, 2, 3];
      let show1018Arr = [5];
      if (show1016Arr.includes(item.value)) {
        isShow1016.value = true;
      } else
        isShow1016.value = false;
      if (show1017Arr.includes(item.value)) {
        isShow1017.value = true;
      } else
        isShow1017.value = false;
      if (show1018Arr.includes(item.value)) {
        isShow1018.value = true;
      } else
        isShow1018.value = false;
    };
    const onSubmitCall = () => {
      isLoading.value = true;
      let formData = {
        revenueSources: revenueSources.value,
        establishmentYear: establishmentYear.value,
        registrationLocation: registrationLocation.value,
        brandManagement: brandManagement.value,
        involvingImportExportTrade: involvingImportExportTrade.value,
        projectType: projectType.value
      };
      utils_api.matchProduct(formData).then((res) => {
        let { data } = res;
        serialNoStore.setSerialNoStore(data.data.serialNo);
        isLoading.value = false;
        common_vendor.index.navigateTo({
          url: "/pages/productList/productList"
        });
      }).catch((e) => {
        isLoading.value = false;
      });
    };
    common_vendor.ref(false);
    const popTit = common_vendor.ref("");
    const columns = common_vendor.ref([]);
    const currentPopKey = common_vendor.ref("");
    const onConfirm = ({
      selectedOptions
    }) => {
      console.log("onConfirm", selectedOptions);
      let selectValue = selectedOptions[0].value;
      let selectText = selectedOptions[0].text;
      switch (currentPopKey.value) {
        case "MV1002":
          establishmentYear.value = selectValue;
          establishmentYear_text.value = selectText;
          valiFormData.value.establishmentYear_text = selectText;
          break;
        case "MV1003":
          registrationLocation.value = selectValue;
          registrationLocation_text.value = selectText;
          valiFormData.value.registrationLocation_text = selectText;
          break;
        case "MV1016":
          brandManagement.value = selectValue;
          brandManagement_text.value = selectText;
          valiFormData.value.brandManagement_text = selectText;
          break;
        case "MV1017":
          involvingImportExportTrade.value = selectValue;
          involvingImportExportTrade_text.value = selectText;
          valiFormData.value.involvingImportExportTrade_text = selectText;
          break;
        case "MV1018":
          projectType.value = selectValue;
          projectType_text.value = selectText;
          valiFormData.value.projectType_text = selectText;
          break;
      }
    };
    const showPop = (key) => {
      resetPickerView();
      console.log("showPopup", popChooseIndex.value);
      currentPopKey.value = key;
      popTit.value = selectionObj.value[key].itemName;
      columns.value = selectionObj.value[key].values;
      common_vendor.nextTick$1(() => {
        var _a;
        (_a = popupRef.value) == null ? void 0 : _a.open();
      });
    };
    const valiFormData = common_vendor.ref({});
    const rules = common_vendor.ref({
      name: {
        rules: [
          {
            required: true,
            errorMessage: "姓名不能为空"
          }
        ]
      }
    });
    const pickerValue = common_vendor.ref([0]);
    const submit = (ref2) => {
      console.log("hhhh", valiFormData.value);
      valiForm.value.validate().then((res) => {
        onSubmitCall();
      }).catch((err) => {
        console.log("err", err);
      });
    };
    const resetPickerView = () => {
      pickerValue.value = [0];
      popChooseIndex.value = 0;
    };
    const closePop = () => {
      var _a;
      (_a = popupRef.value) == null ? void 0 : _a.close();
    };
    const popChooseIndex = common_vendor.ref(0);
    const bindChange = (e) => {
      console.log("bindChange", e);
      popChooseIndex.value = e.detail.value[0];
    };
    const chooseTag = () => {
      var _a;
      console.log("chooseTag", popChooseIndex.value);
      pickerValue.value = [popChooseIndex.value];
      console.log("pickerValue.value", pickerValue.value);
      onConfirm({ selectedOptions: [columns.value[popChooseIndex.value]] });
      (_a = popupRef.value) == null ? void 0 : _a.close();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isGetDataLoading.value
      }, isGetDataLoading.value ? {} : {}, {
        b: !isGetDataLoading.value
      }, !isGetDataLoading.value ? common_vendor.e({
        c: chooseLi.value == 0
      }, chooseLi.value == 0 ? {
        d: common_assets._imports_0$3
      } : {
        e: common_assets._imports_1$1
      }, {
        f: common_assets._imports_2$1,
        g: chooseLi.value == 0 ? 1 : "",
        h: common_vendor.o(($event) => setChooseLi(0)),
        i: personDisable.value
      }, personDisable.value ? {
        j: common_assets._imports_3
      } : {}, {
        k: chooseLi.value == 1
      }, chooseLi.value == 1 ? {
        l: common_assets._imports_0$3
      } : {}, {
        m: !personDisable.value && chooseLi.value == 0
      }, !personDisable.value && chooseLi.value == 0 ? {
        n: common_assets._imports_1$1
      } : {}, {
        o: !personDisable.value
      }, !personDisable.value ? {
        p: common_assets._imports_4
      } : {}, {
        q: personDisable.value
      }, personDisable.value ? {
        r: common_assets._imports_5
      } : {}, {
        s: chooseLi.value == 1 ? 1 : "",
        t: common_vendor.o(($event) => setChooseLi(personDisable.value ? 0 : 1)),
        v: common_vendor.t(selectionObj.value["MV1001"] && selectionObj.value["MV1001"].itemName),
        w: selectionObj.value["MV1001"]
      }, selectionObj.value["MV1001"] ? {
        x: common_vendor.f(selectionObj.value["MV1001"].values, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: index,
            c: sourceUlActive.value == index ? 1 : "",
            d: common_vendor.o(($event) => chooseSourceUl(index, item), index)
          };
        })
      } : {}, {
        y: selectionObj.value["MV1002"]
      }, selectionObj.value["MV1002"] ? common_vendor.e({
        z: valiFormData.value.establishmentYear_text
      }, valiFormData.value.establishmentYear_text ? {
        A: common_vendor.t(valiFormData.value.establishmentYear_text),
        B: common_vendor.o(($event) => showPop("MV1002"))
      } : {}, {
        C: !valiFormData.value.establishmentYear_text
      }, !valiFormData.value.establishmentYear_text ? {
        D: common_vendor.o(($event) => showPop("MV1002"))
      } : {}, {
        E: common_vendor.p({
          label: selectionObj.value["MV1002"].itemName,
          name: "establishmentYear_text",
          required: true,
          rules: [{
            required: true,
            errorMessage: `请选择${selectionObj.value["MV1002"].itemName}`
          }]
        })
      }) : {}, {
        F: selectionObj.value["MV1003"]
      }, selectionObj.value["MV1003"] ? common_vendor.e({
        G: valiFormData.value.registrationLocation_text
      }, valiFormData.value.registrationLocation_text ? {
        H: common_vendor.t(valiFormData.value.registrationLocation_text),
        I: common_vendor.o(($event) => showPop("MV1003"))
      } : {}, {
        J: !valiFormData.value.registrationLocation_text
      }, !valiFormData.value.registrationLocation_text ? {
        K: common_vendor.o(($event) => showPop("MV1003"))
      } : {}, {
        L: common_vendor.p({
          label: selectionObj.value["MV1003"].itemName,
          name: "registrationLocation_text",
          required: true,
          rules: [{
            required: true,
            errorMessage: `请选择${selectionObj.value["MV1003"].itemName}`
          }]
        })
      }) : {}, {
        M: selectionObj.value["MV1016"] && isShow1016.value
      }, selectionObj.value["MV1016"] && isShow1016.value ? common_vendor.e({
        N: valiFormData.value.brandManagement_text
      }, valiFormData.value.brandManagement_text ? {
        O: common_vendor.t(valiFormData.value.brandManagement_text),
        P: common_vendor.o(($event) => showPop("MV1016"))
      } : {}, {
        Q: !valiFormData.value.brandManagement_text
      }, !valiFormData.value.brandManagement_text ? {
        R: common_vendor.o(($event) => showPop("MV1016"))
      } : {}, {
        S: common_vendor.p({
          label: selectionObj.value["MV1016"].itemName,
          name: "brandManagement_text",
          required: true,
          rules: [{
            required: true,
            errorMessage: `请选择${selectionObj.value["MV1016"].itemName}`
          }]
        })
      }) : {}, {
        T: selectionObj.value["MV1017"] && isShow1017.value
      }, selectionObj.value["MV1017"] && isShow1017.value ? common_vendor.e({
        U: valiFormData.value.involvingImportExportTrade_text
      }, valiFormData.value.involvingImportExportTrade_text ? {
        V: common_vendor.t(valiFormData.value.involvingImportExportTrade_text),
        W: common_vendor.o(($event) => showPop("MV1017"))
      } : {}, {
        X: !valiFormData.value.involvingImportExportTrade_text
      }, !valiFormData.value.involvingImportExportTrade_text ? {
        Y: common_vendor.o(($event) => showPop("MV1017"))
      } : {}, {
        Z: common_vendor.p({
          label: selectionObj.value["MV1017"].itemName,
          name: "involvingImportExportTrade_text",
          required: true,
          rules: [{
            required: true,
            errorMessage: `请选择${selectionObj.value["MV1017"].itemName}`
          }]
        })
      }) : {}, {
        aa: selectionObj.value["MV1018"] && isShow1018.value
      }, selectionObj.value["MV1018"] && isShow1018.value ? common_vendor.e({
        ab: valiFormData.value.projectType_text
      }, valiFormData.value.projectType_text ? {
        ac: common_vendor.t(valiFormData.value.projectType_text),
        ad: common_vendor.o(($event) => showPop("MV1018"))
      } : {}, {
        ae: !valiFormData.value.projectType_text
      }, !valiFormData.value.projectType_text ? {
        af: common_vendor.o(($event) => showPop("MV1018"))
      } : {}, {
        ag: common_vendor.p({
          label: selectionObj.value["MV1018"].itemName,
          name: "projectType_text",
          required: true,
          rules: [{
            required: true,
            errorMessage: `请选择${selectionObj.value["MV1018"].itemName}`
          }]
        })
      }) : {}) : {}, {
        ah: common_vendor.o(submit),
        ai: isLoading.value,
        aj: common_vendor.sr(valiForm, "91acbb14-2", {
          "k": "valiForm"
        }),
        ak: common_vendor.p({
          rules: rules.value,
          modelValue: valiFormData.value,
          ["label-position"]: "top",
          ["label-width"]: "200"
        }),
        al: common_vendor.o(closePop),
        am: common_vendor.t(popTit.value),
        an: common_vendor.o(chooseTag),
        ao: common_vendor.f(columns.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: index
          };
        }),
        ap: pickerValue.value,
        aq: common_vendor.o(bindChange),
        ar: common_vendor.sr(popupRef, "91acbb14-8", {
          "k": "popupRef"
        }),
        as: common_vendor.p({
          type: "bottom",
          ["border-radius"]: "10px 10px 0 0",
          ["background-color"]: "#fff"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-91acbb14"], ["__file", "C:/workspace/syd-phone-frontend-uniapp/pages/limitCalculationEdit/limitCalculationEdit.vue"]]);
wx.createPage(MiniProgramPage);
