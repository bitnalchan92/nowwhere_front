export const formatArrivalTime = (minutes: number): string => {
  if (minutes === 0) return "곧 도착"
  if (minutes === 1) return "1분 후"
  return `${minutes}분 후`
}

export const formatDistance = (meters: number): string => {
  if (meters < 1000) return `${meters}m`
  return `${(meters / 1000).toFixed(1)}km`
}
