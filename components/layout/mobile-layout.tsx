"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bus, Train } from "lucide-react"
import { LocationInfoCard } from "@/components/sidebar/location-info"
import { BusStopList } from "@/components/sidebar/bus-stop-list"
import { SubwayStationList } from "@/components/sidebar/subway-station-list"
import { DetailContent } from "@/components/detail/detail-content"
import { PullToRefresh } from "@/components/ui/pull-to-refresh"
import { RefreshButton } from "@/components/ui/refresh-button"
import { BusStopMap } from "@/components/map/bus-stop-map"
import { SubwayRealtimeView } from "@/components/subway/subway-realtime-view"
import type { NearBusStop, LocationInfo, SubwayStation, TransitTab } from "@/types/transit"

// 모바일 레이아웃 컴포넌트의 props 타입 정의
interface MobileLayoutProps {
  showDetail: boolean
  activeTab: TransitTab
  setActiveTab: (tab: TransitTab) => void
  location: LocationInfo
  loading: boolean
  searchNearbyStops: () => void
  nearBusStops: NearBusStop[]
  subwayStations: SubwayStation[]
  selectedNearBusStop: NearBusStop | null
  selectedSubwayStation: SubwayStation | null
  onSelectNearBusStop: (nearBusStop: NearBusStop) => void
  onSelectSubwayStation: (station: SubwayStation) => void
  onBackToList: () => void
  refreshAll: () => Promise<void>
}

/**
 * 모바일 전용 레이아웃 컴포넌트
 * - 세로 방향 레이아웃 (전체 화면 사용)
 * - 리스트 화면과 상세 화면을 전환하는 방식
 * - 네이티브 앱과 유사한 UX 제공
 */
export function MobileLayout({
  showDetail,
  activeTab,
  setActiveTab,
  location,
  loading,
  searchNearbyStops,
  nearBusStops,
  subwayStations,
  selectedNearBusStop,
  selectedSubwayStation,
  onSelectNearBusStop,
  onSelectSubwayStation,
  onBackToList,
  refreshAll,
}: MobileLayoutProps) {
  // 상세 화면이 활성화된 경우의 렌더링
  if (showDetail) {
    return (
      <div className="flex flex-col h-screen bg-white">
        {/* 상세 화면 헤더 (뒤로가기 버튼 포함) */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <Button variant="ghost" size="sm" onClick={onBackToList}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">상세 정보</h1>
        </div>

        {/* 상세 정보 내용 (스크롤 가능) */}
        <div className="flex-1 overflow-y-auto p-4">
          <DetailContent
            activeTab={activeTab}
            selectedNearBusStop={selectedNearBusStop}
            selectedSubwayStation={selectedSubwayStation}
          />
        </div>
      </div>
    )
  }

  // 지하철 탭: 전체 화면 노선도
  if (activeTab === "subway") {
    return (
      <div className="flex flex-col h-screen">
        {/* 모바일 헤더 (제목과 탭) */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-900">오나요?</h1>
            <p className="text-[11px] text-gray-400 mt-1 tracking-tight">
              추운 겨울 손이 시린데 타이핑은 하기 싫어 만든
            </p>
          </div>

          {/* 버스/지하철 탭 전환 */}
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TransitTab)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bus" className="flex items-center gap-2">
                <Bus className="h-4 w-4" />
                버스
              </TabsTrigger>
              <TabsTrigger value="subway" className="flex items-center gap-2">
                <Train className="h-4 w-4" />
                지하철
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* 지하철 노선도 (전체 화면) */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <SubwayRealtimeView />
        </div>
      </div>
    )
  }

  // 버스 탭: 리스트 화면 렌더링 (기본 화면)
  return (
    <div className="flex flex-col h-screen">
      {/* 모바일 헤더 (제목과 탭) */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">오나요?</h1>
          <p className="text-[11px] text-gray-400 mt-1 tracking-tight">
            추운 겨울 손이 시린데 타이핑은 하기 싫어 만든
          </p>
        </div>

        {/* 버스/지하철 탭 전환 */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TransitTab)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bus" className="flex items-center gap-2">
              <Bus className="h-4 w-4" />
              버스
            </TabsTrigger>
            <TabsTrigger value="subway" className="flex items-center gap-2">
              <Train className="h-4 w-4" />
              지하철
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 현재 위치 정보와 검색 버튼 */}
      <LocationInfoCard location={location} loading={loading} onSearch={searchNearbyStops} activeTab={activeTab} />

      {/* 지도 (버스 탭에서만 표시) */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-gray-100 overflow-hidden" style={{ height: '256px' }}>
        <BusStopMap
          busStops={nearBusStops}
          userLocation={
            location ? { latitude: location.latitude, longitude: location.longitude } : null
          }
          selectedStop={selectedNearBusStop}
          onMarkerClick={onSelectNearBusStop}
        />
      </div>

      {/* 정류장 리스트 (Pull to Refresh 적용) */}
      <div className="flex-1">
        <PullToRefresh onRefresh={refreshAll} disabled={loading}>
          <div className="bg-white">
            <BusStopList
              nearBusStops={nearBusStops}
              selectedNearBusStop={selectedNearBusStop}
              onSelect={onSelectNearBusStop}
              isMobile={true}
            />
          </div>
        </PullToRefresh>
      </div>

      {/* 플로팅 새로고침 버튼 */}
      <RefreshButton onRefresh={refreshAll} disabled={loading} />
    </div>
  )
}
