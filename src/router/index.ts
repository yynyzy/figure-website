import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { tokenStore } from '@/stores';
import { ElMessage } from "element-plus";

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, _, next) => {
  if (to.matched.some((r) => r.meta?.isAuth)) {
    const store = tokenStore();
    if (!store.ACCESS_TOKEN.token) {
      ElMessage.error('您没有权限，请重新登陆');
      next({ path: "login", query: { redirect: to.fullPath }});
      return;
    }
  }
  next();
})

export default router;
