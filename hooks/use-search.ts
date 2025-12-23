"use client"

import { useState } from "react"
import type { NearBusStop, SubwayStation } from "@/types/transit"
import { sampleSubwayStations } from "@/data/sample-data"
import { getNearBusStops } from "@/lib/busApi"
import { toast } from "sonner"

/**
 * 검색 기능을 담당하는 커스텀 훅
 * - 로딩 상태와 검색 결과를 관리
 * - 실제 프로젝트에서는 여기서 API 호출을 수행
 */
export function useSearch() {
  // 검색 중인지 여부를 나타내는 상태
  const [loading, setLoading] = useState(false)
  // 에러 상태
  const [error, setError] = useState<string | null>(null)
  // 검색된 인접 버스 정류장 목록
  const [nearBusStops, setNearBusStops] = useState<NearBusStop[]>([])
  // 검색된 지하철역 목록
  const [subwayStations, setSubwayStations] = useState<SubwayStation[]>([])

  // 근처 정류장/역을 검색하는 비동기 함수
  const searchNearbyStops = async (latitude?: number, longitude?: number) => {
    setLoading(true)
    setError(null)

    try {
      const nearBusStops: NearBusStop[] = await getNearBusStops(
        latitude,
        longitude
      )

      if (nearBusStops.length === 0) {
        toast.info("주변에 버스 정류장이 없습니다.")
      } else {
        toast.success(`${nearBusStops.length}개의 정류장을 찾았습니다.`)
      }

      setNearBusStops(nearBusStops)
      setSubwayStations(sampleSubwayStations)
    } catch (err) {
      const errorMessage = "정류장 검색 중 오류가 발생했습니다."
      setError(errorMessage)
      toast.error(errorMessage)
      console.error("Search error:", err)
    } finally {
      setLoading(false)
    }
  }

  // 검색 결과를 초기화하는 함수
  const clearResults = () => {
    setNearBusStops([])
    setSubwayStations([])
    setError(null)
  }

  // 다른 컴포넌트에서 사용할 상태와 함수들을 반환
  return {
    loading, // 로딩 상태
    error, // 에러 상태
    nearBusStops, // 버스 정류장 목록
    subwayStations, // 지하철역 목록
    searchNearbyStops, // 검색 함수
    clearResults, // 결과 초기화 함수
  }
}
