export interface ContentTypeResponse {
  success: boolean
  data: Type[]
  message: string
}

export interface Type {
  id: number
  name: string
  status: boolean
  created_at: Date
  updated_at: Date
  allowed_units: string[]
  allowed_segment_types: string[]
  allowed_subsegment_types: string[]
}
