<template>
  <div class="page">
    <yixiv-header
      class="nav"
      :navigation="navigation"
      :active-navigation="navigation[store.navigationBarActiveIndex].path"
      @change-menu="onChangeRouter"
      />
    <router-view />
  </div>
</template>
<script setup lang='ts'>
import { useRouter } from 'vue-router';
import YixivHeader from './components/header.vue';
import { yixivStore } from '@/stores';
import { router as navigation } from './config/router';
const router = useRouter();
const store = yixivStore();

const onChangeRouter = (path: string) => {
  router.push(path);
};

</script>
<style lang="less" scoped>

.page {
  min-height: 100vh;
  background: var(--g_home_bg);
}
</style>
