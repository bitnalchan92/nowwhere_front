/**
 * 데이터 포맷팅을 담당하는 유틸리티 함수들
 * - 사용자에게 보여줄 데이터를 읽기 쉬운 형태로 변환
 * - 재사용 가능한 순수 함수들로 구성
 * - 비즈니스 로직과 분리하여 테스트 용이성 향상
 */

// 도착 시간을 사용자 친화적인 문자열로 변환
export const formatArrivalTime = (minutes: number): string => {
  if (minutes === 0) return "곧 도착" // 0분이면 "곧 도착"
  if (minutes === 1) return "1분 후" // 1분이면 "1분 후"
  return `${minutes}분 후` // 그 외에는 "N분 후"
}

// 거리를 사용자 친화적인 문자열로 변환
export const formatDistance = (meters: number): string => {
  if (meters < 1000) return `${meters}m` // 1km 미만이면 미터 단위
  return `${(meters / 1000).toFixed(1)}km` // 1km 이상이면 킬로미터 단위 (소수점 1자리)
}
