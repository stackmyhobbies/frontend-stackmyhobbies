import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/modules/auth/routes'
import { contentItemRoutes } from '@/modules/content-items/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'signIn' },
    },
    {
      path: '/reset-password',
      name: 'resetPasswordDirect',
      component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/modules/auth/pages/ResetPasswordPage.vue'),
        },
      ],
    },
    authRoutes,
    contentItemRoutes,
  ],
})

export default router
