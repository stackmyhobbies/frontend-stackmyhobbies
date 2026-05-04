import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { AuthStatus } from '../interfaces/auth-status.enum'

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()
  await authStore.checkAuthStatus()

  if (authStore.authStatus === AuthStatus.AUTHENTICATED) {
    if (!authStore.user?.email_verified_at) {
      return next({ name: 'resendEmail' })
    }
    return next({ name: 'content-items' })
  }

  return next()
}

export default isNotAuthenticatedGuard
