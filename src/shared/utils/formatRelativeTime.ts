function toUtcTimestamp(date: Date | string | null | undefined): number | null {
  if (!date) return null

  let dateStr = typeof date === 'string' ? date : date.toISOString()

  if (!/([+-]\d{2}:\d{2}|Z)$/.test(dateStr)) {
    dateStr += 'Z'
  }

  dateStr = dateStr.replace(/\.\d{3,6}Z?$/, (match) => {
    return match.replace(/\.(\d{6,})/, (_, m) => '.' + m.slice(0, 3)) + (match.endsWith('Z') ? 'Z' : '')
  })

  const parsed = new Date(dateStr)
  if (isNaN(parsed.getTime())) return null

  return parsed.getTime()
}

export function formatRelativeTime(date: Date | string | null | undefined): string {
  const then = toUtcTimestamp(date)
  if (then === null) return '-'

  const now = Date.now()
  const diff = (then - now) / 1000

  const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

  const absDiff = Math.abs(diff)

  if (absDiff < 60) return rtf.format(Math.round(diff), 'second')
  if (absDiff < 3600) return rtf.format(Math.round(diff / 60), 'minute')
  if (absDiff < 86400) return rtf.format(Math.round(diff / 3600), 'hour')
  if (absDiff < 2592000) return rtf.format(Math.round(diff / 86400), 'day')
  if (absDiff < 31536000) return rtf.format(Math.round(diff / 2592000), 'month')
  return rtf.format(Math.round(diff / 31536000), 'year')
}
