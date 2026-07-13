import type { Tag, Type } from './contentItemListResponse'

export interface ContentItemResponse {
  success: boolean
  data: Hobby
  message: string
  errors?: Record<string, string | undefined>
}

export interface Hobby {
  id: number
  user_id: number
  title: string
  slug: string
  content_type_id: number
  progress_status_id: number
  segment_type: string
  segment_number: number
  segment_subtype: string | null
  segment_subnumber: number | null
  thumbnail_url: string
  viewing_started_at: string | null
  viewing_finished_at: string | null
  aired_from: string | null
  aired_to: string | null
  current_progress: number
  total_progress: number
  progress_percent: number
  progress_unit: string
  notes: string
  rating: number
  is_active: boolean
  day_of_week: string | null
  tags: Tag[]
  type: Type
  progress_status: ProgressStatus
  created_at: string
  updated_at: string
  detail_url?: string
  description?: string
}

export interface ProgressStatus {
  id: number
  name: string
}
