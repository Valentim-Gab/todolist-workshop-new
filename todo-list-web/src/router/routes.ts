import MainLayout from '@/layouts/MainLayout.vue'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    component: () => import('pages/TheLogin.vue'),
  },
  {
    path: '/main',
    component: MainLayout,
    meta: {
      auth: true,
    },
    children: [
      {
        path: '',
        name: 'main/home',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
