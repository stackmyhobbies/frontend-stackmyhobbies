export interface User {
  id: number
  first_name: string
  last_name: string
  username: string
  email: string
  is_admin: boolean
  email_verified_at?: string
}
