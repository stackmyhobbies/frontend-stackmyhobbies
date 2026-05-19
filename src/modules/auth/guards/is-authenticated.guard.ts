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

  if (authStore.authStatus === AuthStatus.UNVERIFIED) {
    return next({ name: 'resendEmail' })
  }

  if (authStore.authStatus === AuthStatus.UNAUTHENTICATED) {
    return next({ name: 'signIn' })
  }

  return next()
}

export default isAuthenticatedGuard
