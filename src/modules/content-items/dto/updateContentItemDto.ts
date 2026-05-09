import type { DayOfWeek } from '../enum/dayOfWeek.enum'
import type { Tag } from '../interfaces/contentItemListResponse'
import type { Type } from '../interfaces/ContentTypeResponse'
import type { ProgressStatus } from '../interfaces/progressStatusResponse'
import type { createContentItemDto } from './createContentItemDto'

export interface updateContentItemDto extends Partial<createContentItemDto> {
  id?: string | number
}
