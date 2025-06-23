"use client"

import {useState, useCallback} from "react"
import type {NearBusStop, SubwayStation, TransitTab} from "@/types/transit"

export function useSelection() {
  const [selectedNearBusStop, setSelectedNearBusStop] = useState<NearBusStop | null>(null)
  const [selectedSubwayStation, setSelectedSubwayStation] = useState<SubwayStation | null>(null)

  const selectNearBusStop = useCallback((nearBusStop: NearBusStop) => {
    setSelectedNearBusStop(nearBusStop)
    setSelectedSubwayStation(null)
  }, [])

  const selectSubwayStation = useCallback((subwayStation: SubwayStation) => {
    setSelectedSubwayStation(subwayStation)
    setSelectedNearBusStop(null)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedNearBusStop(null)
    setSelectedSubwayStation(null)
  }, [])

  const autoSelectFirst = useCallback(
    (activeTab: TransitTab, nearBusStops: NearBusStop[], subwayStations: SubwayStation[], isMobile: boolean) => {
      // 모바일에서는 자동 선택하지 않음
      if (isMobile) return

      if (activeTab === "bus" && nearBusStops.length > 0) {
        selectNearBusStop(nearBusStops[0])
      } else if (activeTab === "subway" && subwayStations.length > 0) {
        selectSubwayStation(subwayStations[0])
      }
    },
    [selectNearBusStop, selectSubwayStation],
  )

  return {
    selectedNearBusStop,
    selectedSubwayStation,
    selectNearBusStop,
    selectSubwayStation,
    clearSelection,
    autoSelectFirst,
  }
}
