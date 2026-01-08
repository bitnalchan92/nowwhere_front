/**
 * 대중교통 앱에서 사용하는 모든 타입 정의
 * - TypeScript의 타입 안정성을 위한 인터페이스들
 * - 데이터 구조를 명확히 정의하여 개발 시 오류 방지
 * - API 응답 데이터와 일치하도록 설계
 */

// 인접 버스 정류장 정보를 나타내는 인터페이스
export interface NearBusStop {
  stationId: string // 정류장 고유 ID
  stationNm: string // 정류소명
  arsId: string // 정류소고유번호 (정류소 번호)
  posX: number // 정류소 좌표X (GRS80)
  posY: number // 정류소 좌표Y (GRS80)
  gpsX: number // 정류소 좌표X (WGS84 경도)
  gpsY: number // 정류소 좌표Y (WGS84 위도)
  dist: number // 거리(m)
  routes?: Array<{ busRouteNm: string }> // 노선 정보 (선택)
}

// 버스 노선 정보를 나타내는 인터페이스
export interface BusRoute {
  id: string // 노선 고유 ID
  routeNumber: string // 노선 번호 (예: "143", "401")
  destination: string // 목적지
  arrivalTime: number // 도착 예정 시간 (분 단위)
  remainingStops: number // 남은 정거장 수
  vehicleType: "일반" | "저상" | "굴절" // 차량 유형
}

// 버스 실시간 도착 정보를 나타내는 인터페이스
export interface BusArrival {
  busRouteId: string // 노선 ID
  busRouteNm: string // 노선명 (버스 번호)
  arrmsg1: string // 첫 번째 버스 도착 메시지 (예: "5분 후 도착")
  arrmsg2: string // 두 번째 버스 도착 메시지
  traTime1: number | null // 첫 번째 버스 도착 예정 시간 (초)
  traTime2: number | null // 두 번째 버스 도착 예정 시간 (초)
  sectOrd1: number | null // 첫 번째 버스 남은 정류장 수
  sectOrd2: number | null // 두 번째 버스 남은 정류장 수
}

// 지하철역 정보를 나타내는 인터페이스
export interface SubwayStation {
  id: string // 역 고유 ID
  name: string // 역 이름
  line: string // 호선 (예: "2호선", "9호선")
  distance: number // 현재 위치로부터의 거리 (미터 단위)
  arrivals: SubwayArrival[] // 이 역의 열차 도착 정보들
  lineColor: string // 호선 색상 (CSS 클래스명)
}

// 지하철 도착 정보를 나타내는 인터페이스
export interface SubwayArrival {
  id: string // 도착 정보 고유 ID
  direction: string // 방향 (예: "강남 방면", "홍대입구 방면")
  arrivalTime: number // 도착 예정 시간 (분 단위)
  destination: string // 종착역
  trainType: "일반" | "급행" // 열차 유형
}

// 위치 정보를 나타내는 인터페이스
export interface LocationInfo {
  latitude: number // 위도
  longitude: number // 경도
  address: string // 주소 (사용자에게 표시용)
}

// 탭 유형을 나타내는 타입 (버스 또는 지하철)
export type TransitTab = "bus" | "subway"
