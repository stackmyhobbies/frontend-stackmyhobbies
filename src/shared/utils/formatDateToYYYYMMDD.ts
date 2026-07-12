export function formatDateToYYYYMMDD(value: Date | string | null | undefined): string | null {
  if (value === null || value === undefined || value === '') return null

  const date = typeof value === 'string' ? new Date(value) : value

  if (isNaN(date.getTime())) return null

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
