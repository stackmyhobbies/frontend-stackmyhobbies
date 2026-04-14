import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard'
import type { RouteRecordRaw } from 'vue-router'

export const contentItemRoutes: RouteRecordRaw = {
  path: '/content-items',
  name: 'content-items',
  beforeEnter: [isAuthenticatedGuard],
  component: () => import('@/modules/content-items/layouts/ContentItemLayout.vue'),
  children: [
    {
      path: 'list',
      name: 'content-item-list',
      component: () => import('@/modules/content-items/pages/ListPage.vue'),
    },
    {
      path: 'create',
      name: 'content-item-create',
      component: () => import('@/modules/content-items/pages/CreatePage.vue'),
    },
    {
      path: '**',
      redirect: { name: 'content-item-list' },
    },
  ],
}
