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

  if (authStore.authStatus === AuthStatus.UNVERIFIED) {
    return next({ name: 'resendEmail' })
  }

  if (authStore.authStatus === AuthStatus.AUTHENTICATED) {
    return next({ name: 'content-item-list' })
  }

  return next()
}

export default isNotAuthenticatedGuard
