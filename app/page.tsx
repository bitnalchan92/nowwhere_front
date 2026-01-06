"use client" // Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시 (브라우저에서 실행)

import {MobileLayout} from "@/components/layout/mobile-layout"
import {DesktopLayout} from "@/components/layout/desktop-layout"
import {useTransit} from "@/hooks/use-transit"
import {NearBusStop} from "@/types/transit";

/**
 * 메인 페이지 컴포넌트
 * - Next.js에서 app/page.tsx는 루트 경로(/)의 페이지를 담당
 * - 모바일과 데스크톱 레이아웃을 분기 처리
 * - 모든 상태와 로직은 useTransit 커스텀 훅에서 관리
 */
export default function TransitApp() {
  // useTransit 훅에서 모든 상태와 함수들을 가져옴 (상태 관리 중앙화)
  const {
    activeTab, // 현재 선택된 탭 (버스/지하철)
    setActiveTab, // 탭 변경 함수
    location, // 현재 위치 정보
    nearBusStops, // 검색된 인접 버스 정류장 목록
    subwayStations, // 검색된 지하철역 목록
    selectedNearBusStop, // 선택된 인접 버스 정류장
    selectedSubwayStation, // 선택된 지하철역
    loading, // 로딩 상태
    showDetail, // 모바일에서 상세 화면 표시 여부
    searchNearbyStops, // 근처 정류장/역 검색 함수
    handleStopSelect, // 정류장/역 선택 처리 함수
    handleBackToList, // 모바일에서 리스트로 돌아가기 함수
    refreshAll, // 위치와 정류장 정보 새로고침 함수
  } = useTransit()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 모바일 레이아웃 (768px 미만에서만 표시) */}
      <div className="md:hidden">
        <MobileLayout
          showDetail={showDetail}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          location={location}
          loading={loading}
          searchNearbyStops={searchNearbyStops}
          nearBusStops={nearBusStops}
          subwayStations={subwayStations}
          selectedNearBusStop={selectedNearBusStop}
          selectedSubwayStation={selectedSubwayStation}
          onSelectNearBusStop={(nearBusStop: NearBusStop) => handleStopSelect(nearBusStop)}
          onSelectSubwayStation={(station) => handleStopSelect(station)}
          onBackToList={handleBackToList}
          refreshAll={refreshAll}
        />
      </div>

      {/* 데스크톱 레이아웃 (768px 이상에서만 표시) */}
      <div className="hidden md:block">
        <DesktopLayout
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          location={location}
          loading={loading}
          searchNearbyStops={searchNearbyStops}
          nearBusStops={nearBusStops}
          subwayStations={subwayStations}
          selectedNearBusStop={selectedNearBusStop}
          selectedSubwayStation={selectedSubwayStation}
          onSelectNearBusStop={(nearBusStop: NearBusStop) => handleStopSelect(nearBusStop)}
          onSelectSubwayStation={(station) => handleStopSelect(station)}
          refreshAll={refreshAll}
        />
      </div>
    </div>
  )
}
