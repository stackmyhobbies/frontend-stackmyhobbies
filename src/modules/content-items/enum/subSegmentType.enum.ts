export enum SubSegmentType {
  CHAPTER = 'chapter',
  EPISODE = 'episode',
  PAGE = 'page',
  OVA = 'ova',
  SPECIAL = 'special',
  PART = 'part',
}

export const SubSegmentTypeValues = Object.values(SubSegmentType) as [SubSegmentType, ...SubSegmentType[]]
