import layOut from '@/layout/index.vue';
const Professional = [
  {
    path: '/professional',
    redirect: '/professional/list',
    component: layOut,
    meta: { title: '专家库', key: 'professional' },
    children: [
      {
        path: 'list',
        name: 'ProfessionalList',
        component: () => import('@/pages/professional/list.vue'),
        meta: {
          keepAlive: false,
          key: 'professionalList',
          title: '专家列表',
          parentPath: '/professional',
        },
      },
      {
        path: 'detail/:id',
        name: 'ProfessionalDetail',
        component: () => import('@/pages/professional/detail.vue'),
        meta: {
          keepAlive: false,
          key: 'professionalDetail',
          title: '专家详情',
          parentPath: '/professional',
        },
      },
    ],
  },
];
export default Professional;
