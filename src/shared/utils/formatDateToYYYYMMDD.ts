export function formatDateToYYYYMMDD(value: Date | string | null | undefined): string | null {
  if (value === null || value === undefined || value === '') return null

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value

  let dateStr = typeof value === 'string' ? value : value.toISOString()

  if (typeof dateStr === 'string' && !/([+-]\d{2}:\d{2}|Z)$/.test(dateStr)) {
    dateStr += 'Z'
  }

  dateStr = dateStr.replace(/\.\d{3,6}Z?$/, (match) => {
    return match.replace(/\.(\d{6,})/, (_, m) => '.' + m.slice(0, 3)) + (match.endsWith('Z') ? 'Z' : '')
  })

  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return null

  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
