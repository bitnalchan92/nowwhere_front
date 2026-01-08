"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bus, Train } from "lucide-react"
import { LocationInfoCard } from "@/components/sidebar/location-info"
import { BusStopList } from "@/components/sidebar/bus-stop-list"
import { SubwayStationList } from "@/components/sidebar/subway-station-list"
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
  subwayStations,
  selectedNearBusStop,
  selectedSubwayStation,
  onSelectNearBusStop,
  onSelectSubwayStation,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900 mb-4">오나요?</h1>

        {/* 탭 */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TransitTab)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bus" className="flex items-center gap-2">
              <Bus className="h-4 w-4" />
              버스
            </TabsTrigger>
            <TabsTrigger value="subway" disabled className="flex items-center gap-2">
              <Train className="h-4 w-4" />
              지하철
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 현재 위치 */}
      <div className="flex-shrink-0">
        <LocationInfoCard location={location} loading={loading} onSearch={searchNearbyStops} activeTab={activeTab} />
      </div>

      {/* 지도 (버스 탭에서만 표시) */}
      {activeTab === "bus" && (
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
      )}

      {/* 정류장/역 리스트 */}
      <div className="flex-1 min-h-0 overflow-y-auto bg-white">
        {activeTab === "bus" ? (
          <BusStopList nearBusStops={nearBusStops} selectedNearBusStop={selectedNearBusStop} onSelect={onSelectNearBusStop} />
        ) : (
          <SubwayStationList
            stations={subwayStations}
            selectedStation={selectedSubwayStation}
            onSelect={onSelectSubwayStation}
          />
        )}
      </div>
    </div>
  )
}
