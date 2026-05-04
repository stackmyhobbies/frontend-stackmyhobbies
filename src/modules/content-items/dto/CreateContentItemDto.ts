import type { DayOfWeek } from '../enum/dayOfWeek.enum'
import type { Tag } from '../interfaces/contentItemListResponse'
import type { Type } from '../interfaces/ContentTypeResponse'
import type { ProgressStatus } from '../interfaces/progressStatusResponse'

export interface CreateContentItemDto {
  title: string
  description?: string
  content_type_id: number | null
  progress_status_id: number
  day_of_week: string | null
  segment_type: string
  segment_number: number
  segment_subtype?: string | null
  segment_subnumber?: number | null
  image?: File | null
  viewing_started_at: Date | string
  viewing_finished_at?: Date | string | null
  aired_from?: string | null
  aired_to?: string | null
  current_progress: number
  total_progress: number
  progress_unit: string
  notes?: string
  rating: number
  tags: string[] | number[]
}
