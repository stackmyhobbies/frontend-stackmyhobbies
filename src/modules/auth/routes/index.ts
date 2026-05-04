import type { RouteRecordRaw } from 'vue-router'
import isNotAuthenticatedGuard from '../guards/is-not-authenticated.guard'

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  beforeEnter: [isNotAuthenticatedGuard],
  component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: 'sign-in',
      name: 'signIn',
      component: () => import('@/modules/auth/pages/SignInPage.vue'),
    },
    {
      path: 'sign-up',
      name: 'signUp',
      component: () => import('@/modules/auth/pages/SignUpPage.vue'),
    },
    {
      path: 'email-verified',
      name: 'emailVerified',
      component: () => import('@/modules/auth/pages/EmailVerifiedPage.vue'),
    },
    {
      path: 'forgot-password',
      name: 'forgotPassword',
      component: () => import('@/modules/auth/pages/ForgotPasswordPage.vue'),
    },
    {
      path: 'reset-password',
      name: 'resetPassword',
      component: () => import('@/modules/auth/pages/ResetPasswordPage.vue'),
    },
    {
      path: 'resend-email',
      name: 'resendEmail',
      component: () => import('@/modules/auth/pages/ResendEmailVerificationPage.vue'),
    },
    { path: '', redirect: { name: 'signIn' } },
  ],
}
