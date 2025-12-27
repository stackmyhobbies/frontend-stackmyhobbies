import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { AuthStatus } from '../interfaces/auth-status.enum'

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()

  // Siempre verificar estado (excepto si venimos de signIn con email no verificado)
  const isComingFromSignIn =
    from.name === 'signIn' && authStore.user && !authStore.user.email_verified_at

  if (!isComingFromSignIn) {
    await authStore.checkAuthStatus()
  }
  console.log('pero aqui asi')
  // Si no está autenticado → login
  if (authStore.authStatus === AuthStatus.UNAUTHENTICATED) {
    return next({ name: 'signIn' })
  }

  // Si está autenticado pero email no verificado → resend email
  if (!authStore.user?.email_verified_at) {
    return next({ name: 'resendEmail' })
  }
  console.log('no croe que llegeue aqui')
  // Todo OK → continuar
  return next()
}

export default isAuthenticatedGuard
