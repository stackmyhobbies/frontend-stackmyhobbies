export enum SegmentType {
  SEASON = 'season',
  VOLUME = 'volume',
  PART = 'part',
  EDITION = 'edition',
  MOVIE = 'movie',
  SINGLE = 'single',
}

export const SegmentTypeValues = Object.values(SegmentType) as [SegmentType, ...SegmentType[]]
