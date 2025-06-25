"use client"

import {useState} from "react"
import type {NearBusStop, SubwayStation} from "@/types/transit"
import {sampleSubwayStations} from "@/data/sample-data"
import {getNearBusStops} from "@/lib/busApi";

/**
 * 검색 기능을 담당하는 커스텀 훅
 * - 로딩 상태와 검색 결과를 관리
 * - 실제 프로젝트에서는 여기서 API 호출을 수행
 * - 현재는 샘플 데이터로 시뮬레이션
 */
export function useSearch() {
  // 검색 중인지 여부를 나타내는 상태
  const [loading, setLoading] = useState(false)
  // 검색된 인접 버스 정류장 목록
  const [nearBusStops, setNearBusStops] = useState<NearBusStop[]>([])
  // 검색된 지하철역 목록
  const [subwayStations, setSubwayStations] = useState<SubwayStation[]>([])

  // 근처 정류장/역을 검색하는 비동기 함수
  const searchNearbyStops = async () => {
    setLoading(true) // 로딩 시작

    const nearBusStops: NearBusStop[] = await getNearBusStops().then((res) => {
        return res;
      }
    );

    console.log('=====> nearBusStop : ', nearBusStops);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setNearBusStops(nearBusStops)
        setSubwayStations(sampleSubwayStations) // 샘플 지하철역 데이터 설정
        setLoading(false) // 로딩 종료
        resolve()
      }) // 1초 지연으로 실제 API 호출 시뮬레이션
    })
  }

  // 검색 결과를 초기화하는 함수
  const clearResults = () => {
    setNearBusStops([])
    setSubwayStations([])
  }

  // 다른 컴포넌트에서 사용할 상태와 함수들을 반환
  return {
    loading, // 로딩 상태
    nearBusStops, // 버스 정류장 목록
    subwayStations, // 지하철역 목록
    searchNearbyStops, // 검색 함수
    clearResults, // 결과 초기화 함수
  }
}
