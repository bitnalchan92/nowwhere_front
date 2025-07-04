"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bus, Train } from "lucide-react"
import { LocationInfoCard } from "@/components/sidebar/location-info"
import { BusStopList } from "@/components/sidebar/bus-stop-list"
import { SubwayStationList } from "@/components/sidebar/subway-station-list"
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
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900 mb-4">실시간 교통정보</h1>

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

      {/* 현재 위치 */}
      <LocationInfoCard location={location} loading={loading} onSearch={searchNearbyStops} activeTab={activeTab} />

      {/* 정류장/역 리스트 */}
      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeTab}>
          <TabsContent value="bus" className="mt-0">
            <BusStopList nearBusStops={nearBusStops} selectedNearBusStop={selectedNearBusStop} onSelect={onSelectNearBusStop} />
          </TabsContent>

          <TabsContent value="subway" className="mt-0">
            <SubwayStationList
              stations={subwayStations}
              selectedStation={selectedSubwayStation}
              onSelect={onSelectSubwayStation}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
