import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RouterObject } from './interface/index';
import NProgress from '@/utils/nprogress';
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
router.beforeEach((_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach((_to, _from) => {
  NProgress.done();
});
export default router;
