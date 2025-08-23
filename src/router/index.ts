import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RouterObject } from './interface/index';
import NProgress from '@/utils/nprogress';
import layOut from '@/layout/index.vue';
// * 导入所有router
const metaRouters = import.meta.globEager('./modules/*.ts');
// * 处理路由
export const routerArray: RouterObject[] = [];
Object.keys(metaRouters).forEach(item => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key]);
  });
});
import Field from './modules/field';
import Professional from './modules/professional';

const routes: RouterObject[] = [
  {
    path: '/',
    redirect: '/field/list',
  },
  ...Field,
  ...Professional,
  // {
  //   path: '/field1',
  //   redirect: '/field/list',
  //   component: layOut,
  //   meta: { title: '领域库1', key: 'field' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'FieldList',
  //       component: () => import('@/pages/field/list.vue'),
  //       meta: {
  //         keepAlive: false,
  //         key: 'fieldList',
  //         title: '领域列表',
  //         parentPath: '/field',
  //       },
  //     },
  //     {
  //       path: 'detail/:id',

  //       name: 'FieldDetail',
  //       component: () => import('@/pages/field/detail.vue'),
  //       meta: {
  //         keepAlive: false,
  //         key: 'fieldDetail',
  //         title: '领域详情',
  //         parentPath: '/field',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/field2',
  //   redirect: '/field/list',
  //   component: layOut,
  //   meta: { title: '领域库2', key: 'field' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'FieldList',
  //       component: () => import('@/pages/field/list.vue'),
  //       meta: {
  //         keepAlive: false,
  //         key: 'fieldList',
  //         title: '领域列表',
  //         parentPath: '/field',
  //       },
  //     },
  //     {
  //       path: 'detail/:id',

  //       name: 'FieldDetail',
  //       component: () => import('@/pages/field/detail.vue'),
  //       meta: {
  //         keepAlive: false,
  //         key: 'fieldDetail',
  //         title: '领域详情',
  //         parentPath: '/field',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/field3',
  //   redirect: '/field/list',
  //   component: layOut,
  //   meta: { title: '领域库3', key: 'field' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'FieldList',
  //       component: () => import('@/pages/field/list.vue'),
  //       meta: {
  //         keepAlive: false,
  //         key: 'fieldList',
  //         title: '领域列表',
  //         parentPath: '/field',
  //       },
  //     },
  //     {
  //       path: 'detail/:id',

  //       name: 'FieldDetail',
  //       component: () => import('@/pages/field/detail.vue'),
  //       meta: {
  //         keepAlive: false,
  //         key: 'fieldDetail',
  //         title: '领域详情',
  //         parentPath: '/field',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/field4',
  //   redirect: '/field/list',
  //   component: layOut,
  //   meta: { title: '领域库4', key: 'field' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'FieldList',
  //       component: () => import('@/pages/field/list.vue'),
  //       meta: {
  //         keepAlive: false,
  //         key: 'fieldList',
  //         title: '领域列表',
  //         parentPath: '/field',
  //       },
  //     },
  //     {
  //       path: 'detail/:id',

  //       name: 'FieldDetail',
  //       component: () => import('@/pages/field/detail.vue'),
  //       meta: {
  //         keepAlive: false,
  //         key: 'fieldDetail',
  //         title: '领域详情',
  //         parentPath: '/field',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/field5',
  //   redirect: '/field/list',
  //   component: layOut,
  //   meta: { title: '领域库5', key: 'field' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'FieldList',
  //       component: () => import('@/pages/field/list.vue'),
  //       meta: {
  //         keepAlive: false,
  //         key: 'fieldList',
  //         title: '领域列表',
  //         parentPath: '/field',
  //       },
  //     },
  //     {
  //       path: 'detail/:id',

  //       name: 'FieldDetail',
  //       component: () => import('@/pages/field/detail.vue'),
  //       meta: {
  //         keepAlive: false,
  //         key: 'fieldDetail',
  //         title: '领域详情',
  //         parentPath: '/field',
  //       },
  //     },
  //   ],
  // },
  // ...routerArray,
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404.vue'),
    meta: {
      title: '404',
      noPermission: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
});
router.beforeEach((to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, _from) => {
  NProgress.done();
});
export default router;
