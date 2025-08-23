import layOut from '@/layout/index.vue';
const Field = [
  {
    path: '/field',
    redirect: '/field/list',
    component: layOut,
    meta: { title: '领域库', key: 'field' },
    children: [
      {
        path: 'list',
        name: 'FieldList',
        component: () => import('@/pages/field/list.vue'),
        meta: {
          keepAlive: false,
          key: 'fieldList',
          title: '领域列表',
          parentPath: '/field',
        },
      },
      {
        path: 'detail/:id',

        name: 'FieldDetail',
        component: () => import('@/pages/field/detail.vue'),
        meta: {
          keepAlive: false,
          key: 'fieldDetail',
          title: '领域详情',
          parentPath: '/field',
        },
      },
    ],
  },
];
export default Field;
