export interface TagResponse {
  success: boolean
  data: Tag[]
  message: string
}

export interface Tag {
  id: number
  name: string
  slug: string
  status: boolean
}
