"use client"

import { useState, useCallback } from "react"
import type { BusStop, SubwayStation, TransitTab } from "@/types/transit"

export function useSelection() {
  const [selectedBusStop, setSelectedBusStop] = useState<BusStop | null>(null)
  const [selectedSubwayStation, setSelectedSubwayStation] = useState<SubwayStation | null>(null)

  const selectBusStop = useCallback((busStop: BusStop) => {
    setSelectedBusStop(busStop)
    setSelectedSubwayStation(null)
  }, [])

  const selectSubwayStation = useCallback((subwayStation: SubwayStation) => {
    setSelectedSubwayStation(subwayStation)
    setSelectedBusStop(null)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedBusStop(null)
    setSelectedSubwayStation(null)
  }, [])

  const autoSelectFirst = useCallback(
    (activeTab: TransitTab, busStops: BusStop[], subwayStations: SubwayStation[], isMobile: boolean) => {
      // 모바일에서는 자동 선택하지 않음
      if (isMobile) return

      if (activeTab === "bus" && busStops.length > 0) {
        selectBusStop(busStops[0])
      } else if (activeTab === "subway" && subwayStations.length > 0) {
        selectSubwayStation(subwayStations[0])
      }
    },
    [selectBusStop, selectSubwayStation],
  )

  return {
    selectedBusStop,
    selectedSubwayStation,
    selectBusStop,
    selectSubwayStation,
    clearSelection,
    autoSelectFirst,
  }
}
