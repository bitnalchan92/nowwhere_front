"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bus, Train } from "lucide-react"
import { LocationInfoCard } from "@/components/location-info"
import { BusStopList } from "@/components/bus-stop-list"
import { SubwayStationList } from "@/components/subway-station-list"
import { DetailContent } from "@/components/detail-content"
import type { BusStop, LocationInfo, SubwayStation, TransitTab } from "@/types/transit"

interface MobileLayoutProps {
  showDetail: boolean
  activeTab: TransitTab
  setActiveTab: (tab: TransitTab) => void
  location: LocationInfo
  loading: boolean
  searchNearbyStops: () => void
  busStops: BusStop[]
  subwayStations: SubwayStation[]
  selectedBusStop: BusStop | null
  selectedSubwayStation: SubwayStation | null
  onSelectBusStop: (stop: BusStop) => void
  onSelectSubwayStation: (station: SubwayStation) => void
  onBackToList: () => void
}

export function MobileLayout({
  showDetail,
  activeTab,
  setActiveTab,
  location,
  loading,
  searchNearbyStops,
  busStops,
  subwayStations,
  selectedBusStop,
  selectedSubwayStation,
  onSelectBusStop,
  onSelectSubwayStation,
  onBackToList,
}: MobileLayoutProps) {
  if (showDetail) {
    return (
      <div className="flex flex-col h-screen bg-white">
        {/* 모바일 상세 헤더 */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <Button variant="ghost" size="sm" onClick={onBackToList}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">상세 정보</h1>
        </div>

        {/* 모바일 상세 내용 */}
        <div className="flex-1 overflow-y-auto p-4">
          <DetailContent
            activeTab={activeTab}
            selectedBusStop={selectedBusStop}
            selectedSubwayStation={selectedSubwayStation}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {/* 모바일 헤더 */}
      <div className="bg-white border-b border-gray-200 p-4">
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
      <div className="flex-1 overflow-y-auto bg-white">
        <Tabs value={activeTab}>
          <TabsContent value="bus" className="mt-0">
            <BusStopList
              busStops={busStops}
              selectedBusStop={selectedBusStop}
              onSelect={onSelectBusStop}
              isMobile={true}
            />
          </TabsContent>

          <TabsContent value="subway" className="mt-0">
            <SubwayStationList
              stations={subwayStations}
              selectedStation={selectedSubwayStation}
              onSelect={onSelectSubwayStation}
              isMobile={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
