export enum ProgressUnit {
  EPISODES = 'episodes',
  PAGES = 'pages',
  MINUTES = 'minutes',
  CHAPTERS = 'chapters',
}

export const ProgressUnitValues = Object.values(ProgressUnit) as [ProgressUnit, ...ProgressUnit[]]
