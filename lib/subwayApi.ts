import axiosInstance from './axiosInstance'
import { SubwayTrainPosition } from '@/types/subway'

/**
 * 특정 호선의 실시간 열차 위치 조회
 * @param line 호선명 (예: "2호선")
 */
export const getSubwayRealtimePosition = async (
  line: string
): Promise<SubwayTrainPosition[]> => {
  try {
    const response = await axiosInstance.get('/api/subway/realtimePosition', {
      params: { line }
    })
    return response.data
  } catch (error) {
    console.error('지하철 실시간 위치 조회 실패:', error)
    return []
  }
}

/**
 * 전체 호선의 실시간 열차 위치 조회
 */
export const getAllSubwayRealtimePosition = async (): Promise<
  Record<string, SubwayTrainPosition[]>
> => {
  try {
    const response = await axiosInstance.get('/api/subway/realtimePosition/all')
    return response.data
  } catch (error) {
    console.error('전체 호선 실시간 위치 조회 실패:', error)
    return {}
  }
}

/**
 * 지원하는 호선 목록 조회
 */
export const getSupportedLines = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get('/api/subway/lines')
    return response.data
  } catch (error) {
    console.error('호선 목록 조회 실패:', error)
    return []
  }
}
