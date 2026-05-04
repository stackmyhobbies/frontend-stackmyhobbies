export interface ContentItemListResponse {
  success: boolean
  data: ContentItems
  message: string
}

export interface ContentItems {
  items: Hobby[]
  meta_data: MetaData
}

export interface Hobby {
  id: number
  user_id: number
  title: string
  slug: string
  description: string
  type_id: number
  progress_status_id: number
  segment_type: string
  segment_number: number
  segment_label: string
  segment_subtype: string
  segment_subnumber: string
  image_path: string
  thumbnail_url: string
  detail_url: string
  viewing_started_at: Date | null
  viewing_finished_at: Date | null
  aired_from: string | null
  aired_to: string | null
  current_progress: number
  total_progress: number
  progress_percent: number
  progress_unit: string
  notes: string
  rating: number
  is_active: boolean
  tags: Tag[]
  type: Type
  progress_status: ProgressStatus
}

export interface ProgressStatus {
  id: number
  name: string
}

export interface Type {
  id: number
  name: string
}

export interface Tag {
  id: number
  name: string
}

export interface MetaData {
  filters_applied: unknown[]
  current_page: number
  per_page: number
  total: number
  last_page: number
  next_page_url: null
  prev_page_url: null
}
