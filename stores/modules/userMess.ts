import { ref } from 'vue';
import { defineStore } from 'pinia';
import { storage } from '@/utils/common.ts';
export const useUserStore = defineStore(
  'userMess',
  () => {
    const userMess = ref<{ [key: string]: any }>({});
    function setUserMessStore(params: { [key: string]: any }) {
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
          uni.setStorageSync(key, value); // [!code warning]
        },
        getItem(key) {
          return uni.getStorageSync(key); // [!code warning]
        },
      },
    },
  },
);
