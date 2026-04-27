import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

import type { User } from '../interfaces/User.interface'
import { AuthStatus } from '../interfaces/auth-status.enum'
import { signInAction } from '../actions/signin.action'
import type { AuthRegister } from '../interfaces/auth-register.interface'
import { signUpAction } from '../actions/signup.action'
import { checkAuthStatusAction } from '../actions/check-auth-status.action'
import { ForgotPasswordAction } from '../actions/forgot-password.action'
import type { AuthResponse } from '../interfaces/auth.response'
import { resendEmailVerificationAction } from '../actions/resend-email.action'

export const useAuthStore = defineStore('auth', () => {
  //*Properties
  const authStatus = ref<AuthStatus>(AuthStatus.CHECKING)
  const token = useLocalStorage('token', '')
  const user = ref<User | null>(null)

  //*Getters
  const isChecking = computed(() => authStatus.value === AuthStatus.CHECKING)
  const isAuthenticated = computed(() => authStatus.value === AuthStatus.AUTHENTICATED)
  const isUnAuthenticated = computed(() => authStatus.value === AuthStatus.UNAUTHENTICATED)
  const isAdmin = computed(() => !!user.value?.is_admin)
  const isVerified = computed(() => !!user.value?.email_verified_at)

  const username = computed(() => {
    if (!user.value) return ''
    return `${user.value.first_name} ${user.value.last_name}`
  })

  //* Actions

  const signIn = async (login: string, password: string) => {
    const resp = await signInAction(login, password)

    if (!resp.success && !resp.data) {
      return signOut(resp.message)
    }

    // Si la API responde SUCCESS = false
    // ⚠️ Caso 2: email no verificado
    if (!resp.success && resp.data) {
      const { user: userData, token: apiToken } = resp.data

      if (userData && !userData.email_verified_at && apiToken) {
        user.value = userData
        token.value = apiToken
        authStatus.value = AuthStatus.AUTHENTICATED

        return {
          success: false,
          emailPending: true,
          message: resp.message,
        }
      }
    }

    // ✅ Caso 3: login correcto
    if (resp.success) {
      const { user: userData, token: apiToken } = resp.data

      user.value = userData
      token.value = apiToken
      authStatus.value = AuthStatus.AUTHENTICATED

      return { success: true, message: 'Inicio de sesión exitoso' }
    }

    return signOut('Error inesperado')
  }

  const signUp = async (userRegister: AuthRegister) => {
    const signUpResponse = await signUpAction(userRegister)

    if (!signUpResponse.success) {
      return {
        success: false,
        message: signUpResponse.message,
        errors: signUpResponse.errors,
      }
    }
    return {
      success: true,
      message: 'usuario registro correctamente',
      data: signUpResponse.data.user,
    }
  }

  const checkAuthStatus = async (): Promise<boolean> => {
    const resp = await checkAuthStatusAction()

    if (!resp.success || !resp.data?.user) {
      signOut()
      return false
    }

    user.value = resp.data.user
    authStatus.value = AuthStatus.AUTHENTICATED

    return true
  }

  const signOut = (message: string = 'Sesion Cerrada') => {
    authStatus.value = AuthStatus.UNAUTHENTICATED
    user.value = null
    token.value = ''
    return { success: true, message: message }
  }

  //** Actions control Password and email

  const forgotPassword = async (email: string): Promise<AuthResponse> => {
    return await ForgotPasswordAction(email)
  }

  const resendEmail = async (email: string) => {
    return await resendEmailVerificationAction(email)
  }

  return {
    //*Properties
    user,
    token,
    authStatus,

    //*Getters
    isAdmin,
    isChecking,
    isAuthenticated,
    isUnAuthenticated,
    isVerified,
    username,

    //*Actions
    signIn,
    signUp,
    signOut,
    checkAuthStatus,
    forgotPassword,
    resendEmail,
  }
})
