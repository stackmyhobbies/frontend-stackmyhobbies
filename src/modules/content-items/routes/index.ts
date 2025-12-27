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
      name: 'list',
      component: () => import('@/modules/content-items/pages/ListPage.vue'),
    },
    {
      path: '**',
      redirect: { name: 'list' },
    },
  ],
}
