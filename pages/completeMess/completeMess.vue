<script setup lang="ts">
import titleCom from '@/components/titleCom';
import { ref, onBeforeUnmount, onMounted } from 'vue';
import { UniFormsInstance } from '@dcloudio/uni-ui';
// import { useRouter } from 'vue-router';
import { getItemValue, calculateResult } from '@/utils/api';
import { useSerialNoStore } from '@/stores/index';
// import { dealParamFromWxWebView } from '@/utils/common';
import type { CalculateResultParam } from '@/types/index';
// const router = useRouter();
const isLoading = ref(false);
const SerialNoStore = useSerialNoStore();

const isShow1018 = ref(false);
const isShow1017 = ref(false);
const isShow1016 = ref(false);
const isShow1001 = ref(false);
const contactData = ref<{ [key: string]: any }>({});
const valiForm = ref<UniFormsInstance>();
// dealParamFromWxWebView();
const formData = ref<CalculateResultParam>({
  averageMonthlyReceivableB2B: '',
  averageMonthlyReceivableB2C: '',
  distributorMonthlyPurchaseAmount: '',
  entName: '',
  enterpriseLoanBalance: '',
  governmentBiddingContractAmount: '',
  lastYearImportExportTradeAmount: '',
  lastYearNetProfit: '',
  lastYearOperatingIncome: '',
  purchaseToPaymentTime: '',
  serialNo: '',
});
let countTime: number | null = null;
const time = ref(10);
const submitAct = () => {
  valiForm.value
    .validate()
    .then((res) => {
      onSubmitCall(formData.value);
    })
    .catch((err) => {
      console.log('err', err);
    });
};
const onSubmitCall = (values: CalculateResultParam) => {
  console.log('submit', values);
  formData.value.serialNo = SerialNoStore.serialNo;
  isLoading.value = true;
  if (countTime) return;
  countTime = setInterval(function () {
    time.value--;
    if (time.value == 0) {
      clearInterval(countTime!);
    }
  }, 1000);
  calculateResult(formData.value).then((res) => {
    if (res.data.flag == 'SUCCESS') {
      if (countTime) clearInterval(countTime!);
      // router.push('/result');
      uni.navigateTo({
        url: '/pages/result/result',
      });
    }
  });
};
onMounted(() => {
  getItemValue({ serialNo: SerialNoStore.serialNo }).then((res) => {
    contactData.value = res.data.data!;
    console.log('contactData.value', contactData.value);
    if (contactData.value['MV1018']) isShow1018.value = true;
    if (contactData.value['MV1017']) isShow1017.value = true;
    if (contactData.value['MV1016']) isShow1016.value = true;
    if (contactData.value['MV1001']) isShow1001.value = true;
  });
});
const onInput = (e: any, key: keyof CalculateResultParam) => {
  console.log('onInput', e);
  let val: string = e;
  // 最多只允许输入12位正数并限制最多2位小数的正则
  const regex = /^\d{1,12}(\.\d{1,2})?$/;
  console.log('aaa', regex.test(val));
  // 如果输入的值符合正则规则，更新值
  if (regex.test(val)) {
    formData.value[key] = val;
  } else {
    val = val
      .replace(/[^0-9.]/g, '') // 移除非数字和小数点
      .replace(/^0+(\d)/, '$1') // 移除多余的前导0
      .replace(/(\..*)\./g, '$1') // 删除多余的小数点
      .replace(/^(\d{12})\d+/, '$1') // 限制整数部分最多12位
      .replace(/(\.\d{2})\d+/, '$1'); // 限制小数点后最多2位
    formData.value[key] = val;
  }
};
// 最多只允许输入12位正数或负数并限制最多2位小数的正则
const onInputFs = (e: any, key: keyof CalculateResultParam) => {
  let val = e.target.value;
  // 最多只允许输入12位正数或负数并限制最多2位小数的正则
  const regex = /^-?\d{0,12}(\.\d{0,2})?$/;
  // 如果输入的值符合正则规则，更新值
  if (regex.test(val)) {
    formData.value[key] = val;
  } else {
    val = val
      .replace(/[^0-9.-]/g, '') // 移除所有非数字、非负号和小数点的字符
      .replace(/(\..*)\./g, '$1') // 确保只允许一个小数点
      .replace(/(?!^)-/g, '') // 确保负号只允许在开头
      .replace(/^(-?\d{12})\d*(\.\d*)?/, '$1$2') // 限制整数部分最多12位
      .replace(/(\.\d{2})\d+/, '$1'); // 限制小数点后最多2位
    // 更新 formData 和输入框的值
    formData.value[key] = val;
    e.target.value = val; // 更新输入框的值
  }
};
onBeforeUnmount(() => {
  if (countTime) clearInterval(countTime); // 组件卸载时清除定时器，避免内存泄漏
});
</script>
<template>
  <view class="pageBg completeMess" v-if="!isLoading">
    <titleCom title="额度预测"></titleCom>
    <!-- <van-form @submit="onSubmit" required="auto"> -->
    <uni-forms
      ref="valiForm"
      :modelValue="formData"
      label-position="top"
      label-width="300"
    >
      <view class="main">
        <view class="head">
          <view>提供更多信息，快速了解自己的数据潜</view>
          <view>力，获得更详细的授信额度预测数据</view>
        </view>
        <view class="comFormCont">
          <view class="comFieldInp">
            <uni-forms-item
              label="企业名称"
              required
              name="entName"
              :rules="[{ required: true, errorMessage: '请填入企业名称' }]"
            >
              <uni-easyinput
                v-model="formData.entName"
                placeholder="请填入企业名称"
                maxlength="32"
              />
            </uni-forms-item>
          </view>
          <!-- <van-field
            class="comFieldInp"
            v-model="formData.entName"
            name="entName"
            label="企业名称"
            maxlength="32"
            placeholder="请填入企业名称"
            label-align="top"
            :rules="[{ required: true, message: '请填入企业名称' }]"
          >
          </van-field> -->
          <view class="comFieldInp">
            <uni-forms-item
              label="上一自然年营业收入"
              required
              name="lastYearOperatingIncome"
              :rules="[
                { required: true, errorMessage: '请填入上一自然年营业收入' },
              ]"
            >
              <uni-easyinput
                type="number"
                @input="(e) => onInput(e, 'lastYearOperatingIncome')"
                v-model="formData.lastYearOperatingIncome"
                placeholder="请填入企业名称"
                ><template #right>
                  <text>万元</text>
                </template>
              </uni-easyinput>
            </uni-forms-item>
          </view>
          <!-- <van-field
            class="comFieldInp"
            v-model="formData.lastYearOperatingIncome"
            name="lastYearOperatingIncome"
            type="number"
            @input="(e) => onInput(e, 'lastYearOperatingIncome')"
            label="上一自然年营业收入"
            placeholder="请填入上一自然年营业收入"
            label-align="top"
            :rules="[{ required: true, message: '请填入上一自然年营业收入' }]"
          >
            <template #right-icon>
              <text>万元</text>
            </template>
          </van-field> -->
          <!-- <van-field
            class="comFieldInp"
            v-model="formData.lastYearNetProfit"
            name="lastYearNetProfit"
            type="text"
            @input="(e) => onInputFs(e, 'lastYearNetProfit')"
            label="上一自然年净利润"
            placeholder="请填入上一自然年净利润"
            label-align="top"
            :rules="[{ required: true, message: '请填入上一自然年净利润' }]"
          >
            <template #right-icon>
              <text>万元</text>
            </template>
          </van-field> -->
          <view class="comFieldInp">
            <uni-forms-item
              label="上一自然年净利润"
              required
              name="lastYearNetProfit"
              :rules="[
                { required: true, errorMessage: '请填入上一自然年净利润' },
              ]"
            >
              <uni-easyinput
                type="text"
                @input="(e) => onInput(e, 'lastYearNetProfit')"
                v-model="formData.lastYearNetProfit"
                placeholder="请填入上一自然年净利润"
                ><template #right>
                  <text>万元</text>
                </template>
              </uni-easyinput>
            </uni-forms-item>
          </view>
          <!--  <van-field
            class="comFieldInp"
            type="number"
            v-model="formData.enterpriseLoanBalance"
            name="enterpriseLoanBalance"
            @input="(e) => onInput(e, 'enterpriseLoanBalance')"
            label="企业借款余额"
            placeholder="请填入企业借款余额"
            label-align="top"
            :rules="[{ required: true, message: '请填入企业借款余额' }]"
          >
            <template #right-icon>
              <text>万元</text>
            </template>
          </van-field> -->
          <view class="comFieldInp">
            <uni-forms-item
              label="企业借款余额"
              required
              name="enterpriseLoanBalance"
              :rules="[{ required: true, errorMessage: '请填入企业借款余额' }]"
            >
              <uni-easyinput
                type="number"
                @input="(e) => onInput(e, 'enterpriseLoanBalance')"
                v-model="formData.enterpriseLoanBalance"
                placeholder="请填入企业借款余额"
                ><template #right>
                  <text>万元</text>
                </template>
              </uni-easyinput>
            </uni-forms-item>
          </view>
          <!-- <van-field
            v-if="isShow1018"
            class="comFieldInp"
            type="number"
            v-model="formData.governmentBiddingContractAmount"
            name="governmentBiddingContractAmount"
            @input="(e) => onInput(e, 'governmentBiddingContractAmount')"
            label="政府招标项目合同金额"
            placeholder="请填入政府招标项目合同金额"
            label-align="top"
            :rules="[{ required: true, message: '请填入政府招标项目合同金额' }]"
          >
            <template #right-icon>
              <text>万元</text>
            </template>
          </van-field> -->
          <view class="comFieldInp" v-if="isShow1018">
            <uni-forms-item
              label="政府招标项目合同金额"
              required
              name="governmentBiddingContractAmount"
              :rules="[
                { required: true, errorMessage: '请填入政府招标项目合同金额' },
              ]"
            >
              <uni-easyinput
                type="number"
                @input="(e) => onInput(e, 'governmentBiddingContractAmount')"
                v-model="formData.governmentBiddingContractAmount"
                placeholder="请填入政府招标项目合同金额"
                ><template #right>
                  <text>万元</text>
                </template>
              </uni-easyinput>
            </uni-forms-item>
          </view>

          <!--    <van-field
            v-if="isShow1017 && contactData['MV1017'] == '涉及进出口贸易'"
            class="comFieldInp"
            type="number"
            v-model="formData.lastYearImportExportTradeAmount"
            name="lastYearImportExportTradeAmount"
            @input="(e) => onInput(e, 'lastYearImportExportTradeAmount')"
            label="上一自然年进出口贸易额"
            placeholder="请填入上一自然年进出口贸易额"
            label-align="top"
            :rules="[
              { required: true, message: '请填入上一自然年进出口贸易额' },
            ]"
          >
            <template #right-icon>
              <text>万元</text>
            </template>
          </van-field>-->
          <view
            class="comFieldInp"
            v-if="isShow1017 && contactData['MV1017'] == '涉及进出口贸易'"
          >
            <uni-forms-item
              label="上一自然年进出口贸易额"
              required
              name="lastYearImportExportTradeAmount"
              :rules="[
                {
                  required: true,
                  errorMessage: '请填入上一自然年进出口贸易额',
                },
              ]"
            >
              <uni-easyinput
                type="number"
                @input="(e) => onInput(e, 'lastYearImportExportTradeAmount')"
                v-model="formData.lastYearImportExportTradeAmount"
                placeholder="请填入政府招标项目合同金额"
                ><template #right>
                  <text>万元</text>
                </template>
              </uni-easyinput>
            </uni-forms-item>
          </view>
          <!--  <van-field
            v-if="isShow1016 && contactData['MV1016'] == '有品牌经销权'"
            type="number"
            class="comFieldInp"
            v-model="formData.distributorMonthlyPurchaseAmount"
            name="distributorMonthlyPurchaseAmount"
            @input="(e) => onInput(e, 'distributorMonthlyPurchaseAmount')"
            label="品牌经销商月均采购金额"
            placeholder="请填入品牌经销商月均采购金额"
            label-align="top"
            :rules="[
              { required: true, message: '请填入品牌经销商月均采购金额' },
            ]"
          >
            <template #right-icon>
              <text>万元</text>
            </template>
          </van-field>-->
          <view
            class="comFieldInp"
            v-if="isShow1016 && contactData['MV1016'] == '有品牌经销权'"
          >
            <uni-forms-item
              label="品牌经销商月均采购金额"
              required
              name="distributorMonthlyPurchaseAmount"
              :rules="[
                {
                  required: true,
                  errorMessage: '请填入品牌经销商月均采购金额',
                },
              ]"
            >
              <uni-easyinput
                type="number"
                @input="(e) => onInput(e, 'distributorMonthlyPurchaseAmount')"
                v-model="formData.distributorMonthlyPurchaseAmount"
                placeholder="请填入品牌经销商月均采购金额"
                ><template #right>
                  <text>万元</text>
                </template>
              </uni-easyinput>
            </uni-forms-item>
          </view>
          <!--<van-field
            v-if="isShow1016 && contactData['MV1016'] == '有品牌经销权'"
            v-model="formData.purchaseToPaymentTime"
            name="purchaseToPaymentTime"
            class="comFieldInp noBor"
            label="从采购到回款耗时多少天"
            label-align="top"
            type="digit"
            maxlength="3"
            placeholder="填入从采购到回款耗时多少天"
            :rules="[
              { required: true, message: '请填入从采购到回款耗时多少天' },
            ]"
          >
            <template #right-icon>
              <text>天</text>
            </template>
          </van-field>-->
          <view
            v-if="isShow1016 && contactData['MV1016'] == '有品牌经销权'"
            class="comFieldInp noBor"
          >
            <uni-forms-item
              label="从采购到回款耗时多少天"
              required
              name="purchaseToPaymentTime"
              maxlength="3"
              :rules="[
                { required: true, errorMessage: '填入从采购到回款耗时多少天' },
              ]"
            >
              <uni-easyinput
                maxlength="3"
                type="number"
                @input="(e) => onInput(e, 'purchaseToPaymentTime')"
                v-model="formData.purchaseToPaymentTime"
                placeholder="填入从采购到回款耗时多少天"
                ><template #right>
                  <text>万元</text>
                </template>
              </uni-easyinput>
            </uni-forms-item>
          </view>
          <!-- <van-field
            v-if="isShow1001 && contactData['MV1001'] == '线上电商平台销售'"
            class="comFieldInp"
            type="number"
            v-model="formData.averageMonthlyReceivableB2B"
            name="averageMonthlyReceivableB2B"
            @input="(e) => onInput(e, 'averageMonthlyReceivableB2B')"
            label="电商平台月均应收账款余额（B2B）"
            placeholder="请填入电商平台月均应收账款余额"
            label-align="top"
            :rules="[
              { required: true, message: '请填入电商平台月均应收账款余额' },
            ]"
          >
            <template #right-icon>
              <text>万元</text>
            </template>
          </van-field>-->
          <view
            v-if="isShow1001 && contactData['MV1001'] == '线上电商平台销售'"
            class="comFieldInp"
          >
            <uni-forms-item
              label="电商平台月均应收账款余额（B2B）"
              required
              name="averageMonthlyReceivableB2B"
              :rules="[
                {
                  required: true,
                  errorMessage: '请填入电商平台月均应收账款余额',
                },
              ]"
            >
              <uni-easyinput
                type="number"
                @input="(e) => onInput(e, 'averageMonthlyReceivableB2B')"
                v-model="formData.averageMonthlyReceivableB2B"
                placeholder="请填入电商平台月均应收账款余额"
                ><template #right>
                  <text>万元</text>
                </template>
              </uni-easyinput>
            </uni-forms-item>
          </view>
          <!--<van-field
            v-if="isShow1001 && contactData['MV1001'] == '线上电商平台销售'"
            class="comFieldInp"
            type="number"
            v-model="formData.averageMonthlyReceivableB2C"
            name="averageMonthlyReceivableB2C"
            @input="(e) => onInput(e, 'averageMonthlyReceivableB2C')"
            label="电商平台月均应收账款余额（B2C）"
            placeholder="请填入电商平台月均应收账款余额"
            label-align="top"
            :rules="[
              { required: true, message: '请填入电商平台月均应收账款余额' },
            ]"
          >
            <template #right-icon>
              <text>万元</text>
            </template>
          </van-field>-->
          <view
            v-if="isShow1001 && contactData['MV1001'] == '线上电商平台销售'"
            class="comFieldInp"
          >
            <uni-forms-item
              label="电商平台月均应收账款余额（B2C）"
              required
              name="averageMonthlyReceivableB2C"
              :rules="[
                {
                  required: true,
                  errorMessage: '请填入电商平台月均应收账款余额',
                },
              ]"
            >
              <uni-easyinput
                type="number"
                @input="(e) => onInput(e, 'averageMonthlyReceivableB2C')"
                v-model="formData.averageMonthlyReceivableB2C"
                placeholder="请填入电商平台月均应收账款余额"
                ><template #right>
                  <text>万元</text>
                </template>
              </uni-easyinput>
            </uni-forms-item>
          </view>
        </view>
      </view>
      <!-- <van-button
        class="comSubBtn"
        round
        block
        type="primary"
        native-type="submit"
      >
        提交
      </van-button> -->
      <button class="comSubBtn" @click="submitAct">提交</button>
      <!--   <view class="comSubBtn" @click="submitAct">提交</view> -->
    </uni-forms>
  </view>
  <view class="pageBg completeMess2" v-if="isLoading">
    <titleCom title="额度预测"></titleCom>
    <view class="submitLoading">
      <image src="https://static.dstp.com.cn/img/loading.gif" class="loadImg" />
      <view class="tit">额度测算中</view>
      <view class="text">
        正在努力为您测算，请稍等…<text>{{ time }}s</text>
      </view>
    </view>
  </view>
</template>

<style lang="less" scoped>
.completeMess {
  background-color: #f6f9fc;
  padding-top: 0;
  padding-bottom: 30rpx;
  .main {
    height: auto;
    width: calc(100% - 32rpx);
    margin: 0 auto;
    margin-bottom: 24rpx;
    .head {
      padding-top: 54rpx;
      text-align: center;
      background: url(https://static.dstp.com.cn/img/wx/bgTop.png) no-repeat;
      background-size: 100%;
      width: calc(100% - 32rpx);
      height: 158rpx;
      margin-bottom: -10rpx;
      font-size: 30rpx;
      color: #ffffff;
      line-height: 42rpx;
      padding-left: 32rpx;
    }
    .comFormCont {
      padding-top: 20rpx;
      background: #ffffff;
      box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(222, 222, 222, 0.5);
      border-radius: 32rpx;
    }
  }
}
.completeMess2 {
  padding-top: 20rpx;
  padding-bottom: 30rpx;
}
.comSelectInp {
  :deep(.van-field__body) {
    width: 552rpx;
  }
  :deep(.van-field__value) {
    &::after {
      display: inline-block;
      position: absolute;
      content: '天';
      font-size: 28rpx;
      right: 0;
      top: 16rpx;
      line-height: 40rpx;
    }
  }
}
.submitLoading {
  text-align: center;
  width: calc(100% - 56rpx);
  height: 1398rpx;
  background: #ffffff;
  box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(222, 222, 222, 0.5);
  border-radius: 32rpx;
  margin: 0 auto;
  padding-top: 198rpx;
  .loadImg {
    width: 385rpx;
    height: 182rpx;
    margin: 0 auto 100rpx;
  }
  .tit {
    font-weight: 600;
    font-size: 44rpx;
    line-height: 60rpx;
    margin-bottom: 30rpx;
  }
  .text {
    font-size: 28rpx;
    color: #575757;
    line-height: 40rpx;
    text {
      color: #fe2525;
    }
  }
}
</style>
