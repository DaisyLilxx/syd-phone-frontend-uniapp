<script setup lang="ts">
import titleCom from '@/components/titleCom';

import { sendMobileCode, login, getUserMobile, loginWx } from '@/utils/api';
// import type { FormInstance } from 'vant';
import { onLoad } from '@dcloudio/uni-app';
import { UniFormsInstance } from '@dcloudio/uni-ui';
import { ref } from 'vue';

// import { useRouter, useRoute } from 'vue-router';
// import { sendMobileCode, login } from '@/apis/api';
import { useHeaderStore, useUserStore } from '@/stores/index';
// import type { LoginParam } from '@/types/index';
// import yhxy from './components/yhxy.vue';
// import ysxy from './components/ysxy.vue';
let countInterval: number | null = null;
const HeaderStore = useHeaderStore();
const UserStore = useUserStore();
// const username = ref('');
// const router = useRouter();
// const route = useRoute();
// const authCode = ref('');
// const checked = ref(false);
let queryParams = {};
console.log('import.meta.env ', import.meta.env);
onLoad((options) => {
  queryParams = options;
  console.log('onLoad', options);
});
const onChangeWx = (event) => {
  console.log('onChangeWxwwww', event);
  wxChecked.value = event.detail.value.length ? true : false;
};
// 校验规则
const rules = {
  username: {
    rules: [
      {
        required: true,
        errorMessage: '请输入手机号',
      },
    ],
  },
  authCode: {
    rules: [
      {
        required: true,
        errorMessage: '请输入验证码',
      },
    ],
  },
  checked: {
    rules: [{ required: true, message: '请勾选协议' }],
  },
};
const dialogClose = () => {};
// 校验表单数据
const valiFormData = ref({
  username: '',
  authCode: '',
  checked: [],
});
const formRef = ref<UniFormsInstance>();
console.log('formRef', formRef.value);
const submit = (ref) => {
  if (!valiFormData.value.checked.length) {
    return;
  }
  formRef.value
    .validate()
    .then((res) => {
      loginCall();
    })
    .catch((err) => {
      console.log('err', err);
    });
};
const test = () => {
  console.log('test');
};
const loginCall = () => {
  login(valiFormData.value)
    .then((res) => {
      const { data } = res;
      if (data.flag == 'SUCCESS' || data.token) {
        let dataStr = JSON.stringify(data);
        uni.setStorage({
          key: 'loginRes',
          data: encodeURIComponent(dataStr),
        });
        UserStore.setUserMessStore(data.userinfo);
        HeaderStore.setHeaderStore({ 'wechat-token': data.token });
        loginCallBack();
        console.log('success', res);
        uni.showToast({
          title: `登录成功`,
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
const hasSendCode = ref(false);
const countText = ref('获取验证码');
const isShowYhxy = ref(false);
const isShowYsxy = ref(false);
const wxChecked = ref(false);
const isWxLogin = ref(false);
// #ifdef MP-WEIXIN
isWxLogin.value = true;
// #endif

// const formRef = ref<FormInstance>();
// const onSubmit = (values: LoginParam) => {
//   if (!checked.value) {
//     return;
//   }
//   login(values)
//     .then((res) => {
//       const { data } = res;
//       if (data.flag == 'SUCCESS' || data.token) {
//         UserStore.setUserMessStore(data.userinfo);
//         HeaderStore.setHeaderStore({ 'wechat-token': data.token });
//         if (route.query.referPage)
//           router.replace({ path: route.query.referPage as string });
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };
const getCode = () => {
  if (hasSendCode.value) return;
  console.log('formRef.value', formRef.value);
  formRef.value
    ?.validateField('username')
    .then(() => {
      // 如果验证通过，执行获取验证码的逻辑
      console.log('验证码已发送');
      sendMobileCode({ mobile: valiFormData.value.username }).then((res) => {
        hasSendCode.value = true;
        let time = 60;
        countText.value = `${time}s后重发`;
        countInterval = setInterval(() => {
          if (time == 1) {
            hasSendCode.value = false;
            clearInterval(countInterval!);
            countText.value = `获取验证码 `;
          } else {
            time--;
            countText.value = `${time}s后重发`;
          }
        }, 1000);
        console.log(res.data);
      });
    })
    .catch((error) => {
      // 验证未通过，提示错误信息
      console.log('error', error);
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
// onUnmounted(() => {
//   if (countInterval) {
//     clearInterval(countInterval);
//   }
// });
const range = [{ value: 1, text: '已阅读并同意' }];
const change = () => {
  console.log('change', valiFormData.value);
};
const alertDialog = ref(null);

const getPhoneNumber = (e) => {
  console.log('getPhoneNumber-e', e);
  console.log(e.detail.code); // 动态令牌
  console.log(e.detail.errMsg); // 回调信息（成功失败都会返回）
  console.log(e.detail.errno); // 错误码（失败时返回）
  if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
    console.log('用户拒绝');
    //用户拒绝
    alertDialog.value.open();
  } else if (e.detail.errMsg == 'getPhoneNumber:ok') {
    console.log(e.detail.code);
    getUserMobile({ code: e.detail.code })
      .then((res) =>
        loginWx({ username: res.data.data }, { 'login-strategy': '20' }),
      )
      .then((resUser) => {
        console.log('resUser', resUser);
        uni.showToast({
          title: '登录成功',
          duration: 2000,
        });

        //  const openId = route.query.openId as string
        if (resUser.data) {
          const loginResObj = resUser.data;
          UserStore.setUserMessStore(loginResObj.userinfo);
          HeaderStore.setHeaderStore({ 'wechat-token': loginResObj.token });
          console.log('route', loginResObj);
        }

        let data = JSON.stringify(resUser.data);
        uni.setStorage({
          key: 'loginRes',
          data: encodeURIComponent(data),
        });
        //  appInstance.globalData.loginRes = encodeURIComponent(data)
        setTimeout(() => {
          loginCallBack();
        }, 800);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
};
const loginCallBack = () => {
  if (queryParams.referPage) {
    if (queryParams.referPage == '/my') {
      //我的
      uni.switchTab({
        url: '/pages/my/my',
      });
    } else if (queryParams.referPage == '/completeMess') {
      //完善信息页
      uni.redirectTo({
        url: '/pages/completeMess/completeMess',
      });
    }
  }
};
const goPhoneLogin = () => {
  alertDialog.value.close();
  isWxLogin.value = false;
};
</script>
<template>
  <view class="login">
    <titleCom title="登录"></titleCom>
    <view class="tit">欢迎来到</view>
    <image src="~@/static/images/login/story_logo@2x.png" class="company" />
    <view class="main">
      <view class="phonePart" v-if="!isWxLogin">
        <!-- 基础表单校验 -->
        <uni-forms ref="formRef" :rules="rules" :modelValue="valiFormData">
          <uni-forms-item label="" name="username">
            <view class="fieldInp phoneInp">
              <uni-easyinput
                v-model="valiFormData.username"
                placeholder="请输入手机号"
                type="number"
              ></uni-easyinput>
            </view>
          </uni-forms-item>
          <uni-forms-item label="" name="authCode">
            <view class="fieldInp codeInp">
              <uni-easyinput
                v-model="valiFormData.authCode"
                placeholder="请输入验证码"
                type="tel"
              >
                <template #right>
                  <view
                    class="codeBtn"
                    :class="hasSendCode ? 'disableBtn' : ''"
                    :disabled="hasSendCode"
                    @click="getCode"
                  >
                    {{ countText }}
                  </view>
                </template>
              </uni-easyinput>
            </view>
          </uni-forms-item>
          <uni-forms-item label="" name="checked">
            <view class="checkWrap">
              <uni-data-checkbox
                v-model="valiFormData.checked"
                multiple
                :localdata="range"
                @change="change"
              ></uni-data-checkbox>

              <!-- <van-checkbox
            shape="square"
            name="checkedFlag"
            v-model="checked"
            :rules="[{ required: true, message: '请勾选协议' }]"
            >已阅读并同意</van-checkbox
          > -->
              <text class="xy"
                ><text @click="showYhxy">《用户协议》</text>、<text
                  @click="showYsxy"
                  >《隐私政策》</text
                ></text
              >
            </view>
          </uni-forms-item>
          <view
            class="comNormalSubBtn"
            :class="
              valiFormData.checked.length ? '' : 'comNormalSubBtnDisabled'
            "
          >
            <button
              round
              block
              type="primary"
              class="actBtn"
              native-type="submit"
              @click="submit('formRef')"
            >
              提交
            </button>
          </view>
          <view class="p"
            >若您没有注册账号，点击登录后系统会自动为您注册。</view
          >
          <!-- #ifdef MP-WEIXIN -->
          <view class="toWxLogin">
            <view class="other"> 其他登陆方式 </view>
            <button
              round
              block
              type="primary"
              class="actOneBtn"
              @click="goWxlogin"
            >
              用户一键登录
            </button>
          </view>
          <!-- #endif -->
        </uni-forms>
      </view>
      <view v-if="isWxLogin" class="wxLoginPart">
        <view
          class="comNormalSubBtn"
          :class="wxChecked ? '' : 'comNormalSubBtnDisabled'"
        >
          <button
            open-type="getPhoneNumber"
            :disabled="!wxChecked"
            @getphonenumber="getPhoneNumber"
            type="default"
            class="actBtnLogin"
          >
            用户一键登录
          </button>
        </view>
        <view class="checkWrap">
          <checkbox-group @change="onChangeWx" class="checkboxGroup">
            <label
              ><checkbox
                value="同意"
                :checked="wxChecked"
                color="#1f66fb"
                style="transform: scale(0.6); margin-top: 4px"
              />
              已阅读并同意</label
            ></checkbox-group
          >
          <text class="xy"
            ><text @click="showYhxy">《用户协议》</text>、<text
              @click="showYsxy"
              >《隐私政策》</text
            ></text
          >
        </view>
        <!-- <view class="checkWrap">
          <van-checkbox
            shape="square"
            name="checkedFlag"
            @change="onChangeWx"
            :value="wxChecked"
            >我认真阅读并同意DSTP数字服务贸易平台</van-checkbox
          >
          <view class="xy"
            ><text @tap="showYhxy">《用户协议》</text>、<text @tap="showYsxy"
              >《隐私政策》</text
            ></view>
        </view> -->
        <view class="other"> 其他登陆方式 </view>

        <view class="tc" @click="showPhoneLogin">
          <button>短信验证码登录</button>
        </view>
        <view class="p">若您没有注册账号，点击登录后系统会自动为您注册。</view>
      </view>
      <!--  <van-form @submit="onSubmit" ref="formRef">
        <van-field
          v-model="username"
          class="fieldInp phoneInp"
          name="username"
          type="number"
          placeholder="请输入手机号"
          maxlength="11"
          :rules="[{ required: true, message: '请输入手机号' }]"
        >
        </van-field>
        <van-field
          v-model="authCode"
          name="authCode"
          class="fieldInp codeInp"
          type="tel"
          placeholder="请输入验证码"
          maxlength="6"
          :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <template #button>
            <view
              class="codeBtn"
              :class="hasSendCode ? 'disableBtn' : ''"
              :disabled="hasSendCode"
              @click="getCode"
            >
              {{ countText }}
            </view>
          </template>
        </van-field>
        <view class="checkWrap">
          <van-checkbox
            shape="square"
            name="checkedFlag"
            v-model="checked"
            :rules="[{ required: true, message: '请勾选协议' }]"
            >已阅读并同意</van-checkbox
          ><span class="xy"
            ><span @click="showYhxy">《用户协议》</span>、<span
              @click="showYsxy"
              >《隐私政策》</span
            ></span
          >
        </view>
        <view
          class="comNormalSubBtn"
          :class="checked ? '' : 'comNormalSubBtnDisabled'"
        >
          <van-button
            round
            block
            type="primary"
            class="actBtn"
            native-type="submit"
          >
            提交
          </van-button>
        </view>
        <view class="p">若您没有注册账号，点击登录后系统会自动为您注册。</view>
      </van-form> -->
    </view>
    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        type="info"
        cancelText="知道了"
        confirmText="确定"
        title="授权失败"
        content="您已拒绝获取绑定手机号登录授权，可使用其他手机号验证登录"
        @confirm="goPhoneLogin"
        @close="dialogClose"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
  <!-- 圆角弹窗（底部） -->
  <!-- <van-popup
    v-model:show="isShowYhxy"
    :closeable="true"
    round
    position="bottom"
    :style="{ height: '80%' }"
  >
    <yhxy />
  </van-popup>
  <van-popup
    v-model:show="isShowYsxy"
    :closeable="true"
    round
    position="bottom"
    :style="{ height: '80%' }"
  >
    <ysxy />
  </van-popup> -->
</template>
<style lang="less" scoped>
.other {
  text-align: center;
  position: relative;
  width: 100%;
  font-size: 26rpx;
  color: #8b8b8b;
}
.other::before {
  content: '';
  display: inline-block;
  width: 30%;
  height: 1rpx;
  position: absolute;
  background: #ababab;
  left: 0;
  top: 15rpx;
}
.other::after {
  content: '';
  display: inline-block;
  width: 30%;
  height: 1rpx;
  position: absolute;
  background: #ababab;
  right: 0;
  top: 15rpx;
}
.tc {
  text-align: center;
  font-size: 24rpx;
  color: #8b8b8b;
  margin-bottom: 130rpx;
}
.tc .iconMess {
  margin: 30rpx 0 15rpx;
}
.toWxLogin {
  margin-top: 100rpx;
}
.toWxLogin .actBtn button,
.toWxLogin .actOneBtn,
.tc button {
  width: max-content;
  margin-top: 30rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-weight: normal;
  font-size: 26rpx;
}
.tc button,
.toWxLogin .actOneBtn {
  margin: 30rpx auto;
  padding: 0 30rpx;
  background: #07c160;
  color: #fff;
  border-radius: 999rpx;
}
.login {
  background: url('https://static.dstp.com.cn/img/bg01@2x.png') no-repeat;
  background-size: 100% 866rpx;
  background-color: #fff;

  padding-bottom: 14rpx;
  .van-cell:after {
    display: none;
  }
  .company {
    margin: 10rpx 0 70rpx 66rpx;
    width: 446rpx;
    height: 106rpx;
  }
  .tit {
    font-weight: 600;
    font-size: 48rpx;
    color: #001d3f;
    line-height: 66rpx;
    margin-left: 70rpx;
    margin-top: 54rpx;
  }
  .main {
    background: url(https://static.dstp.com.cn/img/wx/loginBg.png) no-repeat;
    background-size: 100% 1128rpx;
    width: calc(100% - 32rpx);
    margin: 0 auto;
    height: 1128rpx;
    padding: 106rpx 52rpx 20rpx;
    .comNormalSubBtn {
      margin: 0;
      width: 100%;
      .actBtn button,
      .actBtnLogin {
        background: none;
        border: none;
        height: 100rpx;
        line-height: 100rpx;
        font-weight: 600;
        font-size: 36rpx;
      }
      .actBtnLogin {
        border-radius: 100rpx;
        color: #fff;
      }
    }
    .wxLoginPart {
      padding-top: 60rpx;
      .comNormalSubBtn {
        margin-bottom: 30rpx;
      }
      .checkboxGroup {
        label {
          display: flex;
          line-height: 34rpx;
          justify-content: center;
          align-items: center;
        }
      }
      .checkWrap {
        // display: block;
        // margin-bottom: 300rpx;
        // .xy {
        //   margin-left: 28rpx;
        // }
      }
    }
    .phoneIcon {
      display: inline-block;
      width: 32rpx;
      height: 32rpx;
      background: url(https://static.dstp.com.cn/img/wx/shouji-2@2x.png)
        no-repeat;
      background-size: 100%;
      margin-left: 54rpx;
      margin-top: 34rpx;
    }
    :deep(.uni-forms-item) {
      margin-bottom: 40rpx;
      .uni-forms-item__error {
        font-size: 28rpx;
        padding-top: 5rpx;
        line-height: 35rpx;
        padding-left: 108rpx;
      }
    }
    .fieldInp {
      // :deep(.uni-easyinput__content-input) {
      border-radius: 50rpx;
      border: 2rpx solid #dbe5f9;
      padding: 26rpx 48rpx 26rpx 108rpx;
      font-size: 32rpx;
      line-height: 44rpx;
      position: relative;

      // }
      :deep(.uni-easyinput__content-input),
      :deep(.uni-easyinput),
      :deep(.uni-easyinput__placeholder-class) {
        height: 44rpx !important;
        font-size: 32rpx !important;
        line-height: 44rpx !important;
        padding-left: 0 !important;
      }
      :deep(.is-input-border) {
        border: none !important;
        height: 100% !important;
      }
      &.phoneInp {
        &::before {
          content: '';
          display: inline-block;
          width: 32rpx;
          height: 32rpx;
          background: url(https://static.dstp.com.cn/img/wx/shouji-2@2x.png)
            no-repeat;
          background-size: 100%;
          position: absolute;
          left: 54rpx;
          top: 34rpx;
        }
      }
      &.codeInp {
        &::before {
          flex-shrink: 0;
          content: '';
          display: inline-block;
          width: 32rpx;
          height: 32rpx;
          background: url(https://static.dstp.com.cn/img/wx/yanzhengma@2x.png)
            no-repeat;
          background-size: 100%;
          position: absolute;
          left: 54rpx;
          top: 34rpx;
        }
      }
    }
    .p {
      margin-top: 40rpx;
      text-align: center;
      font-size: 24rpx;
      color: #8b8b8b;
      line-height: 32rpx;
    }
    .phoneIcon {
    }
    .codeIcon {
      display: inline-block;
      width: 32rpx;
      height: 32rpx;
      background: url(https://static.dstp.com.cn/img/wx/yanzhengma@2x.png)
        no-repeat;
      background-size: 100%;
    }
    .codeBtn {
      font-size: 28rpx;
      color: #1f66fb;
      line-height: 40rpx;
      &.disableBtn {
        color: #8b8b8b;
      }
    }
    :deep(.van-field__label) {
      width: auto;
      display: flex;
      align-items: center;
    }
    :deep(.uni-data-checklist) {
      flex: none;
      .checklist-group {
        .checklist-box {
          margin: 0 !important;
        }
      }
    }
    .checkWrap {
      display: flex;
      padding-left: 60rpx;
      font-size: 24rpx;
      color: #575757;
      line-height: 34rpx;
      margin-bottom: 148rpx;
      align-items: center;
      .xy {
        color: #1f66fb;
      }
    }
    .comNormalSubBtn {
      margin: 0;
      width: 100%;
      .actBtn {
        background: none;
        border: none;
        border-radius: 50rpx;
        height: 100rpx;
        line-height: 100rpx;
        font-weight: 600;
        font-size: 36rpx;
      }
    }
  }
}
</style>
