import { SidebarContent } from "@/components/sidebar/sidebar-content"
import { DetailContent } from "@/components/detail/detail-content"
import type { BusStop, LocationInfo, SubwayStation, TransitTab } from "@/types/transit"

interface DesktopLayoutProps {
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
}

export function DesktopLayout({
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
}: DesktopLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* 왼쪽 사이드바 */}
      <div className="w-96 bg-white border-r border-gray-200">
        <SidebarContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          location={location}
          loading={loading}
          searchNearbyStops={searchNearbyStops}
          busStops={busStops}
          subwayStations={subwayStations}
          selectedBusStop={selectedBusStop}
          selectedSubwayStation={selectedSubwayStation}
          onSelectBusStop={onSelectBusStop}
          onSelectSubwayStation={onSelectSubwayStation}
        />
      </div>

      {/* 오른쪽 상세 정보 */}
      <div className="flex-1 p-6 overflow-y-auto">
        <DetailContent
          activeTab={activeTab}
          selectedBusStop={selectedBusStop}
          selectedSubwayStation={selectedSubwayStation}
        />
      </div>
    </div>
  )
}
