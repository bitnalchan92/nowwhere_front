"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bus, Train } from "lucide-react"
import { LocationInfoCard } from "@/components/sidebar/location-info"
import { BusStopList } from "@/components/sidebar/bus-stop-list"
import { BusStopMap } from "@/components/map/bus-stop-map"
import type { NearBusStop, LocationInfo, SubwayStation, TransitTab } from "@/types/transit"

interface SidebarContentProps {
  activeTab: TransitTab
  setActiveTab: (tab: TransitTab) => void
  location: LocationInfo
  loading: boolean
  searchNearbyStops: () => void
  nearBusStops: NearBusStop[]
  subwayStations: SubwayStation[]
  selectedNearBusStop: NearBusStop | null
  selectedSubwayStation: SubwayStation | null
  onSelectNearBusStop: (stop: NearBusStop) => void
  onSelectSubwayStation: (station: SubwayStation) => void
}

export function SidebarContent({
  activeTab,
  setActiveTab,
  location,
  loading,
  searchNearbyStops,
  nearBusStops,
  selectedNearBusStop,
  onSelectNearBusStop,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">오나요?</h1>
          <p className="text-[11px] text-gray-400 mt-1 tracking-tight">
            추운 겨울 손이 시린데 타이핑은 하기 싫어 만든
          </p>
        </div>

        {/* 탭 */}
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

      {/* 지하철 탭: 안내 메시지 */}
      {activeTab === "subway" ? (
        <div className="flex-1 flex items-center justify-center p-4 text-center text-gray-500">
          <div>
            <Train className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">오른쪽 화면에서</p>
            <p className="text-sm">호선을 선택하세요</p>
          </div>
        </div>
      ) : (
        <>
          {/* 현재 위치 (버스 탭) */}
          <div className="flex-shrink-0">
            <LocationInfoCard location={location} loading={loading} onSearch={searchNearbyStops} activeTab={activeTab} />
          </div>

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

          {/* 정류장 리스트 (버스 탭) */}
          <div className="flex-1 min-h-0 overflow-y-auto bg-white">
            <BusStopList nearBusStops={nearBusStops} selectedNearBusStop={selectedNearBusStop} onSelect={onSelectNearBusStop} />
          </div>
        </>
      )}
    </div>
  )
}
