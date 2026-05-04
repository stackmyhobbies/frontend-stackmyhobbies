import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { AuthStatus } from '../interfaces/auth-status.enum'

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()

  await authStore.checkAuthStatus()

  // ❌ No autenticado → login
  if (authStore.authStatus === AuthStatus.UNAUTHENTICATED) {
    return next({ name: 'signIn' })
  }

  // ❌ Autenticado pero NO verificado → resend-email
  if (!authStore.user?.email_verified_at) {
    return next({ name: 'resendEmail' })
  }

  // ✔ Todo OK
  return next()
}

export default isAuthenticatedGuard
