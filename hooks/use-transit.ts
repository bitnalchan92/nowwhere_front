"use client"

import { useEffect } from "react"
import type { BusStop, SubwayStation } from "@/types/transit"
import { useLocation } from "./use-location"
import { useSearch } from "./use-search"
import { useSelection } from "./use-selection"
import { useTab } from "./use-tab"
import { useDetail } from "./use-detail"
import { useMobile } from "./use-mobile"

export function useTransit() {
  const { location, updateLocation } = useLocation()
  const { loading, busStops, subwayStations, searchNearbyStops, clearResults } = useSearch()
  const {
    selectedBusStop,
    selectedSubwayStation,
    selectBusStop,
    selectSubwayStation,
    clearSelection,
    autoSelectFirst,
  } = useSelection()
  const { activeTab, switchTab } = useTab()
  const { showDetail, showDetailView, hideDetailView } = useDetail()
  const isMobile = useMobile()

  // 탭 변경 시 선택 초기화 및 자동 선택
  useEffect(() => {
    clearSelection()
    autoSelectFirst(activeTab, busStops, subwayStations, isMobile)
  }, [activeTab, busStops, subwayStations, isMobile, clearSelection, autoSelectFirst])

  // 검색 후 자동 선택
  const handleSearch = async () => {
    await searchNearbyStops()
  }

  // 정류장/역 선택 처리
  const handleStopSelect = (stop: BusStop | SubwayStation) => {
    if (activeTab === "bus") {
      selectBusStop(stop as BusStop)
    } else {
      selectSubwayStation(stop as SubwayStation)
    }

    // 모바일에서는 상세 화면으로 전환
    if (isMobile) {
      showDetailView()
    }
  }

  // 탭 변경 처리
  const handleTabChange = (tab: "bus" | "subway") => {
    switchTab(tab)
    // 모바일에서 상세 화면이 열려있다면 닫기
    if (isMobile && showDetail) {
      hideDetailView()
    }
  }

  return {
    // 상태
    activeTab,
    location,
    busStops,
    subwayStations,
    selectedBusStop,
    selectedSubwayStation,
    loading,
    showDetail,
    isMobile,

    // 액션
    setActiveTab: handleTabChange,
    searchNearbyStops: handleSearch,
    handleStopSelect,
    handleBackToList: hideDetailView,
    updateLocation,
    clearResults,
    clearSelection,
  }
}
