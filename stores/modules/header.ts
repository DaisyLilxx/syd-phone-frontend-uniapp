import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Headers } from '@/types/index';
export const useHeaderStore = defineStore(
  'headerStore',
  () => {
    const headers = ref<Headers>({ openId: '', channelCode: '' });
    function setHeaderStore(params: Headers) {
      headers.value = { ...headers.value, ...params };
    }
    function clearHeaderStore() {
      headers.value = { openId: '', channelCode: '' };
    }
    return { headers, setHeaderStore, clearHeaderStore };
  },
  {
    // 配置持久化
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
