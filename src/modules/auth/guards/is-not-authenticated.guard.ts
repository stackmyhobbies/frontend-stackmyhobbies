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

  authStore.authStatus === AuthStatus.AUTHENTICATED ? next({ name: 'content-items' }) : next()
}

export default isNotAuthenticatedGuard
