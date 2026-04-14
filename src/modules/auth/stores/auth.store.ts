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
  const token = ref(useLocalStorage('token', ''))
  const user = ref<User | null>(null)

  //*Getters
  const isChecking = computed(() => authStatus.value === AuthStatus.CHECKING)
  const isAuthenticated = computed(() => authStatus.value === AuthStatus.AUTHENTICATED)
  const isUnAuthenticated = computed(() => authStatus.value === AuthStatus.UNAUTHENTICATED)
  const isAdmin = computed(() => user.value?.is_admin)
  const isVerified = computed(() => user.value?.email_verified_at)

  const username = computed(() => `${user.value?.first_name} ${user.value?.last_name}`)

  //* Actions

  const signIn = async (login: string, password: string) => {
    const signInResponse = await signInAction(login, password)

    console.log('Aquí está una respuesta', signInResponse)

    // Si la API responde SUCCESS = false
    if (!signInResponse.success) {
      const userData = signInResponse.data?.user
      const apiToken = signInResponse.data?.token
      console.log(
        { userData, user: signInResponse.data?.user, token: signInResponse.data?.token },
        ' Asi se ve la data despues de retorna',
      )

      // Caso: usuario existe pero NO está verificado
      if (userData && !userData.email_verified_at) {
        user.value = userData // para obtener correo
        token.value = apiToken // si necesitas token para reenviar
        authStatus.value = AuthStatus.AUTHENTICATED

        return {
          success: false,
          emailPending: true,
          message: signInResponse.message || 'Debes verificar tu correo',
        }
      }

      // Caso: error real de login
      return signOut(signInResponse.message)
    }

    // success = true → usuario autenticado correctamente
    const userData = signInResponse.data.user

    // Caso: usuario verificado (flujo normal)
    user.value = userData
    token.value = signInResponse.data.token
    authStatus.value = AuthStatus.AUTHENTICATED

    return { success: true, message: 'Inicio de sesión exitoso' }
  }

  const signUp = async (userRegister: AuthRegister) => {
    const signUpResponse = await signUpAction(userRegister)

    if (!signUpResponse.success) {
      signOut()
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

  const checkAuthStatus = async (): Promise<Boolean> => {
    const checkAuthStatusResponse = await checkAuthStatusAction()

    console.log(checkAuthStatusResponse)

    if (!checkAuthStatusResponse.success) {
      signOut()
      return false
    }

    const userData = checkAuthStatusResponse.data.user
    
    // Si el usuario no tiene email verificado, limpiar localStorage para evitar loops
    if (!userData.email_verified_at) {
      localStorage.removeItem('token')
      authStatus.value = AuthStatus.UNAUTHENTICATED
      user.value = null
      token.value = ''
      return false
    }

    user.value = userData
    authStatus.value = AuthStatus.AUTHENTICATED

    return true
  }

  const signOut = (message: string = 'Sesion Cerrada') => {
    localStorage.removeItem('token')
    authStatus.value = AuthStatus.UNAUTHENTICATED
    user.value = null
    token.value = ''
    return { success: false, message: message }
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
