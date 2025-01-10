<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { UniFormsInstance } from '@dcloudio/uni-ui';
// import { useRouter } from 'vue-router';
import skeleton from './components/skeleton.vue';
import titleCom from '@/components/titleCom';
import { selection, matchProduct } from '@/utils/api';
import type { Item, SubItem } from '@/types/index';
import { useSerialNoStore } from '@/stores/index';
// const router = useRouter();
// 引用 uni-popup
const popupRef = ref<InstanceType<typeof UniPopup> | null>(null);
const valiForm = ref<UniFormsInstance>();
const serialNoStore = useSerialNoStore();
const personDisable = ref(true);
const selectionObj = ref<{ [key: string]: any }>({});
const isLoading = ref(false);
const isGetDataLoading = ref(false);
const getData = async () => {
  let res = await selection();
  res.data.data!.map((item: Item, index: number) => {
    if (item.itemNo == 'MV1001' && item.values.length) {
      revenueSources.value = item?.values[0]?.value;
      chooseSourceUl(0, item?.values[0]);
    }
    selectionObj.value[item.itemNo] = item;
  });
  isGetDataLoading.value = false;
};
onLoad(() => {
  isGetDataLoading.value = true;
  getData();
});
const revenueSources = ref<string | number>('');
const establishmentYear = ref<string | number>('');
const registrationLocation = ref<string | number>('');
const brandManagement = ref<string | number>('');
const involvingImportExportTrade = ref<string | number>('');
const projectType = ref<string | number>('');
const establishmentYear_text = ref('');
const registrationLocation_text = ref('');
const brandManagement_text = ref('');
const involvingImportExportTrade_text = ref('');
const projectType_text = ref('');
const chooseLi = ref(0);
const isShow1016 = ref(false);
const isShow1017 = ref(false);
const isShow1018 = ref(false);
const setChooseLi = (index: number) => {
  chooseLi.value = index;
};
const sourceUlActive = ref(0);
const chooseSourceUl = (index: number, item: SubItem) => {
  sourceUlActive.value = index;
  revenueSources.value = item.value;
  let show1016Arr = [1, 2, 3];
  let show1017Arr = [1, 2, 3];
  let show1018Arr = [5];
  if (show1016Arr.includes(item.value)) {
    isShow1016.value = true;
  } else isShow1016.value = false;
  if (show1017Arr.includes(item.value)) {
    isShow1017.value = true;
  } else isShow1017.value = false;
  if (show1018Arr.includes(item.value)) {
    isShow1018.value = true;
  } else isShow1018.value = false;
};

const onSubmitCall = () => {
  isLoading.value = true;
  let formData = {
    revenueSources: revenueSources.value,
    establishmentYear: establishmentYear.value,
    registrationLocation: registrationLocation.value,
    brandManagement: brandManagement.value,
    involvingImportExportTrade: involvingImportExportTrade.value,
    projectType: projectType.value,
  };
  matchProduct(formData)
    .then((res) => {
      let { data } = res;
      serialNoStore.setSerialNoStore(data.data!.serialNo);
      isLoading.value = false;
      uni.navigateTo({
        url: '/pages/productList/productList',
      });
    })
    .catch((e) => {
      isLoading.value = false;
    });
};
const showPicker = ref(false);
type selectTypeItem = {
  text: string;
  value: number;
};
const popTit = ref<string>('');
const columns = ref<selectTypeItem[]>([]);
const currentPopKey = ref<string>('');
// 定义 Picker 选项的类型
interface PickerOption {
  text: string;
  value: number | string;
}
const onConfirm = ({
  selectedOptions,
}: {
  selectedOptions: PickerOption[];
}) => {
  console.log('onConfirm', selectedOptions);
  let selectValue = selectedOptions[0].value;
  let selectText = selectedOptions[0].text;
  switch (currentPopKey.value) {
    case 'MV1002':
      establishmentYear.value = selectValue;
      establishmentYear_text.value = selectText;
      valiFormData.value.establishmentYear_text = selectText;
      break;
    case 'MV1003':
      registrationLocation.value = selectValue;
      registrationLocation_text.value = selectText;
      valiFormData.value.registrationLocation_text = selectText;
      break;
    case 'MV1016':
      brandManagement.value = selectValue;
      brandManagement_text.value = selectText;
      valiFormData.value.brandManagement_text = selectText;
      break;
    case 'MV1017':
      involvingImportExportTrade.value = selectValue;
      involvingImportExportTrade_text.value = selectText;
      valiFormData.value.involvingImportExportTrade_text = selectText;
      break;
    case 'MV1018':
      projectType.value = selectValue;
      projectType_text.value = selectText;
      valiFormData.value.projectType_text = selectText;
      break;
  }
};
const showPop = (key: string) => {
  resetPickerView();
  console.log('showPopup', popChooseIndex.value);
  currentPopKey.value = key;
  popTit.value = selectionObj.value[key].itemName;
  columns.value = selectionObj.value[key].values;
  nextTick(() => {
    popupRef.value?.open();
  });
};
const bindPickerChange = (e) => {
  console.log('picker发送选择改变，携带值为', e.detail.value);
  // this.index = e.detail.value
};
// 校验表单数据
const valiFormData = ref({});
// 校验规则
const rules = ref({
  name: {
    rules: [
      {
        required: true,
        errorMessage: '姓名不能为空',
      },
    ],
  },
});
const pickerValue = ref([0]);

const submit = (ref) => {
  console.log('hhhh', valiFormData.value);
  valiForm.value
    .validate()
    .then((res) => {
      onSubmitCall();
    })
    .catch((err) => {
      console.log('err', err);
    });
};
const resetPickerView = () => {
  pickerValue.value = [0];
  popChooseIndex.value = 0; // 设置为默认值
};
const closePop = () => {
  popupRef.value?.close();
};
const popChooseIndex = ref(0);
const bindChange = (e) => {
  console.log('bindChange', e);
  popChooseIndex.value = e.detail.value[0];
};
const chooseTag = () => {
  console.log('chooseTag', popChooseIndex.value);
  pickerValue.value = [popChooseIndex.value];
  console.log('pickerValue.value', pickerValue.value);
  onConfirm({ selectedOptions: [columns.value[popChooseIndex.value]] });
  popupRef.value?.close();
};
</script>
<template>
  <view class="limitCalculationEdit">
    <titleCom></titleCom>
    <!-- #ifdef H5-->
    <uni-load-more iconType="circle" status="loading" v-if="isGetDataLoading" />
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <skeleton v-if="isGetDataLoading" />
    <!-- #endif -->
    <!-- <van-form @submit="onSubmit" required="auto"> -->
    <uni-forms
      ref="valiForm"
      :rules="rules"
      :modelValue="valiFormData"
      label-position="top"
      label-width="200"
    >
      <view class="formBlock" v-if="!isGetDataLoading">
        <view class="head">
          <view class="h2">请填写您的基本信息</view>
          <view class="h2">以便匹配适合您的数字金融产品</view>
        </view>
        <view class="cont comFormCont">
          <view class="typeUl">
            <view
              class="li"
              :class="{ active: chooseLi == 0 }"
              @click="setChooseLi(0)"
            >
              <image
                src="~@/static/images/limitCalculationEdit/icon_gouxuan1.png"
                v-if="chooseLi == 0"
                class="check"
              />
              <image
                src="~@/static/images/limitCalculationEdit/able.png"
                v-else
                class="check"
              />
              <image
                src="~@/static/images/limitCalculationEdit/icon_qiyerongzi@2x.png"
                class="typeImg"
              />
              <view>企业融资</view>
            </view>
            <view
              class="li"
              :class="{ active: chooseLi == 1 }"
              @click="setChooseLi(personDisable ? 0 : 1)"
            >
              <image
                src="~@/static/images/limitCalculationEdit/icon_gouxuan2.png"
                v-if="personDisable"
                class="check"
              />
              <image
                src="~@/static/images/limitCalculationEdit/icon_gouxuan1.png"
                v-if="chooseLi == 1"
                class="check"
              />
              <image
                src="~@/static/images/limitCalculationEdit/able.png"
                v-if="!personDisable && chooseLi == 0"
                class="check"
              />
              <image
                src="~@/static/images/limitCalculationEdit/icon_gerenrongzi@2x.png"
                class="typeImg2"
                v-if="!personDisable"
              />
              <image
                src="~@/static/images/limitCalculationEdit/disableP.png"
                class="typeImg2"
                v-if="personDisable"
              />
              <view>个人融资</view>
            </view>
          </view>
          <view class="p textName">
            <text class="span">*</text
            >{{ selectionObj['MV1001'] && selectionObj['MV1001'].itemName }}
          </view>
          <view class="sourceUl" v-if="selectionObj['MV1001']">
            <view
              v-for="(item, index) in selectionObj['MV1001'].values"
              :key="index"
              class="li"
              :class="{ active: sourceUlActive == index }"
              @click="chooseSourceUl(index, item)"
            >
              {{ item.text }}
            </view>
          </view>
          <view v-if="selectionObj['MV1002']" class="comFieldInpWrap">
            <uni-forms-item
              :label="selectionObj['MV1002'].itemName"
              name="establishmentYear_text"
              class="comFieldInp noBor comSelectInp"
              required
              :rules="[
                {
                  required: true,
                  errorMessage: `请选择${selectionObj['MV1002'].itemName}`,
                },
              ]"
            >
              <!--
						 微信小程序不兼容v-html 写法
						 <view
                class="fullCont"
                @click="showPop('MV1003')"
                v-html="
                  valiFormData.registrationLocation_text
                    ? valiFormData.registrationLocation_text
                    : `<span class='placeholder'>请选择</span>`
                "
              >
              </view> -->
              <view
                class="fullCont"
                @click="showPop('MV1002')"
                v-if="valiFormData.establishmentYear_text"
                >{{ valiFormData.establishmentYear_text }}
              </view>
              <view
                class="fullCont"
                @click="showPop('MV1002')"
                v-if="!valiFormData.establishmentYear_text"
              >
                <text class="placeholder">请选择</text>
              </view>
            </uni-forms-item>

            <!-- <uni-forms-item
              :label="selectionObj['MV1002'].itemName"
              name="establishmentYear_text"
              class="comFieldInp noBor comSelectInp"
              required
              :rules="[
                {
                  required: true,
                  errorMessage: `请选择${selectionObj['MV1002'].itemName}`,
                },
              ]"
            >
              <uni-easyinput
                v-model="valiFormData.establishmentYear_text"
                class="fullCont"
                placeholder="请输入年龄"
              />
              <view
                class="fullContBg"
                @click="showPop('MV1002')"
                v-html="
                  valiFormData.establishmentYear_text
                    ? valiFormData.establishmentYear_text
                    : `<span class='placeholder'>请选择</span>`
                "
              >
              </view>
            </uni-forms-item> -->
            <!-- <van-field
              v-model="establishmentYear_text"
              name="establishmentYear_text"
              readonly
              class="comFieldInp noBor comSelectInp"
              :label="selectionObj['MV1002'].itemName"
              label-align="top"
              placeholder="请选择"
              @click="showPop('MV1002')"
              :rules="[
                {
                  required: true,
                  message: `请选择${selectionObj['MV1002'].itemName}`,
                },
              ]"
            >
            </van-field> -->
          </view>
          <view v-if="selectionObj['MV1003']" class="comFieldInpWrap">
            <uni-forms-item
              :label="selectionObj['MV1003'].itemName"
              name="registrationLocation_text"
              class="comFieldInp noBor comSelectInp"
              required
              :rules="[
                {
                  required: true,
                  errorMessage: `请选择${selectionObj['MV1003'].itemName}`,
                },
              ]"
            >
              <view
                class="fullCont"
                @click="showPop('MV1003')"
                v-if="valiFormData.registrationLocation_text"
              >
                {{ valiFormData.registrationLocation_text }}
              </view>
              <view
                class="fullCont"
                @click="showPop('MV1003')"
                v-if="!valiFormData.registrationLocation_text"
                ><text class="placeholder">请选择</text>
              </view>
            </uni-forms-item>
            <!-- <van-field
              v-model="registrationLocation_text"
              name="registrationLocation_text"
              readonly
              class="comFieldInp noBor comSelectInp"
              :label="selectionObj['MV1003'].itemName"
              label-align="top"
              placeholder="请选择"
              @click="showPop('MV1003')"
              :rules="[
                {
                  required: true,
                  message: `请选择${selectionObj['MV1003'].itemName}`,
                },
              ]"
            >
            </van-field> -->
          </view>
          <view
            v-if="selectionObj['MV1016'] && isShow1016"
            class="comFieldInpWrap"
          >
            <uni-forms-item
              :label="selectionObj['MV1016'].itemName"
              name="brandManagement_text"
              class="comFieldInp noBor comSelectInp"
              required
              :rules="[
                {
                  required: true,
                  errorMessage: `请选择${selectionObj['MV1016'].itemName}`,
                },
              ]"
            >
              <view
                class="fullCont"
                @click="showPop('MV1016')"
                v-if="valiFormData.brandManagement_text"
              >
                {{ valiFormData.brandManagement_text }}
              </view>
              <view
                class="fullCont"
                @click="showPop('MV1016')"
                v-if="!valiFormData.brandManagement_text"
              >
                <text class="placeholder">请选择</text>
              </view>
            </uni-forms-item>
            <!-- <van-field
              v-model="brandManagement_text"
              name="brandManagement_text"
              readonly
              class="comFieldInp noBor comSelectInp"
              :label="selectionObj['MV1016'].itemName"
              label-align="top"
              placeholder="请选择"
              @click="showPop('MV1016')"
              :rules="[
                {
                  required: true,
                  message: `请选择${selectionObj['MV1016'].itemName}`,
                },
              ]"
            >
            </van-field> -->
          </view>
          <view
            v-if="selectionObj['MV1017'] && isShow1017"
            class="comFieldInpWrap"
          >
            <uni-forms-item
              :label="selectionObj['MV1017'].itemName"
              name="involvingImportExportTrade_text"
              class="comFieldInp noBor comSelectInp"
              required
              :rules="[
                {
                  required: true,
                  errorMessage: `请选择${selectionObj['MV1017'].itemName}`,
                },
              ]"
            >
              <view
                class="fullCont"
                @click="showPop('MV1017')"
                v-if="valiFormData.involvingImportExportTrade_text"
              >
                {{ valiFormData.involvingImportExportTrade_text }}
              </view>
              <view
                class="fullCont"
                @click="showPop('MV1017')"
                v-if="!valiFormData.involvingImportExportTrade_text"
                ><text class="placeholder">请选择</text>
              </view>
            </uni-forms-item>
            <!-- <van-field
              v-model="involvingImportExportTrade_text"
              name="involvingImportExportTrade_text"
              readonly
              class="comFieldInp noBor comSelectInp"
              :label="selectionObj['MV1017'].itemName"
              label-align="top"
              placeholder="请选择"
              @click="showPop('MV1017')"
              :rules="[
                {
                  required: true,
                  message: `请选择${selectionObj['MV1017'].itemName}`,
                },
              ]"
            >
            </van-field> -->
          </view>
          <view
            v-if="selectionObj['MV1018'] && isShow1018"
            class="comFieldInpWrap"
          >
            <uni-forms-item
              :label="selectionObj['MV1018'].itemName"
              name="projectType_text"
              class="comFieldInp noBor comSelectInp"
              required
              :rules="[
                {
                  required: true,
                  errorMessage: `请选择${selectionObj['MV1018'].itemName}`,
                },
              ]"
            >
              <view
                class="fullCont"
                @click="showPop('MV1018')"
                v-if="valiFormData.projectType_text"
                >{{ valiFormData.projectType_text }}
              </view>
              <view
                class="fullCont"
                @click="showPop('MV1018')"
                v-if="!valiFormData.projectType_text"
                ><text class="placeholder">请选择</text>
              </view>
            </uni-forms-item>
            <!-- <van-field
              v-model="projectType_text"
              name="projectType_text"
              readonly
              class="comFieldInp noBor comSelectInp"
              :label="selectionObj['MV1018'].itemName"
              label-align="top"
              placeholder="请选择"
              @click="showPop('MV1018')"
              :rules="[
                {
                  required: true,
                  message: `请选择${selectionObj['MV1018'].itemName}`,
                },
              ]"
            >
            </van-field> -->
          </view>
        </view>
      </view>
      <!-- <van-button
        class="btn"
        round
        block
        type="primary"
        native-type="submit"
        :disabled="isLoading"
        :loading="isLoading"
        loading-text="提交中..."
      >
        提交
      </van-button> -->
      <view class="btn" @click="submit" :loading="isLoading">提交</view>
      <!-- </van-form> -->
    </uni-forms>
    <uni-popup
      ref="popupRef"
      type="bottom"
      border-radius="10px 10px 0 0"
      background-color="#fff"
    >
      <view class="popHead"
        ><text class="cancel" @click="closePop">取消</text
        ><text class="tit">{{ popTit }}</text
        ><text class="confirm" @click="chooseTag">确认</text></view
      >

      <picker-view
        :value="pickerValue"
        @change="bindChange"
        class="picker-view comTimePickerC"
        indicator-class="lalalal"
      >
        <picker-view-column>
          <view class="item" v-for="(item, index) in columns" :key="index">{{
            item.text
          }}</view>
        </picker-view-column>
      </picker-view>
    </uni-popup>
    <!--   <van-popup
      v-model:show="showPicker"
      round
      position="bottom"
      overlay-class="timeSelect"
    >
      <van-picker
        :title="popTit"
        class="comTimePickerC"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup> -->
  </view>
</template>
<style lang="less" scoped>
.limitCalculationEdit {
  background: url('https://static.dstp.com.cn/img/bg03@2x.png') no-repeat;
  background-size: 100% 826rpx;
  // padding-top: 422rpx;
  background-color: #abe2ff;
  padding-bottom: 30rpx;
  // background-position: 0 -164rpx;
  .formBlock {
    width: calc(100% - 32rpx);
    min-height: 1132rpx;
    margin: 0 auto 24rpx;
    .comFormCont {
      .comFieldInp {
        background: transparent;
      }
    }
    .head {
      margin-top: 225rpx;
      padding-top: 54rpx;
      text-align: center;
      background: url(https://static.dstp.com.cn/img/wx/bgTop.png) no-repeat;
      background-size: cover;
      width: calc(100% - 32rpx);
      height: 158rpx;
      margin-bottom: -18rpx;
      .h2 {
        font-size: 30rpx;
        color: #ffffff;
        line-height: 42rpx;
      }
    }
    .cont {
      background: url(https://static.dstp.com.cn/img/wx/bg02@2x.png) no-repeat;
      background-size: 100% 100%;
      padding: 70rpx 52rpx 100rpx;
      .typeUl {
        width: 100%;
        padding: 0 20rpx;
        display: flex;
        justify-content: space-between;
        margin-bottom: 60rpx;
        .li {
          width: 260rpx;
          height: 236rpx;
          background: #ffffff;
          box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(222, 222, 222, 0.5);
          border-radius: 32rpx;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .typeImg {
            width: 94rpx;
            height: 108rpx;
            margin-bottom: 16rpx;
          }
          .typeImg2 {
            width: 94rpx;
            height: 100rpx;
            margin-bottom: 18rpx;
          }
          .check {
            position: absolute;
            top: 20rpx;
            right: 20rpx;
            width: 28rpx;
            height: 28rpx;
          }
          .h2 {
            font-weight: 600;
            font-size: 32rpx;
            line-height: 44rpx;
          }
          &.active {
            border: 4rpx solid #1f66fb;
          }
        }
      }
    }
    .textName {
      font-weight: 600;
      font-size: 24rpx;
      line-height: 34rpx;
      margin-bottom: 30rpx;
      .span {
        color: #f5173d;
      }
    }
    .sourceUl {
      padding: 0 28rpx 40rpx 20rpx;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      border-bottom: 2rpx solid #f1f1f1;
      .li {
        width: 272rpx;
        height: 70rpx;
        background: #edf4fd;
        font-weight: 600;
        font-size: 26rpx;
        color: #6b6b6b;
        line-height: 70rpx;
        border-radius: 36rpx;
        text-align: center;
        margin-bottom: 20rpx;
        &.active {
          background: #1f66fb;
          color: #ffffff;
        }
      }
    }
  }
  .btn {
    background: url(https://static.dstp.com.cn/img/wx/btn_normal@2x.png)
      no-repeat;
    background-size: 100%;
    height: 100rpx;
    line-height: 100rpx;
    font-weight: 600;
    font-size: 36rpx;
    color: #ffffff;
    width: calc(100% - 58rpx);
    margin: 24rpx 29rpx 0;
    text-align: center;
    border: none;
  }
}
</style>