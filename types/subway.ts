// 실시간 열차 위치 정보 (백엔드 응답)
export interface SubwayTrainPosition {
  subwayId: string      // 호선 ID
  subwayNm: string      // 호선명
  statnId: string       // 역 ID
  statnNm: string       // 현재역명
  trainNo: string       // 열차번호
  updnLine: '0' | '1'   // 상하행선 (0: 상행, 1: 하행)
  statnTnm: string      // 종착역명
  trainSttus: '0' | '1' | '2'  // 열차상태 (0: 진입, 1: 도착, 2: 출발)
  directAt: '0' | '1'   // 급행여부 (0: 일반, 1: 급행)
  lstcarAt: '0' | '1'   // 막차여부 (0: 아님, 1: 막차)
  recptnDt: string      // 데이터 수신 시각
}

// 호선 정보
export interface SubwayLine {
  id: string
  name: string
  color: string
  stations: SubwayStation[]
}

// 역 정보
export interface SubwayStation {
  id: string
  name: string
  x: number  // SVG 좌표
  y: number  // SVG 좌표
  transferLines?: string[]  // 환승 가능 호선
}

// 호선별 색상 코드
export const SUBWAY_LINE_COLORS: Record<string, string> = {
  '1호선': '#0052A4',
  '2호선': '#00A84D',
  '3호선': '#EF7C1C',
  '4호선': '#00A5DE',
  '5호선': '#996CAC',
  '6호선': '#CD7C2F',
  '7호선': '#747F00',
  '8호선': '#E6186C',
  '9호선': '#BDB092',
}

// 열차 상태 라벨
export const TRAIN_STATUS_LABELS: Record<string, string> = {
  '0': '진입',
  '1': '도착',
  '2': '출발',
}

// 상하행선 라벨
export const UPDN_LINE_LABELS: Record<string, string> = {
  '0': '상행',
  '1': '하행',
}
