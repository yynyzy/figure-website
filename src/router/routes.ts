import { RouteRecordRaw } from 'vue-router';
import asyncRoutes from './asyncRoutes';

export const routes: RouteRecordRaw[] = [
  {
    path:'/',
    redirect:"/yixiv"
  },
  {
    path: '/yixiv',
    component: () => import('@/views/pages/yixiv/index.vue'),
    redirect: '',
    meta: { isAuth: true },
    children: [
      {
        path: '',
        component: () => import('@/views/pages/yixiv/home.vue'),
        meta: { isAuth: true },
        children: [],
      },
      {
        path: 'new',
        component: () => import('@/views/pages/yixiv/newWorks.vue'),
        meta: { isAuth: true },
        children: [],
      },
      {
        path: 'ranking',
        component: () => import('@/views/pages/yixiv/ranking.vue'),
        meta: { isAuth: true },
        children: [],
      },
      {
        path: 'periodical',
        component: () => import('@/views/pages/yixiv/periodical.vue'),
        meta: { isAuth: true },
        children: [],
      },
      {
        path: 'periodical/:periodicalId',
        component: () => import('@/views/pages/yixiv/periodicalDetail.vue'),
        meta: { isAuth: true },
        children: [],
      },
      {
        path: 'illust/:pictureId',
        component: () => import('@/views/pages/yixiv/illust.vue'),
        meta: { isAuth: true },
        children: [],
      },
      {
        path: 'author/:userId',
        component: () => import('@/views/pages/yixiv/author.vue'),
        meta: { isAuth: true },
        children: [],
      },
      {
        path: 'search/author/:key',
        component: () => import('@/views/pages/yixiv/searchAuthor.vue'),
        meta: { isAuth: true },
        children: [],
      },
      {
        path: 'search/tags/:key',
        component: () => import('@/views/pages/yixiv/searchTags.vue'),
        meta: { isAuth: true },
        children: [],
      },
    ],
  },
  ...asyncRoutes,
]

interface Tab {
  name: string,
  route: string,
}

export const GlobalHeaderLeftRoute: Array<Tab> = [
  {
    name: '首页',
    route: '/home',
  },
  {
    name: '动漫视频',
    route: '/animationVideo',
  },
  {
    name: 'yixiv',
    route: '/yixiv',
  },
  {
    name: '自定义组件',
    route: '/component',
  },
  {
    name: 'CSS 特效',
    route: '/css',
  },
];
