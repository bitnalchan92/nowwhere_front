"use client"

import { useState } from "react"
import type { BusStop, SubwayStation } from "@/types/transit"
import { sampleBusStops, sampleSubwayStations } from "@/data/sample-data"

export function useSearch() {
  const [loading, setLoading] = useState(false)
  const [busStops, setBusStops] = useState<BusStop[]>([])
  const [subwayStations, setSubwayStations] = useState<SubwayStation[]>([])

  const searchNearbyStops = async () => {
    setLoading(true)

    // 실제 API 호출 대신 샘플 데이터 사용
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setBusStops(sampleBusStops)
        setSubwayStations(sampleSubwayStations)
        setLoading(false)
        resolve()
      }, 1000)
    })
  }

  const clearResults = () => {
    setBusStops([])
    setSubwayStations([])
  }

  return {
    loading,
    busStops,
    subwayStations,
    searchNearbyStops,
    clearResults,
  }
}
