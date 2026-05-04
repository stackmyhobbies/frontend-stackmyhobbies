import type { Tag, Type } from './contentItemListResponse'

export interface ContentItemResponse {
  success: boolean
  data: Hobby
  message: string
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
  segment_label: string
  segment_subtype: null
  segment_subnumber: null
  thumbnail_url: string
  viewing_started_at: Date
  viewing_finished_at: null
  aired_from: null
  aired_to: null
  current_progress: number
  total_progress: number
  progress_percent: number
  progress_unit: string
  notes: string
  rating: number
  is_active: boolean
  day_of_week: null
  tags: Tag[]
  type: Type
  progress_status: ProgressStatus
}

export interface ProgressStatus {
  id: number
  name: string
}
