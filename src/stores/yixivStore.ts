import { computed, ref } from "vue"
import { defineStore } from 'pinia';

const SEARCH_TYPE = 'inputSearchTypes';

export const yixivStore =defineStore('yixivStore', () => {

  // 搜索类型
  const baseInputSearchTypes = ref<number>(0);
  const inputSearchTypes = computed(() => {
    const localSearchType = localStorage.getItem(SEARCH_TYPE);
    if(!localSearchType) {
      localStorage.setItem(SEARCH_TYPE, String(baseInputSearchTypes.value));
      return 0;
    } else {
      baseInputSearchTypes.value = Number(localSearchType);
      return baseInputSearchTypes.value;
    }
  });
  const setSearchType = (value: number) => {
    if(baseInputSearchTypes.value === value) return;
    baseInputSearchTypes.value = value;
    localStorage.setItem(SEARCH_TYPE, String(value));
  };

  // 导航栏 index
  const navigationBarActiveIndex = ref<number>(0);
  const setNavigationBarActiveIndex = (index: number): void => {
    if(index === navigationBarActiveIndex.value) {
      return;
    }
    navigationBarActiveIndex.value = index;
  };

  return {
    navigationBarActiveIndex,
    setNavigationBarActiveIndex,
    // 搜索功能标签选项
    inputSearchTypes,
    setSearchType,
  }
});
