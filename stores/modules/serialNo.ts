import { ref } from 'vue';
import { defineStore } from 'pinia';
export const useSerialNoStore = defineStore(
  'serialNo',
  () => {
    const serialNo = ref<string>('');
    function setSerialNoStore(params: string) {
      serialNo.value = params;
    }
    function clearSerialNoStore() {
      serialNo.value = '';
    }
    return { serialNo, setSerialNoStore, clearSerialNoStore };
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
