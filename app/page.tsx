"use client"

import { MobileLayout } from "@/components/mobile-layout"
import { DesktopLayout } from "@/components/desktop-layout"
import { useTransit } from "@/hooks/use-transit"

export default function TransitApp() {
  const {
    activeTab,
    setActiveTab,
    location,
    busStops,
    subwayStations,
    selectedBusStop,
    selectedSubwayStation,
    loading,
    showDetail,
    searchNearbyStops,
    handleStopSelect,
    handleBackToList,
  } = useTransit()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 모바일 레이아웃 */}
      <div className="md:hidden">
        <MobileLayout
          showDetail={showDetail}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          location={location}
          loading={loading}
          searchNearbyStops={searchNearbyStops}
          busStops={busStops}
          subwayStations={subwayStations}
          selectedBusStop={selectedBusStop}
          selectedSubwayStation={selectedSubwayStation}
          onSelectBusStop={(stop) => handleStopSelect(stop)}
          onSelectSubwayStation={(station) => handleStopSelect(station)}
          onBackToList={handleBackToList}
        />
      </div>

      {/* 데스크톱 레이아웃 */}
      <div className="hidden md:block">
        <DesktopLayout
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          location={location}
          loading={loading}
          searchNearbyStops={searchNearbyStops}
          busStops={busStops}
          subwayStations={subwayStations}
          selectedBusStop={selectedBusStop}
          selectedSubwayStation={selectedSubwayStation}
          onSelectBusStop={(stop) => handleStopSelect(stop)}
          onSelectSubwayStation={(station) => handleStopSelect(station)}
        />
      </div>
    </div>
  )
}
