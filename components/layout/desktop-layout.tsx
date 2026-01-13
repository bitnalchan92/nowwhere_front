import { SidebarContent } from "@/components/sidebar/sidebar-content"
import { DetailContent } from "@/components/detail/detail-content"
import { RefreshButton } from "@/components/ui/refresh-button"
import { SubwayRealtimeView } from "@/components/subway/subway-realtime-view"
import type { NearBusStop, LocationInfo, SubwayStation, TransitTab } from "@/types/transit"

// 데스크톱 레이아웃 컴포넌트의 props 타입 정의
interface DesktopLayoutProps {
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
  refreshAll: () => Promise<void>
}

/**
 * 데스크톱 전용 레이아웃 컴포넌트
 * - 버스 탭: 좌우 분할 레이아웃 (사이드바 + 상세 정보)
 * - 지하철 탭: 좌우 분할 레이아웃 (사이드바 + 노선도)
 */
export function DesktopLayout({
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
  refreshAll,
}: DesktopLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* 왼쪽 사이드바 (고정 너비) */}
      <div className="w-96 bg-white border-r border-gray-200 flex-shrink-0">
        <SidebarContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          location={location}
          loading={loading}
          searchNearbyStops={searchNearbyStops}
          nearBusStops={nearBusStops}
          subwayStations={subwayStations}
          selectedNearBusStop={selectedNearBusStop}
          selectedSubwayStation={selectedSubwayStation}
          onSelectNearBusStop={onSelectNearBusStop}
          onSelectSubwayStation={onSelectSubwayStation}
        />
      </div>

      {/* 오른쪽 메인 콘텐츠 영역 */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "subway" ? (
          <SubwayRealtimeView />
        ) : (
          <div className="p-6 overflow-y-auto h-full">
            <DetailContent
              activeTab={activeTab}
              selectedNearBusStop={selectedNearBusStop}
              selectedSubwayStation={selectedSubwayStation}
            />
          </div>
        )}
      </div>

      {/* 플로팅 새로고침 버튼 (버스 탭에서만) */}
      {activeTab === "bus" && (
        <RefreshButton onRefresh={refreshAll} disabled={loading} />
      )}
    </div>
  )
}
