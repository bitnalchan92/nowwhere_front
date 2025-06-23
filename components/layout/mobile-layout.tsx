"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bus, Train } from "lucide-react"
import { LocationInfoCard } from "@/components/sidebar/location-info"
import { BusStopList } from "@/components/sidebar/bus-stop-list"
import { SubwayStationList } from "@/components/sidebar/subway-station-list"
import { DetailContent } from "@/components/detail/detail-content"
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

  // 리스트 화면 렌더링 (기본 화면)
  return (
    <div className="flex flex-col h-screen">
      {/* 모바일 헤더 (제목과 탭) */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-900 mb-4">실시간 교통정보</h1>

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

      {/* 정류장/역 리스트 (스크롤 가능) */}
      <div className="flex-1 overflow-y-auto bg-white">
        <Tabs value={activeTab}>
          <TabsContent value="bus" className="mt-0">
            <BusStopList
              nearBusStops={nearBusStops}
              selectedNearBusStop={selectedNearBusStop}
              onSelect={onSelectNearBusStop}
              isMobile={true} // 모바일 스타일 적용
            />
          </TabsContent>

          <TabsContent value="subway" className="mt-0">
            <SubwayStationList
              stations={subwayStations}
              selectedStation={selectedSubwayStation}
              onSelect={onSelectSubwayStation}
              isMobile={true} // 모바일 스타일 적용
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
