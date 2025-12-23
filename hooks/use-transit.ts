"use client"

import { useEffect } from "react"
import type { NearBusStop, SubwayStation } from "@/types/transit"
import { useLocation } from "./use-location"
import { useSearch } from "./use-search"
import { useSelection } from "./use-selection"
import { useTab } from "./use-tab"
import { useDetail } from "./use-detail"
import { useMobile } from "./use-mobile"

/**
 * 메인 비즈니스 로직을 관리하는 커스텀 훅
 * - 여러 개의 작은 훅들을 조합하여 복잡도를 낮춤
 * - 컴포넌트에서는 이 훅만 사용하면 모든 기능 사용 가능
 * - 상태 관리와 비즈니스 로직을 UI에서 분리
 */
export function useTransit() {
  // 각각의 기능별 훅들을 가져와서 조합
  const { location, updateLocation, error: locationError } = useLocation() // 위치 관리
  const { loading, nearBusStops, subwayStations, searchNearbyStops, clearResults } = useSearch() // 검색 기능
  const {
    selectedNearBusStop,
    selectedSubwayStation,
    selectNearBusStop,
    selectSubwayStation,
    clearSelection,
    autoSelectFirst,
  } = useSelection() // 선택 상태 관리
  const { activeTab, switchTab } = useTab() // 탭 상태 관리
  const { showDetail, showDetailView, hideDetailView } = useDetail() // 모바일 상세 화면 관리
  const isMobile = useMobile() // 모바일 감지

  // 탭이 변경되거나 검색 결과가 업데이트될 때 실행되는 부수 효과
  useEffect(() => {
    clearSelection() // 기존 선택 초기화
    // 데스크톱에서는 첫 번째 항목을 자동 선택 (UX 개선)
    autoSelectFirst(activeTab, nearBusStops, subwayStations, isMobile)
  }, [activeTab, nearBusStops, subwayStations, isMobile, clearSelection, autoSelectFirst])

  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearch = async () => {
    // 위치 정보를 함께 전달하여 세션이 없어도 검색 가능하도록
    await searchNearbyStops(location.latitude, location.longitude)
  }

  // 정류장/역 선택 시 실행되는 함수
  const handleStopSelect = (stop: NearBusStop | SubwayStation) => {
    // 현재 탭에 따라 적절한 선택 함수 호출
    if (activeTab === "bus") {
      selectNearBusStop(stop as NearBusStop)
    } else {
      selectSubwayStation(stop as SubwayStation)
    }

    // 모바일에서는 선택 후 상세 화면으로 전환
    if (isMobile) {
      showDetailView()
    }
  }

  // 탭 변경 시 실행되는 함수
  const handleTabChange = (tab: "bus" | "subway") => {
    switchTab(tab)
    // 모바일에서 상세 화면이 열려있다면 닫기 (UX 개선)
    if (isMobile && showDetail) {
      hideDetailView()
    }
  }

  // 컴포넌트에서 사용할 모든 상태와 함수들을 반환
  return {
    // 상태들
    activeTab,
    location,
    nearBusStops,
    subwayStations,
    selectedNearBusStop,
    selectedSubwayStation,
    loading,
    showDetail,
    isMobile,

    // 액션 함수들
    setActiveTab: handleTabChange,
    searchNearbyStops: handleSearch,
    handleStopSelect,
    handleBackToList: hideDetailView,
    updateLocation,
    clearResults,
    clearSelection,
  }
}
