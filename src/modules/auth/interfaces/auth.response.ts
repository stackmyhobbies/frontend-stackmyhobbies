import type { User } from './User.interface'

export interface AuthResponseSuccess {
  success: true
  data: {
    user: User
    token?: string
  }
  message: string
}

export interface AuthResponseError {
  success: false
  message: string
  errors?: Record<string, any>
  data?: Record<string, any>
}

export type AuthResponse = AuthResponseSuccess | AuthResponseError
