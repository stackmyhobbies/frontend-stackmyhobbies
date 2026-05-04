export const getBadgeColor = (
  item: Record<string, string>,
  index: number,
  valueKey: string | number,
) => {
  const colors = ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']

  const str = String(item[valueKey])
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[(Math.abs(hash) + index) % colors.length]
}
